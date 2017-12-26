import { Request, Response } from "express";
import { IRawCallback, IRawEvent, RawEvent } from "lambda-framework";
import GCloudHttpRawCallback from "./GCloudHttpRawCallback";
import GCloudRawCallback from "./GCloudRawCallback";
import IGCloudFunctionsCallback from "./types/IGCloudFunctionsCallback";
import IGCloudFunctionsEvent from "./types/IGCloudFunctionsEvent";

/**
 * The class that transform the Cloud Functions event and callback to LF raws.
 */
export default class GCloudTransformer {

  public transformHttpRawEvent(request: Request): IRawEvent {
    const result: IRawEvent = new RawEvent();
    result.type = "HTTP";
    result.original = request;
    result.isHttp = true;
    result.body = request.body;
    result.queryParams = request.query;
    result.stageVariables = {};
    result.ip = request.ip;
    result.path = request.path;
    result.httpMethod = request.method;

    result.headers = {};
    if (request.headers) {
      for (const headerName of Object.keys(request.headers)) {
        const headerValue: string = Array.isArray(request.headers[headerName]) ?
          (request.headers[headerName] as string[]).join("; ")
            :
          request.headers[headerName] as string;
        result.headers[headerName] = headerValue;
      }
    }

    return result;
  }

  public transformRawEvent(event: IGCloudFunctionsEvent): IRawEvent {
    const result: IRawEvent = new RawEvent();
    result.type = event.eventType;
    result.original = event;
    result.isHttp = false;

    return result;
  }

  public transformHttpRawCallback(response: Response): IRawCallback {
    if (response === undefined) {
      return null;
    } else {
      return new GCloudHttpRawCallback(response);
    }
  }

  public transformRawCallback(callback: IGCloudFunctionsCallback): IRawCallback {
    if (callback === undefined) {
      return null;
    } else {
      return new GCloudRawCallback(callback);
    }
  }

}
