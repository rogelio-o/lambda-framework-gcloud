/* tslint:disable:no-unused-expression */
import * as Storage from "@google-cloud/storage";
import * as Chai from "chai";
import { ITemplate, ITemplateLoader, Template } from "lambda-framework";
import * as NodeCache from "node-cache";
import { SinonStub, stub } from "sinon";
import GCloudStorageTemplateLoader from "./../src/lib/GCloudStorageTemplateLoader";

const mockFile = (content: string) => {
  return [
    {
      download: () => {
        return new Promise((resolve, reject) => {
          resolve(new Buffer(content));
        });
      }
    }
  ];
};

const mockBucket = (promise) => {
  return (bucketName) => {
    return {
      file: (fileName: string) => {
        return {
          get: () => {
            return promise;
          }
        };
      }
    };
  };
};

/**
 * Test for GCloudStorageTemplateLoader.
 */
describe("GCloudStorageTemplateLoader", () => {
  const getCacheStub: SinonStub = stub(NodeCache.prototype, "get");
  const storageStub: SinonStub = stub(Storage.prototype, "bucket");
  const loader: ITemplateLoader = new GCloudStorageTemplateLoader("APPLICATION-ID", "bucket", 30000);

  afterEach(() => {
    storageStub.reset();
    getCacheStub.reset();
  });

  describe("#load", () => {
    it("should load from cache the template if has been previously loaded and run the callback with the cached content.", (done) => {
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, new Template("prueba.pug", "Cached content."));
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(getCacheStub.calledOnce).to.be.true;
        Chai.expect(storageStub.calledOnce).to.be.false;
        Chai.expect(template.fileName).to.be.equal("prueba.pug");
        Chai.expect(template.content).to.be.equal("Cached content.");
        done();
      });
    });

    it("should call the `callback` with an error if an error happens getting the template from the cache.", (done) => {
      const returnedError: Error = new Error("Test error.");
      getCacheStub.callsFake((key: string, callback) => {
        callback(returnedError, null);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(err).to.be.equal(returnedError);
        done();
      });
    });

    it("should load from Cloud Storage if the cache is not defined and run the callback with the content.", (done) => {
      const newLoader: ITemplateLoader = new GCloudStorageTemplateLoader("APPLICATION-ID", "bucket", null);
      storageStub.callsFake(mockBucket(new Promise((resolve, reject) => resolve(mockFile("Test content.")))));
      newLoader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(storageStub.called).to.be.true;
        Chai.expect(template.fileName).to.be.equal("prueba.pug");
        Chai.expect(template.content).to.be.equal("Test content.");
        done();
      });
    });

    it("should load from Cloud Storage if the template has not been previously loaded.", (done) => {
      storageStub.callsFake(mockBucket(new Promise((resolve, reject) => resolve(mockFile("Test content.")))));
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, undefined);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(getCacheStub.called).to.be.true;
        Chai.expect(storageStub.called).to.be.true;
        Chai.expect(template.fileName).to.be.equal("prueba.pug");
        Chai.expect(template.content).to.be.equal("Test content.");
        done();
      });
    });

    it("should call the `callback` with an error if an error happens getting the template from Cloud Storage.", (done) => {
      const returnedError: Error = new Error("Test error.");
      storageStub.callsFake(mockBucket(new Promise((resolve, reject) => reject(returnedError))));
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, undefined);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(err).to.be.equal(returnedError);
        done();
      });
    });

    it("should call the `callback` with an error if an error happens downloading the template from Cloud Storage.", (done) => {
      const returnedError: Error = new Error("Test error.");
      storageStub.callsFake(mockBucket(new Promise((resolve, reject) => resolve(
        [{
          download: () => {
            return new Promise((resolve2, reject2) => {
              reject2(returnedError);
            });
          }
        }]
      ))));
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, undefined);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(err).to.be.equal(returnedError);
        done();
      });
    });
  });
});
