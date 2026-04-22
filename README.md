<div align="center">
  <h1>☁️ aws-rest-api</h1>
  <p><strong>The open-source REST API for AWS.</strong><br/>Manage S3, EC2, Lambda, Glacier & EBS through a single, unified HTTP API.</p>

  <p>
    <a href="https://github.com/adityayaduvanshi/aws-rest-api/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
    </a>
    <a href="https://github.com/adityayaduvanshi/aws-rest-api/stargazers">
      <img src="https://img.shields.io/github/stars/adityayaduvanshi/aws-rest-api?style=flat" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/adityayaduvanshi/aws-rest-api/issues">
      <img src="https://img.shields.io/github/issues/adityayaduvanshi/aws-rest-api" alt="Open Issues" />
    </a>
    <a href="https://github.com/adityayaduvanshi/aws-rest-api/pulls">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
    </a>
    <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-green" alt="Node Version" />
    <img src="https://img.shields.io/badge/AWS_SDK-v3-orange" alt="AWS SDK v3" />
  </p>

  <p>
    <a href="#-quick-start">Quick Start</a> ·
    <a href="#-api-reference">API Reference</a> ·
    <a href="#-contributing">Contributing</a> ·
    <a href="#%EF%B8%8F-roadmap">Roadmap</a>
  </p>

  <br/>

  <!-- Replace with a real screenshot once deployed -->
  <img src="https://placehold.co/900x500/0f172a/38bdf8?text=aws-rest-api+—+Swagger+UI+Preview" alt="aws-rest-api Swagger UI" width="900" />

</div>

---

## What is aws-rest-api?

**aws-rest-api** is a **self-hosted, production-ready REST API** that wraps AWS services in a clean, consistent HTTP interface. Instead of integrating 5 different AWS SDKs across your projects, point them all at aws-rest-api and use plain HTTP.

- No vendor lock-in — run it anywhere (local, Docker, EC2, Railway, Render)
- Interactive docs out of the box via Swagger UI
- Consistent response format across every endpoint
- Built for teams, open to contributions

---

## ✨ Features

- **☁️ S3** — Create/delete buckets, upload/download objects, presigned URLs, versioning
- **💾 EBS** — List volumes, create/delete snapshots
- **🧊 Glacier** — Manage vaults, upload archives, initiate retrieval jobs
- **🖥️ EC2** — List, start, stop, and terminate instances
- **⚡ Lambda** — List, invoke, deploy (zip upload), and delete functions
- **📖 Swagger UI** — Interactive API docs at `/api-docs`
- **🔒 Security** — Helmet, CORS, rate limiting built-in
- **🐳 Docker** — One-command setup with `docker-compose up`
- **📦 Modular** — Service / Controller / Route architecture — easy to extend

---

## 🚀 Quick Start

### Option 1 — Node.js

```bash
# 1. Clone the repo
git clone https://github.com/adityayaduvanshi/aws-rest-api.git
cd aws-rest-api

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# → Fill in your AWS credentials in .env

# 4. Start the server
npm start
```

### Option 2 — Docker

```bash
git clone https://github.com/adityayaduvanshi/aws-rest-api.git
cd aws-rest-api

cp .env.example .env
# → Fill in your AWS credentials in .env

docker-compose up
```

Server starts at **http://localhost:3000**
Swagger UI at **http://localhost:3000/api-docs**

---

## ⚙️ Configuration

Copy `.env.example` to `.env` and fill in your values:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
PORT=3000
```

> **How to get AWS credentials:** AWS Console → IAM → Users → Security Credentials → Create Access Key

---

## 📡 API Reference

All responses follow a consistent shape:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### S3

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/s3/buckets` | List all buckets |
| `POST` | `/api/s3/buckets` | Create a bucket |
| `DELETE` | `/api/s3/buckets/:bucketName` | Delete a bucket |
| `GET` | `/api/s3/buckets/:bucketName/objects` | List objects in a bucket |
| `POST` | `/api/s3/buckets/:bucketName/objects` | Upload an object (multipart) |
| `GET` | `/api/s3/buckets/:bucketName/object?key=` | Download an object |
| `DELETE` | `/api/s3/buckets/:bucketName/object?key=` | Delete an object |
| `GET` | `/api/s3/buckets/:bucketName/presign?key=` | Get a presigned URL |
| `PUT` | `/api/s3/buckets/:bucketName/versioning` | Enable/suspend versioning |

### EBS

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/ebs/volumes` | List all volumes |
| `GET` | `/api/ebs/snapshots` | List snapshots |
| `POST` | `/api/ebs/snapshots` | Create a snapshot |
| `DELETE` | `/api/ebs/snapshots/:snapshotId` | Delete a snapshot |

### Glacier

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/glacier/vaults` | List all vaults |
| `POST` | `/api/glacier/vaults` | Create a vault |
| `DELETE` | `/api/glacier/vaults/:vaultName` | Delete a vault |
| `POST` | `/api/glacier/vaults/:vaultName/archives` | Upload an archive |
| `DELETE` | `/api/glacier/vaults/:vaultName/archives/:archiveId` | Delete an archive |
| `POST` | `/api/glacier/vaults/:vaultName/jobs` | Initiate retrieval job |
| `GET` | `/api/glacier/vaults/:vaultName/jobs` | List jobs |

### EC2

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/ec2/instances` | List all instances |
| `GET` | `/api/ec2/instances/:instanceId` | Get instance details |
| `POST` | `/api/ec2/instances/:instanceId/start` | Start an instance |
| `POST` | `/api/ec2/instances/:instanceId/stop` | Stop an instance |
| `POST` | `/api/ec2/instances/:instanceId/terminate` | Terminate an instance |

### Lambda

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/lambda/functions` | List all functions |
| `GET` | `/api/lambda/functions/:functionName` | Get function details |
| `POST` | `/api/lambda/functions` | Deploy a function (zip upload) |
| `POST` | `/api/lambda/functions/:functionName/invoke` | Invoke a function |
| `DELETE` | `/api/lambda/functions/:functionName` | Delete a function |

---

## 🏗️ Project Structure

```
aws-rest-api/
├── src/
│   ├── config/
│   │   └── aws.js              # AWS client factory
│   ├── middleware/
│   │   ├── errorHandler.js     # Global error handler
│   │   └── requestLogger.js    # HTTP request logger
│   ├── utils/
│   │   └── response.js         # Consistent response helpers
│   ├── services/               # Pure AWS SDK logic (reusable)
│   │   ├── s3.service.js
│   │   ├── ebs.service.js
│   │   ├── glacier.service.js
│   │   ├── ec2.service.js
│   │   └── lambda.service.js
│   ├── controllers/            # Request/response handling
│   ├── routes/                 # Express routes + Swagger JSDoc
│   └── app.js                  # Express app setup
├── docs/
│   └── swagger.js              # OpenAPI spec
├── server.js                   # Entry point
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## 🧑‍💻 Tech Stack

- **[Node.js](https://nodejs.org)** — Runtime
- **[Express](https://expressjs.com)** — HTTP framework
- **[AWS SDK v3](https://github.com/aws/aws-sdk-js-v3)** — Official AWS SDK
- **[Swagger UI](https://swagger.io/tools/swagger-ui/)** — Interactive API docs
- **[Helmet](https://helmetjs.github.io)** — Security headers
- **[Morgan](https://github.com/expressjs/morgan)** — HTTP logging
- **[Multer](https://github.com/expressjs/multer)** — File upload handling
- **[Docker](https://www.docker.com)** — Containerization

---

## 🤝 Contributing

Contributions are what make open source amazing. Any contribution you make is **greatly appreciated**.

Please read the **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide.

### How to contribute

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/add-sqs-support
   ```
3. **Make** your changes
4. **Commit** with a clear message
   ```bash
   git commit -m "feat: add SQS queue support"
   ```
5. **Push** and open a **Pull Request**

### What to contribute

- [ ] New AWS services (SQS, SNS, DynamoDB, RDS, CloudWatch...)
- [ ] Tests (Jest integration tests)
- [ ] Bug fixes
- [ ] Documentation improvements
- [ ] Performance improvements

### Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org):

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `refactor:` | Code refactoring |
| `chore:` | Maintenance tasks |

---

## 🗺️ Roadmap

- [x] S3 — Buckets, Objects, Presigned URLs, Versioning
- [x] EBS — Volumes, Snapshots
- [x] Glacier — Vaults, Archives, Jobs
- [x] EC2 — List, Start, Stop, Terminate
- [x] Lambda — List, Invoke, Deploy, Delete
- [ ] SQS — Queues, Messages
- [ ] SNS — Topics, Subscriptions, Publish
- [ ] DynamoDB — Tables, CRUD items
- [ ] CloudWatch — Metrics, Alarms
- [ ] IAM — Users, Roles, Policies
- [ ] Route53 — DNS Records
- [ ] API Key authentication middleware
- [ ] Jest integration test suite
- [ ] GitHub Actions CI/CD pipeline

---

## 📄 License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## ⭐ Support

If aws-rest-api saves you time, please consider giving it a star on GitHub — it helps others discover the project.

<div align="center">
  <a href="https://github.com/adityayaduvanshi/aws-rest-api">
    <img src="https://img.shields.io/github/stars/adityayaduvanshi/aws-rest-api?style=social" alt="Star on GitHub" />
  </a>
</div>
