import { Response } from "express";
import { IRawCallback } from "lambda-framework";

/**
 * The RAW callback implementation for Cloud Functions HTTP responses.
 */
export default class GCloudHttpRawCallback implements IRawCallback {

  private _response: Response;

  constructor(response: Response) {
    this._response = response;
  }

  public sendError(error: Error): void {
    console.error(error);
    this._response.send("Error: " + error.message);
  }

  public send(statusCode: number, headers: {[name: string]: string|string[]}, body: object|Buffer): void {
    this._response.status(statusCode);
    for (const headerName of Object.keys(headers)) {
      this._response.setHeader(headerName, headers[headerName]);
    }
    this._response.send(body);
  }

  public finalize(): void {
    throw new Error("The HTTP events can not be finalized. Use send or sendError.");
  }

}
