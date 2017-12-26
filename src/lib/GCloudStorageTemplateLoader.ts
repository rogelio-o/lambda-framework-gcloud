import { ITemplate, ITemplateLoader, Template } from "lambda-framework";
import * as NodeCache from "node-cache";

/**
 * Loads the template from AWS S3 bucket.
 */
export default class GCloudStorageTemplateLoader implements ITemplateLoader {

  private _bucket: string;
  private _cache: NodeCache;

  constructor(bucket: string, ttl: number) {
    this._bucket = bucket;
    if (ttl) {
        this._cache = new NodeCache({ stdTTL: ttl });
    }
  }

  public load(fileName: string, callback: (err: Error, template: ITemplate) => void): void {

  }

}
