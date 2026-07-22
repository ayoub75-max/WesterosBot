require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];

console.log("📂 جاري تحميل الأوامر...");

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data) {
        commands.push(command.data.toJSON());
        console.log(`✅ تم تحميل: ${file}`);
    }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const CLIENT_ID = "1529375929158078566";

const GUILD_ID = "1351567234262237236";

(async () => {
    try {
        console.log("🔄 جاري تسجيل أوامر Discord...");

        await rest.put(
            Routes.applicationGuildCommands(
                CLIENT_ID,
                GUILD_ID
            ),
            {
                body: commands,
            }
        );

        console.log("✅ تم تسجيل الأوامر بنجاح!");
    } catch (error) {
        console.error("❌ خطأ:");
        console.error(error);
    }
})();