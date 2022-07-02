import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue, Track } from "discord-player";
import { MessageEmbed, MessageEmbedAuthor } from "discord.js";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "now-playing",
    data: new SlashCommandBuilder()
    .setName("now-playing")
    
    .setDescription("See playing song"),
    voiceChannel: false,
    execute: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        const track: Track = queue?.nowPlaying();
        
        if (!queue || !track) return interaction.reply("There is no song playing.");
        const authorData: MessageEmbedAuthor = {
            name: track.title
        };
        if (track.url) authorData.url = track.url;
        const timestamp = queue.createProgressBar()
        const embed: MessageEmbed = client.embed("RANDOM").setAuthor(authorData).setDescription(`Added by ${track.requestedBy}\n${timestamp}`).setThumbnail(track.thumbnail);
        interaction.reply({embeds: [embed]});
    }
})