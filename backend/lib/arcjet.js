const dotenv = require("dotenv");
dotenv.config();
const { default: arcjet, shield, detectBot, slidingWindow } = require("@arcjet/node");


const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),

    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // "CATEGORY:MONITOR",
        // "CATEGORY:PREVIEW",
      ],
    }),

    // Create a token bucket rate limit
    slidingWindow({
      mode: "LIVE",
      max: 50,
      interval: 60,
    }),
  ],
});


module.exports = aj;