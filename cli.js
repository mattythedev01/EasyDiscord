#!/usr/bin/env node

const EasyDiscord = require("./index.js");

async function runCLI() {
  try {
    await EasyDiscord();
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  runCLI();
}

module.exports = runCLI;
