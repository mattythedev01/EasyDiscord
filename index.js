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

  const options = [
    "TypeScript",
    "JavaScript",
    "Python",
    "C#",
    "Java",
    "Rust",
    "Go",
    "Kotlin",
    "Ruby",
  ];

  function renderOptions() {
    console.log("\nChoose your preferred language:");
    options.forEach((option, index) => {
      console.log(
        colors[
          index === 0
            ? "cyan"
            : index === 1
            ? "yellow"
            : index === 2
            ? "magenta"
            : index === 3
            ? "green"
            : index === 4
            ? "red"
            : index === 5
            ? "blue"
            : index === 6
            ? "white"
            : index === 7
            ? "grey"
            : "magenta"
        ](`${index + 1}. ${option}`)
      );
    });
    process.stdout.write("Enter your choice (1-9): ");
  }

  renderOptions();

  return new Promise((resolve) => {
    rl.on("line", async (input) => {
      const choice = parseInt(input.trim());
      if (choice >= 1 && choice <= 9) {
        const selectedOption = options[choice - 1];
        const repoUrl =
          selectedOption === "JavaScript"
            ? "https://github.com/mattythedev01/discordhandler"
            : selectedOption === "TypeScript"
            ? "https://github.com/MericcaN41/discordjs-v14-template-ts"
            : selectedOption === "Python"
            ? "https://github.com/kkrypt0nn/Python-Discord-Bot-Template"
            : selectedOption === "C#"
            ? "https://github.com/BrammyS/Discord-Bot-Template"
            : selectedOption === "Java"
            ? "https://github.com/botway-templates/discord-java"
            : selectedOption === "Rust"
            ? "https://github.com/Coca162/rust-bot-template"
            : selectedOption === "Go"
            ? "https://github.com/disgoorg/bot-template"
            : selectedOption === "Ruby"
            ? "https://github.com/botway-templates/discord-ruby"
            : "https://github.com/flytegg/kotlin-discord-bot-template";
        const targetDir = path.join(process.cwd(), "discord-bot");

        console.log(colors.green(`\nCreating 'discord-bot' folder...`));
        fs.mkdirSync(targetDir, { recursive: true });

        console.log(colors.green(`Downloading ${selectedOption} template...`));

        try {
          execSync(`git clone ${repoUrl} ${targetDir}`, { stdio: "inherit" });
          console.log(colors.green("Template downloaded successfully!"));

          // Create .env file
          const envPath = path.join(targetDir, ".env");
          let envContent;
          if (selectedOption === "TypeScript") {
            envContent = `TOKEN=YOUR_BOT_TOKEN_HERE
CLIENT_ID=YOUR_BOT_CLIENT_ID
PREFIX=!
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
MONGO_DATABASE_NAME=YOUR_DATABASE_NAME`;
          } else if (selectedOption === "JavaScript") {
            envContent = `DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
MONGODB_URI=YOUR_MONGO_CONNECTION_STRING`;
          } else if (selectedOption === "Python") {
            envContent = `TOKEN=YOUR_BOT_TOKEN_HERE
PREFIX=!
OWNERS=YOUR_DISCORD_USER_ID
MONGO_CONNECTION_STRING=YOUR_MONGO_CONNECTION_STRING`;
          } else if (selectedOption === "C#") {
            envContent = `Token=YOUR_BOT_TOKEN_HERE
Prefix=!
ConnectionString=YOUR_DATABASE_CONNECTION_STRING`;
          } else if (selectedOption === "Java") {
            envContent = `BOT_TOKEN=YOUR_BOT_TOKEN_HERE`;
          } else if (selectedOption === "Go") {
            envContent = `BOT_TOKEN=YOUR_BOT_TOKEN_HERE`;
          } else if (selectedOption === "Kotlin") {
            envContent = `BOT_TOKEN=YOUR_BOT_TOKEN_HERE`;
          } else if (selectedOption === "Ruby") {
            envContent = `BOT_TOKEN=YOUR_BOT_TOKEN_HERE`;
          } else {
            envContent = `DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE`;
          }

          fs.writeFileSync(envPath, envContent);
          console.log(
            colors.green(".env file created with required variables.")
          );

          // Install dependencies
          console.log(colors.green("\nInstalling dependencies..."));
          if (selectedOption === "Python") {
            execSync("pip install -r requirements.txt", {
              cwd: targetDir,
              stdio: "inherit",
            });
          } else if (selectedOption === "C#") {
            execSync("dotnet restore", { cwd: targetDir, stdio: "inherit" });
          } else if (selectedOption === "Java") {
            execSync("mvn install", { cwd: targetDir, stdio: "inherit" });
          } else if (selectedOption === "Rust") {
            execSync("cargo build", { cwd: targetDir, stdio: "inherit" });
          } else if (selectedOption === "Go") {
            execSync("go mod tidy", { cwd: targetDir, stdio: "inherit" });
          } else if (selectedOption === "Kotlin") {
            execSync("./gradlew build", { cwd: targetDir, stdio: "inherit" });
          } else if (selectedOption === "Ruby") {
            execSync("bundle install", { cwd: targetDir, stdio: "inherit" });
          } else {
            execSync("npm install", { cwd: targetDir, stdio: "inherit" });
          }
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
          if (selectedOption === "Python") {
            console.log(
              colors.yellow(
                `3. Run 'python bot.py' to start your ${selectedOption} bot`
              )
            );
          } else if (selectedOption === "C#") {
            console.log(
              colors.yellow(
                `3. Run 'dotnet run' to start your ${selectedOption} bot`
              )
            );
          } else if (selectedOption === "Java") {
            console.log(
              colors.yellow(
                `3. Run 'mvn exec:java' to start your ${selectedOption} bot`
              )
            );
          } else if (selectedOption === "Rust") {
            console.log(
              colors.yellow(
                `3. Run 'cargo run' to start your ${selectedOption} bot`
              )
            );
          } else if (selectedOption === "Go") {
            console.log(
              colors.yellow(
                `3. Run 'go run .' to start your ${selectedOption} bot`
              )
            );
          } else if (selectedOption === "Kotlin") {
            console.log(
              colors.yellow(
                `3. Run './gradlew run' to start your ${selectedOption} bot`
              )
            );
          } else if (selectedOption === "Ruby") {
            console.log(
              colors.yellow(
                `3. Run 'ruby bot.rb' to start your ${selectedOption} bot`
              )
            );
          } else {
            console.log(
              colors.yellow(
                `3. Run 'npm start' to start your ${selectedOption} bot`
              )
            );
          }
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
        console.log(
          colors.red("Invalid choice. Please enter a number between 1 and 9.")
        );
        renderOptions();
      }
    });
  });
}

module.exports = EasyDiscord;
