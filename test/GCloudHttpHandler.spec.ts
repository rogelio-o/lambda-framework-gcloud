/* tslint:disable:no-unused-expression */
import * as Chai from "chai";
import { Request, Response } from "express";
import { App, IApp, RawEvent } from "lambda-framework";
import { SinonStub, stub } from "sinon";
import { mockReq, mockRes } from "sinon-express-mock";
import GCloudHttpHandler from "./../src/lib/GCloudHttpHandler";
import GCloudHttpRawCallback from "./../src/lib/GCloudHttpRawCallback";

/**
 * Test for GCloudHttpHandler.
 */
describe("GCloudHttpHandler", () => {

  const request: Request = mockReq();
  const callback: Response = mockRes();
  const app: IApp = new App();
  const appHandle: SinonStub = stub(app, "handle");
  const handler: GCloudHttpHandler = new GCloudHttpHandler(app);

  afterEach(() => {
    appHandle.reset();
  });

  describe("#handle", () => {

    it("calls the app `handle` method with a raw event and a raw callback.", () => {
      handler.handle(request, callback);

      Chai.expect(appHandle.args[0][0]).instanceOf(RawEvent);
      Chai.expect(appHandle.args[0][1]).instanceOf(GCloudHttpRawCallback);
    });

  });

});
