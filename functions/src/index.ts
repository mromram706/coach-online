import * as functions from 'firebase-functions';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

exports.nextjsFunc = functions.region('europe-west1').https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
