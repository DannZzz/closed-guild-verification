import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue } from "discord-player";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "skip",
    data: new SlashCommandBuilder()
    .setName("skip")
    
    .setDescription("Skip the song") as SlashCommandBuilder,
    voiceChannel: true,
    execute: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        if (!queue) return interaction.reply("There are no songs playing yet.");
        queue.skip();
        interaction.reply("Skipped!.");
    }
})