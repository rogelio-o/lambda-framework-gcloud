import * as Storage from "@google-cloud/storage";
import { Bucket, File } from "@google-cloud/storage";
import { ITemplate, ITemplateLoader, Template } from "lambda-framework";
import * as NodeCache from "node-cache";

/**
 * Loads the template from Cloud Storage.
 */
export default class GCloudStorageTemplateLoader implements ITemplateLoader {

  private _storage: Storage;
  private _bucket: string;
  private _cache: NodeCache;

  constructor(projectId: string, bucket: string, ttl: number) {
    this._storage = new Storage({ projectId });
    this._bucket = bucket;
    if (ttl) {
        this._cache = new NodeCache({ stdTTL: ttl });
    }
  }

  public load(fileName: string, callback: (err: Error, template: ITemplate) => void): void {
    this.getFromCache(fileName, (cacheErr: Error, cacheValue: ITemplate) => {
      if (cacheErr) {
        callback(cacheErr, null);
      } else {
        if (cacheValue === undefined) {
          const bucket: Bucket = this._storage.bucket(this._bucket);
          bucket
            .file(fileName)
            .get()
            .then(
              (data) => {
                const file: File = data[0];
                file.download().then(
                  (buffer) => {
                    const content = buffer.toString();
                    const template: ITemplate = new Template(fileName, content);
                    this.setToCache(template);
                    callback(null, template);
                  },
                  (err) => {
                    callback(err, null);
                  }
                );
              },
              (err) => {
                callback(err, null);
              }
            );
        } else {
          callback(null, cacheValue);
        }
      }
    });
  }

  private getFromCache(fileName: string, callback: (cacheErr: Error, cacheValue: ITemplate) => void): void {
    if (this._cache) {
      this._cache.get(fileName, callback);
    } else {
      callback(null, undefined);
    }
  }

  private setToCache(template: ITemplate): void {
    if (this._cache) {
      this._cache.set(template.fileName, template, (err: Error, success: boolean) => {
        if (err || !success) {
          console.error("Error saving template into cache: " + template.fileName, err);
        }
      });
    }
  }

}
