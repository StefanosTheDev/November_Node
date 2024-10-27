const winston = require('winston');
const DatadogTransport = require('datadog-winston');
const dotenv = require('dotenv');
const os = require('os');
dotenv.config({ path: '../config.env' }); // Load environment variables

const logger = winston.createLogger({
  transports: [
    new DatadogTransport({
      apiKey: process.env.DATADOG_API_KEY,
      hostname: os.hostname(),
      service: 'your-nodejs-app',
      ddsource: 'nodejs',
      ddtags: 'env:development,version:1.0.0',
    }),
  ],
});

// Example usage
logger.info('This is an informational message');
logger.error('This is an error message');
