"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const discord_js_1 = require("discord.js");
const handler_1 = require("./handler");
const dotenv_1 = require("dotenv");
const PromiseAwaiter = require("promise-awaiter");
dotenv_1.config();
const client = new client_1.Client({
    intents: new discord_js_1.Intents([
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
const handler = new handler_1.Handler(client);
client.handler(handler);
PromiseAwaiter(client.login(process.env.TOKEN));
class Commands {
    async help(interaction) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Help");
        interaction.reply({
            content: "お困りですか？",
            embeds: [embed],
            ephemeral: true
        });
    }
}
__decorate([
    client.command(null, "help me!"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.CommandInteraction]),
    __metadata("design:returntype", Promise)
], Commands.prototype, "help", null);
