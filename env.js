function Environments() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.PROJECT_NAME = process.env.PROJECT_NAME || 'opol6-dev';

  this.HOST_NAME = process.env.HOST_NAME || '0.0.0.0';

  this.SITE_PORT = process.env.SITE_PORT || 8000;
  this.SITE_URL = process.env.SITE_URL || `http://${this.HOST_NAME}:${this.SITE_PORT}`;

  this.FUNC_PORT = process.env.FUNC_PORT || 5000;
  this.FUNC_URL = process.env.FUNC_URL || `http://${this.HOST_NAME}:${this.FUNC_PORT}/${this.PROJECT_NAME}/us-central1`;

  this.APP_BASE = process.env.APP_BASE || '/';

  this.FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || {
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyD-BsWzPHYrXvuQsh0NeXF9u9T82JYzbQA',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'opol6-dev.firebaseapp.com',
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://opol6-dev.firebaseio.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'opol6-dev',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'opol6-dev.appspot.com',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '258468941701',
  };

  this.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || 'UA-84381641-2';

  this.SENTRY_DSN = process.env.SENTRY_DSN || `https://086c8500b9084209b28d5b4118dd470d@sentry.io/1225682`;
  this.RENDERTRON_URL = process.env.RENDERTRON_URL || null;
}

module.exports = new Environments();
