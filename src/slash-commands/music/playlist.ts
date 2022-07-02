import { SlashCommandBuilder } from "@discordjs/builders";
import { Player, Track } from "discord-player";
import { GuildMember } from "discord.js";
import Models from "../../database/db";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "playlist",
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription("Some methods with playlist")
        .addSubcommand(s => s
            .setName("check")
            .setDescription("Check your playlist"))
        .addSubcommand(s => s
            .setName("play")
            .setDescription("Play your playlist's songs"))
        .addSubcommand(s => s
            .setName("add")
            .setDescription("Add song to playlist")
            .addStringOption(o => o
                .setName("song")
                .setDescription("song name or current")))
        .addSubcommand(s => s
            .setName("remove")
            .setDescription("Remove song from play")
            .addIntegerOption(o => o
                .setName("number")
                .setRequired(true)
                .setDescription("number of song from the playlist"))) as any,
    async execute ({interaction, options, client, Embed, thisUser}) {
        const player = client.player as Player;
        const cmd = options.getSubcommand();
        const songName = options.getString('song');
        const number = options.getInteger('number');
        const playlist = thisUser.playlist || [];
        if (cmd === "check") {
            Embed
                .setTitle("Your Playlist")
                .setText(playlist.length === 0 ? "Empty.." : playlist.map((n, i) => `\`${i+1}.\` ${n}`).join("\n"))
                .interactionReply(interaction)
        } else if(cmd === "play") {
            if (playlist.length === 0 ) return interaction.reply("U dont have any songs in playlist");
            const queue = player.createQueue(interaction.guild, {
                metadata: {
                    channel: interaction.channel
                }
            });
            
            // verify vc connection
            try {
                if (!queue.connection) await queue.connect((interaction.member as GuildMember).voice.channel);
            } catch {
                queue.destroy();
                return await interaction.reply({ content: "I can't join to your channel!", ephemeral: true });
            }
            await interaction.deferReply();
            playlist.forEach(async (query, i) => {
                const track = await client.player.search(query, {
                    requestedBy: interaction.user
                }).then(x => x.tracks[0]);

                if (!track) return await interaction.followUp({ content: `❌ | Song **${query}** not found!` });
                if (i !== 0) {
                    queue.addTrack(track)
                } else {
                    queue.play(track)
                    interaction.followUp({ content: `⏱️ | Looking for **${track.title}**!` });
                }
            })            
        } else if (cmd === "add") {
            const queue = player.getQueue(interaction.guild);
            if ((!queue || !queue.current) && !songName) return interaction.reply("There are no songs to add!");
            var song: Track;
            if (songName) {
                const track = await client.player.search(songName, {
                    requestedBy: interaction.user
                }).then(x => x.tracks[0]);
                song = track;
            } else {
                song = queue.current
            }
            await (new Models('User')).model.updateOne({_id: interaction.user.id}, {$push: {playlist: song.title}});
            Embed
                .setSuccess(`Song \`${song.title}\` was successfully added to the playlist!`)
                .interactionReply(interaction);
        } else if (cmd === "remove") {
            if (number <= 0 && number > playlist.length) return interaction.reply("Song was not found!");

            const index = number - 1;
            const newPlaylist = client.util.remove(playlist, {elements: [], indexes: [index]});

            await (new Models('User')).model.updateOne({_id: interaction.user.id}, {$set: {playlist: newPlaylist}});
            Embed
                .setSuccess(`Song \`${playlist[index]}\` was successfully removed from the playlist!`)
                .interactionReply(interaction);
        }
    }
})