"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const consoleTag = {
    errorTag: '\u001b[31m' + " Error: " + '\u001b[0m',
    warningTag: '\u001b[33m' + "Warning" + '\u001b[0m',
    successTag: '\u001b[32m' + " Success: " + '\u001b[0m',
    fromServer: '\u001b[36m' + "[Server]" + '\u001b[0m',
    fromDiscord: '\u001b[35m' + "[Discord]" + '\u001b[0m'
};
class Handler {
    constructor(client) {
        this.client = client;
    }
    async onReady() {
        console.log(consoleTag.fromServer + consoleTag.successTag + "Login");
    }
    async onInteractionCreate(interaction) {
        if (!interaction.isCommand())
            return;
        const command = interaction.command;
        if (command.name in this.client.commands) {
            this.client.commands[command.name].call(this.client.commands[command.name], interaction, interaction.options.data);
        }
        else {
            interaction.reply({
                content: ":thinking:",
                ephemeral: true
            });
            command.delete();
        }
        ;
    }
    async onError(err) {
        console.error(consoleTag.errorTag + err);
    }
}
exports.Handler = Handler;
