import * as discord from "discord.js"

type CommandFunc = (interaction: discord.CommandInteraction, args?: discord.CommandInteractionOption[]) => Promise<void>
type Commands = {[index:string]: CommandFunc}

interface _Client {
    commands: Commands
}

class Client extends discord.Client implements _Client {
    commands: Commands;
    constructor(options: discord.ClientOptions) {
        super(options);
        this.commands = {};
    }
    handler(handler: EventHandler) {
        this.on("ready", handler.onReady);
        this.on("error", handler.onError);
        this.on("interactionCreate", async(interaction: discord.Interaction) => {
            handler.onInteractionCreate.call(handler, interaction);
        });
    }
    command(options?: discord.ApplicationCommandOptionData[], desc?: string) {
        const self = this;
        return function(target: object, propertyKeys: string, descriptor: PropertyDescriptor) {
            const func: CommandFunc = descriptor.value;
            if(!self.application) return;
            self.application.commands.create({
                name: func.name,
                description: desc || "command",
                options: options
            }).then(console.log, console.error);
            console.log(func.name);
            self.add(["commands", func.name], func);
        }
    }
    add(keys: string[], value: any) {
        new Function("v", "self", "self." + keys.join(".") + " = v")(value, this);
    }
}

interface EventHandler {
    client: Client;
    onError: (err: Error) => Promise<void>;
    onReady?: () => Promise<void>;
    onInteractionCreate?: (interaction: discord.Interaction) => Promise<void>;
    onVoiceStateUpdate?: (oldstate: discord.VoiceState, newstate: discord.VoiceState) => Promise<void>;
}

export {
    EventHandler,
    Client
}