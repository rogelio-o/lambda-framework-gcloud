import { IApp, IRawCallback, IRawEvent } from "lambda-framework";
import GCloudTransformer from "./GCloudTransformer";

/**
 * The class that implements the Cloud Functions handler for events.
 */
export default class GCloudEventHandler {

  private _app: IApp;
  private _transformer: GCloudTransformer;

  constructor(app: IApp) {
    this._app = app;
    this._transformer = new GCloudTransformer();
  }

  public handle(event: any, callback: any): void {
    const rawEvent: IRawEvent = this._transformer.transformRawEvent(event);
    const rawCallback: IRawCallback = this._transformer.transformRawCallback(callback);

    this._app.handle(rawEvent, rawCallback);
  }

}
