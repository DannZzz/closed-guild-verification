import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue, Track } from "discord-player";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand({
    uniqueName: "loop",
    data: (new SlashCommandBuilder()
        .setName("loop")
        
        .setDescription("On/off loop")
        .addStringOption(o => o
            .setName("mode")
            .setDescription("Loop Mode")
            .setRequired(true)
            .addChoices(
                {name: "off", value: "off"},
                {name: "song", value: "track"},
                {name: "queue", value: "queue"},
            )
        )) as SlashCommandBuilder,
    voiceChannel: true,
    async execute({client, options, interaction}) {
        const mode = options.getString("mode");
        const queue: Queue = client.player.getQueue(interaction.guild);
        const track: Track = queue?.nowPlaying();
        
        if (!queue || !track) return interaction.reply("There is no song playing.");
        if (mode === "off") {
            queue.setRepeatMode(0);
            interaction.reply("🔃 | Loop was disabled.");
        } else if (mode === "track") {
            queue.setRepeatMode(1);
            interaction.reply("🔃 | Loop of song started.");
        } else if (mode === "queue") {
            queue.setRepeatMode(2);
            interaction.reply("🔃 | Loop of queue started.");
        }
    }
    
})