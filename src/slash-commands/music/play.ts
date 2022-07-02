import { SlashCommandBuilder } from "@discordjs/builders";
import { GuildMember } from "discord.js";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: "play",
    data: new SlashCommandBuilder()
    .setName("play")
    
    .setDescription("Play a music")
    .addStringOption(o => o
        .setName("song")
        .setDescription("Song title or link")
        .setRequired(true)
    ) as any,
    voiceChannel: true,
    execute: async ({client, interaction, options}) => {
        const query = options.getString("song");
        const queue = client.player.createQueue(interaction.guild, {
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
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Song **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Looking for **${track.title}**!` });
    }
})