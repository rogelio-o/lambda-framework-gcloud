/**
 * The Google Cloud Functions event.
 */
export default interface IGCloudFunctionsEvent {

  readonly eventId: string;

  readonly timestamp: string;

  readonly eventType: string;

  readonly resource: string;

  readonly data: any;

}
