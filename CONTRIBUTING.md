# Contributing to aws-rest-api

First off — thank you for taking the time to contribute! 🎉
Every contribution, big or small, makes this project better for everyone.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Adding a New AWS Service](#adding-a-new-aws-service)
- [Commit Convention](#commit-convention)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Project Structure](#project-structure)

---

## Code of Conduct

Be kind, respectful, and constructive. We're all here to build something useful together.

---

## Getting Started

### 1. Fork & clone

```bash
git clone https://github.com/<your-username>/aws-rest-api.git
cd aws-rest-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

```bash
cp .env.example .env
# Fill in your AWS credentials
```

### 4. Start the dev server

```bash
npm run dev
```

### 5. Open Swagger UI

```
http://localhost:3000/api-docs
```

---

## How to Contribute

### Reporting a Bug

1. Check [existing issues](https://github.com/adityayaduvanshi/aws-rest-api/issues) first
2. Open a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Your Node.js version and OS

### Suggesting a Feature

Open an issue with the `enhancement` label and describe:
- What you want to add
- Why it would be useful
- Which AWS service it belongs to

### Submitting a Fix or Feature

1. Create a branch from `main`
   ```bash
   git checkout -b feat/add-sqs-support
   ```
2. Make your changes
3. Test manually via Swagger UI or `curl`
4. Push and open a Pull Request

---

## Adding a New AWS Service

This is the most impactful way to contribute. The architecture is fully modular — adding a new service takes 4 files.

**Example: adding SQS**

### 1. Install the AWS SDK client

```bash
npm install @aws-sdk/client-sqs
```

### 2. Register the client in `src/config/aws.js`

```js
const { SQSClient } = require('@aws-sdk/client-sqs');
const sqsClient = new SQSClient(baseConfig);
module.exports = { ..., sqsClient };
```

### 3. Create the service — `src/services/sqs.service.js`

Pure AWS SDK logic, no Express here:

```js
const { ListQueuesCommand, SendMessageCommand } = require('@aws-sdk/client-sqs');
const { sqsClient } = require('../config/aws');

const listQueues = async () => {
  const data = await sqsClient.send(new ListQueuesCommand({}));
  return data.QueueUrls;
};

module.exports = { listQueues };
```

### 4. Create the controller — `src/controllers/sqs.controller.js`

Handles `req`/`res`, calls the service:

```js
const sqsService = require('../services/sqs.service');
const { sendSuccess } = require('../utils/response');

const listQueues = async (req, res, next) => {
  try {
    const queues = await sqsService.listQueues();
    sendSuccess(res, { queues, count: queues.length });
  } catch (err) {
    next(err);
  }
};

module.exports = { listQueues };
```

### 5. Create the routes — `src/routes/sqs.routes.js`

Add Swagger JSDoc comments for every route:

```js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/sqs.controller');

/**
 * @swagger
 * /sqs/queues:
 *   get:
 *     summary: List all SQS queues
 *     tags: [SQS]
 */
router.get('/queues', ctrl.listQueues);

module.exports = router;
```

### 6. Register in `src/routes/index.js`

```js
router.use('/sqs', require('./sqs.routes'));
```

That's it — your new service is live with docs auto-generated.

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org):

| Prefix | When to use |
|--------|-------------|
| `feat:` | Adding a new feature or AWS service |
| `fix:` | Bug fix |
| `docs:` | README, CONTRIBUTING, or code comments |
| `refactor:` | Code restructure without behavior change |
| `chore:` | Dependency updates, config changes |

**Examples:**
```
feat: add SQS queue and message support
fix: handle NoSuchKey error in S3 getObject
docs: add SQS examples to README
```

---

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Update the README API table if you add new endpoints
- Add your service to the Roadmap checklist in README (mark it done ✅)
- Make sure the server starts without errors (`npm start`)
- Describe what your PR does and why in the PR description

---

## Project Structure

```
src/
├── config/aws.js          ← Add new AWS clients here
├── services/              ← Pure AWS SDK logic (one file per service)
├── controllers/           ← Express req/res handlers (one file per service)
├── routes/                ← Express routes + Swagger JSDoc (one file per service)
├── middleware/            ← Shared middleware (error handler, logger)
├── utils/response.js      ← sendSuccess / sendError helpers
└── app.js                 ← Express app setup
```

---

## Questions?

Open a [GitHub Discussion](https://github.com/adityayaduvanshi/aws-rest-api/discussions) or file an issue — happy to help!
