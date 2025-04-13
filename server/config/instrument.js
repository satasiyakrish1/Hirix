import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "",
  integrations: [
    Sentry.mongooseIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0 //  Capture 100% of the transactions
});