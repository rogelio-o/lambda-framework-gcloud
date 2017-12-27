import IGCloudFunctionsEvent from "./../../src/lib/types/IGCloudFunctionsEvent";

/**
 * A function to generate events.
 */
export default function eventGenerator(type: string, event: any): IGCloudFunctionsEvent {
  return {
    eventId: "EVENT_ID",
    timestamp: new Date().toString(),
    eventType: type,
    resource: "RESOURCE",
    data: event
  };
}
