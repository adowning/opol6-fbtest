# opol6-fstest

:poodle: A Vue fullstack project

## Table of Contents

* [Getting Started](#getting-started)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Directory Structure](#directory-structure)

## Getting Started

Follow steps to execute this boilerplate.

1. Install dependencies

```bash
$ yarn install

# install flow types
$ yarn typed
```

2. Set an active project for working direct

```bash
$ yarn firebase use development
```

3. Start a local server

```bash
# front-end
$ yarn start:app

# back-end
$ yarn start:api
```

4. Compile and bundle code

```bash
# front-end
$ yarn build:app

# back-end
$ yarn build:api
```

5. Check the code quality

```bash
# front-end
$ yarn lint:app

# back-end
$ yarn lint:api
```

6. Run the unit tests

```bash
# front-end
$ yarn test:app

# back-end
$ yarn test:api
```

7. Run the end-to-end tests

```bash
# front-end
$ yarn e2e:app

# back-end
$ yarn e2e:api
```

This project is separated from the front-end and back-end. If you are looking for **Isomorphic JavaScript** you can go [here](https://github.com/Shyam-Chen/Universal-Vue-Starter).

## Dockerization

Dockerize an application.

1. Build and run the container in the background

```bash
$ docker-compose up -d <SERVICE>
```

2. Run a command in a running container

```bash
$ docker-compose exec <SERVICE> <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

4. Restart up the container in the background

```bash
$ docker-compose up -d --build <SERVICE>
```

5. Push images to Docker Cloud

```diff
# .gitignore

  .DS_Store
  node_modules
  npm
  public
  functions
  coverage
+ Dockerfile.dev
+ Dockerfile.prod
  *.log
```

```bash
$ docker login
$ docker build -f tools/Dockerfile.<dev|prod> -t <IMAGE_NAME>:<IMAGE_TAG> .

# checkout
$ docker images

$ docker tag <IMAGE_NAME>:<IMAGE_TAG> <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
$ docker push <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>

# remove
$ docker rmi <REPOSITORY>:<TAG>
# or
$ docker rmi <IMAGE_ID>
```

6. Pull images from Docker Cloud

```diff
# docker-compose.yml

  <dev|prod>:
-   image: <dev|prod>
-   build:
-     context: .
-     dockerfile: tools/Dockerfile.<dev|prod>
+   image: <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
    volumes:
      - yarn:/home/node/.cache/yarn
    tty: true
```

## Configuration

### Project environments

Change to your project.

```js
// .firebaserc
{
  "projects": {
    "development": "<PROJECT_NAME>",
    "production": "<PROJECT_NAME>"
  }
}
```

### Default environments

Set your local environment variables. (use `this.<ENV_NAME> = process.env.<ENV_NAME> || <LOCAL_ENV>;`)

```js
// env.js
function Environments() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.PROJECT_NAME = process.env.PROJECT_NAME || '<PROJECT_NAME>';

  this.HOST_NAME = process.env.HOST_NAME || '0.0.0.0';

  this.SITE_PORT = process.env.SITE_PORT || 8000;
  this.SITE_URL = process.env.SITE_URL || `http://${this.HOST_NAME}:${this.SITE_PORT}`;

  this.FUNC_PORT = process.env.FUNC_PORT || 5000;
  this.FUNC_URL = process.env.FUNC_URL || `http://${this.HOST_NAME}:${this.FUNC_PORT}/${this.PROJECT_NAME}/us-central1`;

  this.APP_BASE = process.env.APP_BASE || '/';

  this.FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || {
    apiKey: process.env.FIREBASE_API_KEY || '<API_KEY>',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '<FIREBASE_AUTH_DOMAIN>',
    databaseURL: process.env.FIREBASE_DATABASE_URL || '<FIREBASE_DATABASE_URL>',
    projectId: process.env.FIREBASE_PROJECT_ID || '<FIREBASE_PROJECT_ID>',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '<FIREBASE_STORAGE_BUCKET>',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '<FIREBASE_MESSAGING_SENDER_ID>',
  };

  this.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || '<GOOGLE_ANALYTICS>';

  this.SENTRY_DSN = process.env.SENTRY_DSN || null;
  this.RENDERTRON_URL = process.env.RENDERTRON_URL || null;
}
```

### Deployment environment

Set your deployment environment variables.

```dockerfile
# tools/Dockerfile.<dev|prod>

# envs --
ENV SITE_URL <SITE_URL>
ENV FUNC_URL <FUNC_URL>

ENV SENTRY_DSN <SENTRY_DSN>
# -- envs
```

### CI environment

Add environment variables to the CircleCI build.

```yml
CODECOV_TOKEN
DOCKER_PASSWORD
DOCKER_USERNAME
FIREBASE_TOKEN
```

### SEO friendly

Enable billing on your Firebase Platform and Google Cloud the project by switching to the Blaze plan.

Serve dynamic content for bots.

```diff
// firebase.json
    "rewrites": [
      {
        "source": "**",
-       "destination": "/index.html"
+       "function": "app"
      }
    ],
```

Deploy rendertron instance to Google App Engine.

```bash
$ git clone https://github.com/GoogleChrome/rendertron
$ cd rendertron
$ gcloud auth login
$ gcloud app deploy app.yaml --project <RENDERTRON_NAME>
```

Set your rendertron instance in deployment environment.

```dockerfile
# tools/Dockerfile.<dev|prod>

# envs --
ENV RENDERTRON_URL <RENDERTRON_URL>
# -- envs
```

### VS Code settings

The most basic configuration.

```js
{
  "window.zoomLevel": 1,
  "workbench.colorTheme": "Material Theme",
  "workbench.iconTheme": "material-icon-theme",
  "eslint.validate": [
    "javascript", {
      "language": "vue"
    },
    "javascriptreact",
    "html"
  ],
  "javascript.validate.enable": false,
  "vetur.validation.script": false
}
```

## Directory Structure

The structure follows the LIFT Guidelines.

```coffee
.
├── src
│   ├── api
│   │   ├── __tests__
│   │   │   └── ...
│   │   ├── _<THING>  -> api of private things
│   │   │   └── ...
│   │   ├── core  -> core feature module
│   │   │   └── ...
│   │   ├── graphql
│   │   │   └── <FEATURE>  -> feature modules
│   │   │       ├── __tests__
│   │   │       │   └── ...
│   │   │       ├── _<THING>  -> feature of private things
│   │   │       │   └── ...
│   │   │       └── ...
│   │   ├── <FEATURE>  -> feature modules
│   │   │   ├── __tests__
│   │   │   │   └── ...
│   │   │   ├── _<THING>  -> feature of private things
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── shared  -> shared feature module
│   │   │   └── ...
│   │   └── index.js
│   ├── app
│   │   ├── __tests__
│   │   │   └── ...
│   │   ├── _<THING>  -> app of private things
│   │   │   └── ...
│   │   ├── core  -> core feature module
│   │   │   └── ...
│   │   ├── <FEATURE>  -> feature modules
│   │   │   ├── __tests__
│   │   │   │   ├── actions.spec.js
│   │   │   │   ├── <FEATURE>.e2e-spec.js
│   │   │   │   ├── <FEATURE>.spec.js
│   │   │   │   ├── getters.spec.js
│   │   │   │   └── mutations.spec.js
│   │   │   ├── _<THING>  -> feature of private things
│   │   │   │   └── ...
│   │   │   ├── actions.js
│   │   │   ├── constants.js
│   │   │   ├── <FEATURE>.vue
│   │   │   ├── getters.js
│   │   │   ├── mutations.js
│   │   │   └── types.js
│   │   ├── shared  -> shared feature module
│   │   │   └── ...
│   │   ├── actions.js
│   │   ├── App.vue
│   │   ├── constants.js
│   │   ├── getters.js
│   │   ├── mutations.js
│   │   └── types.js
│   ├── assets  -> datas, fonts, images, medias, styles
│   ├── client.js
│   ├── index.html
│   └── server.js
├── tools
│   └── ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .firebaserc
├── .flowconfig
├── .gitignore
├── .postcssrc
├── .stylelintrc
├── Dockerfile
├── LICENSE
├── README.md
├── circle.yml
├── docker-compose.yml
├── env.js
├── firebase.json
├── gulpfile.js
├── jest.config.js
├── package.json
├── webpack.config.js
└── yarn.lock
```
