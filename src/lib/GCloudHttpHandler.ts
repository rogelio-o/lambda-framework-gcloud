import { Request, Response } from "express";
import { IApp, IRawCallback, IRawEvent } from "lambda-framework";
import GCloudTransformer from "./GCloudTransformer";

/**
 * The class that implements the Cloud Functions handler for HTTP events.
 */
export default class GCloudHttpHandler {

  private _app: IApp;
  private _transformer: GCloudTransformer;

  constructor(app: IApp) {
    this._app = app;
    this._transformer = new GCloudTransformer();
  }

  public handle(request: Request, response: Response): void {
    const rawEvent: IRawEvent = this._transformer.transformHttpRawEvent(request);
    const rawCallback: IRawCallback = this._transformer.transformHttpRawCallback(response);

    this._app.handle(rawEvent, rawCallback);
  }

}
