# lancer-deploy-tool

> A GitHub App built with [Probot](https://github.com/probot/probot) that A GitHub app to automagically update code version and comp usability for FRC deploys

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t lancer-deploy-tool .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> lancer-deploy-tool
```


