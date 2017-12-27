/* tslint:disable:no-unused-expression */
import * as Chai from "chai";
import { Request } from "express";
import { IRawCallback, IRawEvent } from "lambda-framework";
import { mockReq, mockRes } from "sinon-express-mock";
import GCloudHttpRawCallback from "./../src/lib/GCloudHttpRawCallback";
import GCloudRawCallback from "./../src/lib/GCloudRawCallback";
import GCloudTransformer from "./../src/lib/GCloudTransformer";
import IGCloudFunctionsCallback from "./../src/lib/types/IGCloudFunctionsCallback";
import IGCloudFunctionsEvent from "./../src/lib/types/IGCloudFunctionsEvent";
import eventGenerator from "./utils/eventGenerator";

/**
 * Test for GCloudTransformer.
 */
describe("GCloudTransformer", () => {
  const transformer: GCloudTransformer = new GCloudTransformer();

  describe("#transformRawEvent", () => {
    const event: IGCloudFunctionsEvent = eventGenerator("Pub/Sub", {});

    it("should create a raw event with the original event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(event);

      Chai.expect(rawEvent.original).to.be.equal(event);
    });

    it("should create a raw event with `is http` to false.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(event);

      Chai.expect(rawEvent.isHttp).to.be.false;
    });

    it("should create a raw event with the type of the event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(event);

      Chai.expect(rawEvent.type).to.be.equal("Pub/Sub");
    });
  });

  describe("#transformHttpRawEvent", () => {
    const request: Request = mockReq({
      body: "BODY",
      headers: {
        header1: "value 1",
        header2: ["value 2a", "value 2b"]
      },
      query: {
        query1: "value 1"
      },
      ip: "127.0.0.1",
      path: "/test",
      method: "POST"
    });

    it("should create a raw event with the original event.", () => {
      const rawEvent: IRawEvent = transformer.transformHttpRawEvent(request);

      Chai.expect(rawEvent.original).to.be.equal(request);
    });

    it("should create a raw event with `is http` to true.", () => {
      const rawEvent: IRawEvent = transformer.transformHttpRawEvent(request);

      Chai.expect(rawEvent.isHttp).to.be.true;
    });

    it("should create a raw event with the type to 'HTTP'.", () => {
      const rawEvent: IRawEvent = transformer.transformHttpRawEvent(request);

      Chai.expect(rawEvent.type).to.be.equal("HTTP");
    });

    it("should create a raw event with the body, headers, params, IP, path and HTTP method of the request.", () => {
      const rawEvent: IRawEvent = transformer.transformHttpRawEvent(request);

      Chai.expect(rawEvent.body).to.be.equal(request.body);
      Chai.expect(rawEvent.headers).to.be.deep.equal({
        header1: "value 1",
        header2: "value 2a; value 2b"
      });
      Chai.expect(rawEvent.queryParams).to.be.deep.equal(request.query);
      Chai.expect(rawEvent.stageVariables).to.be.deep.equal({});
      Chai.expect(rawEvent.ip).to.be.equal(request.ip);
      Chai.expect(rawEvent.path).to.be.equal(request.path);
      Chai.expect(rawEvent.httpMethod).to.be.equal(request.method);
    });
  });

  describe("#transformRawCallback", () => {
    it("should return undefined if the given `callback` is undefined.", () => {
      const rawCallback: IRawCallback = transformer.transformRawCallback(undefined);

      Chai.expect(rawCallback).to.be.null;
    });

    it("should return an `GCloudRawCallback` if the given `callback` isn't undefined.", () => {
      const callback: IGCloudFunctionsCallback = (err, succ) => console.log("OK");
      const rawCallback: IRawCallback = transformer.transformRawCallback(callback);

      Chai.expect(rawCallback).to.be.instanceOf(GCloudRawCallback);
    });
  });

  describe("#transformHttpRawCallback", () => {
    it("should return undefined if the given `callback` is undefined.", () => {
      const rawCallback: IRawCallback = transformer.transformHttpRawCallback(undefined);

      Chai.expect(rawCallback).to.be.null;
    });

    it("should return an `GCloudHttpRawCallback` if the given `callback` isn't undefined.", () => {
      const rawCallback: IRawCallback = transformer.transformHttpRawCallback(mockRes());

      Chai.expect(rawCallback).to.be.instanceOf(GCloudHttpRawCallback);
    });
  });

});
