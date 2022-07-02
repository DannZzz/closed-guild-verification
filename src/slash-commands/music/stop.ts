import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue } from "discord-player";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "stop",
    data: new SlashCommandBuilder()
    .setName("stop")
    
    .setDescription("Stop player"),
    voiceChannel: true,
    execute: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        if (!queue) return interaction.reply("There are no songs playing yet.");
        queue.destroy();
        interaction.reply("Successfully stopped!");
    }
})