import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue } from "discord-player";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "resume",
    data: new SlashCommandBuilder()
    .setName("resume")
    
    .setDescription("Resume the song from pause"),
    voiceChannel: true,
    execute: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        if (!queue) return interaction.reply("There is no song playing.");
        
        queue.setPaused(false);

        interaction.reply("▶ | Resuming..");
    }
})