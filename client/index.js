"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord = require("discord.js");
class Client extends discord.Client {
    constructor(options) {
        super(options);
        this.commands = {};
    }
    handler(handler) {
        this.on("ready", handler.onReady);
        this.on("error", handler.onError);
        this.on("interactionCreate", async (interaction) => {
            handler.onInteractionCreate.call(handler, interaction);
        });
    }
    command(options, desc) {
        const self = this;
        return function (target, propertyKeys, descriptor) {
            const func = descriptor.value;
            if (!self.application)
                return;
            self.application.commands.create({
                name: func.name,
                description: desc || "command",
                options: options
            }).then(console.log, console.error);
            console.log(func.name);
            self.add(["commands", func.name], func);
        };
    }
    add(keys, value) {
        new Function("v", "self", "self." + keys.join(".") + " = v")(value, this);
    }
}
exports.Client = Client;
