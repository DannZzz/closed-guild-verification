import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue } from "discord-player";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "pause",
    data: new SlashCommandBuilder()
    .setName("pause")
    
    .setDescription("Set the pause"),
    voiceChannel: true,
    execute: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return interaction.reply("There is no song playing.");

        queue.setPaused(true);

        interaction.reply("⏸ | Song already paused.");
    }
})