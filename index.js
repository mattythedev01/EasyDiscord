#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const colors = require("colors");
const figlet = require("figlet");

async function EasyDiscord() {
  console.clear();
  console.log(
    colors.rainbow(
      figlet.textSync("EasyDiscord", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const options = ["TypeScript", "JavaScript"];

  function renderOptions() {
    console.log("\nChoose your preferred language:");
    options.forEach((option, index) => {
      console.log(
        colors[index === 0 ? "cyan" : "yellow"](`${index + 1}. ${option}`)
      );
    });
    process.stdout.write("Enter your choice (1 or 2): ");
  }

  renderOptions();

  return new Promise((resolve) => {
    rl.on("line", async (input) => {
      const choice = parseInt(input.trim());
      if (choice === 1 || choice === 2) {
        const selectedOption = options[choice - 1];
        const repoUrl =
          selectedOption === "JavaScript"
            ? "https://github.com/mattythedev01/discordhandler"
            : "https://github.com/MericcaN41/discordjs-v14-template-ts";
        const targetDir = path.join(process.cwd(), "discord-bot");

        console.log(colors.green(`\nCreating 'discord-bot' folder...`));
        fs.mkdirSync(targetDir, { recursive: true });

        console.log(colors.green(`Downloading ${selectedOption} template...`));

        try {
          execSync(`git clone ${repoUrl} ${targetDir}`, { stdio: "inherit" });
          console.log(colors.green("Template downloaded successfully!"));

          // Create .env file
          const envPath = path.join(targetDir, ".env");
          const envContent =
            selectedOption === "TypeScript"
              ? `TOKEN=YOUR_BOT_TOKEN_HERE
CLIENT_ID=YOUR_BOT_CLIENT_ID
PREFIX=!
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
MONGO_DATABASE_NAME=YOUR_DATABASE_NAME`
              : `DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
MONGODB_URI=YOUR_MONGO_CONNECTION_STRING`;

          fs.writeFileSync(envPath, envContent);
          console.log(
            colors.green(".env file created with required variables.")
          );

          // Install dependencies
          console.log(colors.green("\nInstalling dependencies..."));
          execSync("npm install", { cwd: targetDir, stdio: "inherit" });
          console.log(colors.green("Dependencies installed successfully!"));

          console.log(
            colors.bold.green("\nYour Discord bot project is ready!")
          );
          console.log(colors.yellow("\nNext steps:"));
          console.log(colors.yellow("1. cd discord-bot"));
          console.log(
            colors.yellow(
              "2. Update the .env file with your bot token and other credentials"
            )
          );
          console.log(
            colors.yellow(
              `3. Run 'npm start' to start your ${selectedOption} bot`
            )
          );
        } catch (error) {
          console.error(
            colors.red("Error setting up the project:"),
            error.message
          );
        } finally {
          rl.close();
          resolve(selectedOption);
        }
      } else {
        console.log(colors.red("Invalid choice. Please enter 1 or 2."));
        renderOptions();
      }
    });
  });
}

module.exports = EasyDiscord;
