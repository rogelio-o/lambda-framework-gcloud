/* tslint:disable:no-unused-expression */
import * as Chai from "chai";
import { SinonSpy, spy } from "sinon";
import GCloudRawCallback from "./../src/lib/GCloudRawCallback";

/**
 * Test for GCloudRawCallback.
 */
describe("GCloudRawCallback", () => {
  const callback: SinonSpy = spy();
  const rawCallback: GCloudRawCallback = new GCloudRawCallback(callback);

  afterEach(() => {
    callback.reset();
  });

  describe("#sendError", () => {
    it("should throw an error because event can not use `sendError`, only can be finalized.", () => {
      Chai.expect(() => rawCallback.sendError(null)).to.throw("This method is only for HTTP events. Use 'finalize' for other events.");
    });
  });

  describe("#send", () => {
    it("should throw an error because event can not use `send`, only can be finalized.", () => {
      Chai.expect(() => rawCallback.send(null, null, null)).to.throw("This method is only for HTTP events. Use 'finalize' for other events.");
    });
  });

  describe("#finalize", () => {
    it("should call the original callback with the error as first argument.", () => {
      const err: Error = new Error("Test.");

      rawCallback.finalize(err);

      Chai.expect(callback.args[0][0]).to.be.equals(err);
    });
  });

});
