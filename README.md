# Google Cloud Functions implementation

[![Coverage Status](https://coveralls.io/repos/github/rogelio-o/lambda-framework-gcloud/badge.svg?branch=master)](https://coveralls.io/github/rogelio-o/lambda-framework-gcloud?branch=master) [![Build Status](https://travis-ci.org/rogelio-o/lambda-framework-gcloud.svg?branch=master)](https://travis-ci.org/rogelio-o/lambda-framework-gcloud) [![npm version](https://badge.fury.io/js/lambda-framework-gcloud.svg)](https://badge.fury.io/js/lambda-framework-gcloud)

Google Cloud Functions implementation of Lambda Framework.

## How to use it?

### Creating the Cloud Functions handler

```typescript
import { App, IApp } from "lambda-framework";
import { GCloudHttpHandler, GCloudEventHandler } from "lambda-framework-gcloud";

const app: IApp = new App();
...
const httpHandler: GCloudHttpHandler = new GCloudHttpHandler(app);
export const httpHandle = httpHandler.handle.bind(httpHandler);

const eventHandler: GCloudEventHandler = new GCloudEventHandler(app);
export const eventHandle = eventHandler.handle.bind(eventHandler);
```

### Using Cloud Storage to retrieve the templates

```typescript
import { App, IApp, ITemplateRenderer } from "lambda-framework";
import { GCloudHttpHandler, GCloudEventHandler, GCloudStorageTemplateLoader } from "lambda-framework-gcloud";
import { DustTemplateRenderer } from "lambda-framework-dustjs";

const app: IApp = new App();
...
const cachedTime: number = 3000;
const templateRenderer: ITemplateRenderer = new DustTemplateRenderer(new CloudStorageTemplateLoader("PROJECT-ID", "bucket-name", cachedTime));
app.addTemplateEngine(templateRenderer);
...
```

## Lambda Framework projects

- [Core](https://github.com/rogelio-o/lambda-framework)
- [AWS Lambda implementation](https://github.com/rogelio-o/lambda-framework-aws)
- [Google Cloud Functions implementation](https://github.com/rogelio-o/lambda-framework-gcloud)
- [DustJS template engine implementation](https://github.com/rogelio-o/lambda-framework-dustjs)
- [Examples](https://github.com/rogelio-o/lambda-framework-examples)

## Contributions

All contributors will be welcome. You can contributing by implementing/fixing/answering one open [issue](issues), by suggesting new features for the framework,... For more info about contributing, you can read [the contributing file of the core project](https://github.com/rogelio-o/lambda-framework/CONTRIBUTING.md).

Make it happen.
