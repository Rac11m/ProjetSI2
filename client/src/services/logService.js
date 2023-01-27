// import Raven from 'raven-js';

function init() {
  // Raven.config(
  //   "https://3460949ee1f745af8eb40ff74c8bb810@o1341938.ingest.sentry.io/6615462",
  //   {
  //     release: "1-0-0",
  //     environment: "development-test",
  //     // Set tracesSampleRate to 1.0 to capture 100%
  //     // of transactions for performance monitoring.
  //     // We recommend adjusting this value in production
  //     //   tracesSampleRate: 1.0,
  //   }
  // ).install();
}

function log(error) {
  console.log(error);
}

const exportedObject = {
  init,
  log,
};

export default exportedObject;
