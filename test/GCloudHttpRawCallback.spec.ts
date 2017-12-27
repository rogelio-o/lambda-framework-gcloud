/* tslint:disable:no-unused-expression */
import * as Chai from "chai";
import { Response } from "express";
import { SinonStub, stub } from "sinon";
import { mockRes } from "sinon-express-mock";
import GCloudHttpRawCallback from "./../src/lib/GCloudHttpRawCallback";

/**
 * Test for GCloudHttpRawCallback.
 */
describe("GCloudHttpRawCallback", () => {
  const response: Response = mockRes();
  const sendStub: SinonStub = response.send as SinonStub;
  const statusStub: SinonStub = response.status as SinonStub;
  const setHeaderStub: SinonStub = stub();
  response.setHeader = setHeaderStub;
  const rawCallback: GCloudHttpRawCallback = new GCloudHttpRawCallback(response);

  afterEach(() => {
    sendStub.reset();
    statusStub.reset();
    setHeaderStub.reset();
  });

  describe("#sendError", () => {
    it("should call `send` of response with the error message.", () => {
      const error: Error = new Error("Produced error.");

      rawCallback.sendError(error);

      Chai.expect(sendStub.args[0][0]).to.be.equal("Error: " + error.message);
    });
  });

  describe("#send", () => {
    it("should call the followings methods of response: `status`, `setHeader`, `send`.", () => {
      const resultObject = {statusCode: 200, headers: {header1: "value 1"}, body: new Buffer("body")};

      rawCallback.send(resultObject.statusCode, resultObject.headers, resultObject.body);

      Chai.expect(statusStub.args[0][0]).to.be.equal(resultObject.statusCode);
      Chai.expect(setHeaderStub.args[0][0]).to.be.equal("header1");
      Chai.expect(setHeaderStub.args[0][1]).to.be.equal("value 1");
      Chai.expect(sendStub.args[0][0]).to.be.equal(resultObject.body);
    });
  });

  describe("#finalize", () => {
    it("should throw an error because HTTP events can not be finalized with this method.", () => {
      Chai.expect(() => rawCallback.finalize()).to.throw("The HTTP events can not be finalized. Use send or sendError.");
    });
  });

});
