/* tslint:disable:no-unused-expression */
import * as Chai from "chai";
import { App, IApp, RawEvent } from "lambda-framework";
import { SinonStub, stub } from "sinon";
import GCloudEventHandler from "./../src/lib/GCloudEventHandler";
import GCloudRawCallback from "./../src/lib/GCloudRawCallback";
import IGCloudFunctionsCallback from "./../src/lib/types/IGCloudFunctionsCallback";
import IGCloudFunctionsEvent from "./../src/lib/types/IGCloudFunctionsEvent";
import eventGenerator from "./utils/eventGenerator";

/**
 * Test for GCloudEventHandler.
 */
describe("GCloudEventHandler", () => {
  const event: IGCloudFunctionsEvent = eventGenerator("testType", {});
  const callback: IGCloudFunctionsCallback = null;
  const app: IApp = new App();
  const appHandle: SinonStub = stub(app, "handle");
  const handler: GCloudEventHandler = new GCloudEventHandler(app);

  afterEach(() => {
    appHandle.reset();
  });

  describe("#handle", () => {

    it("calls the app `handle` method with a raw event and a raw callback.", () => {
      handler.handle(event, callback);

      Chai.expect(appHandle.args[0][0]).instanceOf(RawEvent);
      Chai.expect(appHandle.args[0][1]).instanceOf(GCloudRawCallback);
    });

  });

});
