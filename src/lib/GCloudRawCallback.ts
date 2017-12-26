import { IRawCallback } from "lambda-framework";
import IGCloudFunctionsCallback from "./types/IGCloudFunctionsCallback";

/**
 * The RAW callback implementation for Cloud Functions HTTP responses.
 */
export default class GCloudRawCallback implements IRawCallback {

  private _callback: IGCloudFunctionsCallback;

  constructor(callback: IGCloudFunctionsCallback) {
    this._callback = callback;
  }

  public sendError(error: Error): void {
    throw new Error("This method is only for HTTP events. Use 'finalize' for other events.");
  }

  public send(statusCode: number, headers: {[name: string]: string|string[]}, body: object|Buffer): void {
    throw new Error("This method is only for HTTP events. Use 'finalize' for other events.");
  }

  public finalize(err?: Error): void {
    this._callback(err);
  }

}
