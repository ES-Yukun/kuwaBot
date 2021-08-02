import { Client } from "./client";
import { CommandInteractionOption, CommandInteraction, Intents, MessageEmbed } from "discord.js";
import { Handler } from "./handler";
import { config } from "dotenv";
const PromiseAwaiter = require("promise-awaiter");
config();

const client: Client = new Client({
    intents: new Intents([
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS"
    ])
});

const handler: Handler = new Handler(client);
client.handler(handler);
PromiseAwaiter(client.login(process.env.TOKEN));

class Commands {
    @client.command(null, "help me!")
    async help(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
        .setTitle("Help");
        interaction.reply({
            content: "お困りですか？",
            embeds: [embed],
            ephemeral: true
        });
    }
}