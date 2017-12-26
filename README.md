# Google Cloud Functions implementation

[![Coverage Status](https://coveralls.io/repos/github/rogelio-o/lambda-framework-gcloud/badge.svg?branch=master)](https://coveralls.io/github/rogelio-o/lambda-framework-gcloud?branch=master) [![Build Status](https://travis-ci.org/rogelio-o/lambda-framework-gcloud.svg?branch=master)](https://travis-ci.org/rogelio-o/lambda-framework-gcloud)

Google Cloud Functions implementation of Lambda Framework.

## How to use it?

### Creating the Cloud Functions handler

```typescript
import { App, IApp } from "lambda-framework";
import { GCloudHttpHandler, GCloudEventHandler } from "lambda-framework-gcloud";

const app: IApp = new App();
...
const httpHandler: GCloudHttpHandler = new GCloudHttpHandler(app);
export.httpHandler = httpHandler.handle;

const eventHandler: GCloudEventHandler = new GCloudEventHandler(app);
export.eventHandler = eventHandler.handle;
```

### Using Cloud Storage to retrieve the templates

```typescript
import { App, IApp } from "lambda-framework";
import { GCloudHttpHandler, GCloudEventHandler, GCloudStorageTemplateLoader } from "lambda-framework-gcloud";
import DustTemplateRenderer from "lambda-framework-dustjs";

const app: IApp = new App();
...
const cachedTime: number = 3000;
const templateRenderer: ITemplateRenderer = new DustTemplateRenderer(new CloudStorageTemplateLoader("bucket-name", cachedTime));
app.addTemplateEngine(templateRenderer);
...
```

### More info

If you want to know more about how to use App, please visit
the [Core Project](https://github.com/rogelio-o/lambda-framework).

## Lambda Framework projects

- [Core](https://github.com/rogelio-o/lambda-framework)
- [AWS Lambda implementation](https://github.com/rogelio-o/lambda-framework-aws)
- [Google Cloud Functions implementation](https://github.com/rogelio-o/lambda-framework-gcloud)
- [DustJS template engine implementation](https://github.com/rogelio-o/lambda-framework-dustjs)
- [Website](https://github.com/rogelio-o/lambda-framework-website)
- [Website Resources](https://github.com/rogelio-o/lambda-framework-website-resources)

## Contributions

All contributors will be welcome. You can contributing by implementing/fixing/answering one open [issue](issues), by suggesting new features for the framework,... For more info about contributing, you can read [the contributing file of the core project](https://github.com/rogelio-o/lambda-framework/CONTRIBUTING.md).

Make it happen.
