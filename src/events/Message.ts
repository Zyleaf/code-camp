import { Message } from "discord.js";
import BaseClient from "../util/BaseClient";
import BaseEvent from "../util/BaseEvent";

export default class Msg extends BaseEvent {
    constructor() {
        super({
            name: "message",
            description: "Message event",
        });
    }
    async run (client: BaseClient, message: Message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(client.baseClient.prefix)) return;

        const args = message.content.slice(client.baseClient.prefix.length).trim().split(" ");
        const command = args.shift();

        const commandFile = client.baseClient.commands.get(command) || client.baseClient.commands.get(client.baseClient.aliases.get(command));

        if (commandFile) return commandFile.run(client, message, args);

    }
}