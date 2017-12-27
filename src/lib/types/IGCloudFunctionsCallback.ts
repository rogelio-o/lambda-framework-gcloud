/**
 * The Google Cloud Functions callback.
 */
type IGCloudFunctionsCallback = (error?: Error, result?: any) => void;
export default IGCloudFunctionsCallback;
