import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue, TimeData, Track, Util } from "discord-player";
import { ButtonInteraction, Interaction, Message, MessageActionRow } from "discord.js";
import { MessageButton, MessageEmbed } from "discord.js";
import { Embed } from "../../typing/Embed";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand({
    uniqueName: "queue",
    data: new SlashCommandBuilder()
        .setName("queue")
        
        .setDescription("Open the queue of songs"),
    voiceChannel: false,
    execute: async ({ interaction, options, client }) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        const tracks: Array<Track> = queue?.tracks;
        if (!tracks || tracks.length === 0) {
            interaction.reply("There are no songs yet.")
        } else {
            const pages: Array<MessageEmbed> = [];
            let i = 0, page = 0;
            while (i < tracks.length) {
                const sliced: Array<Track> = tracks.slice(i, i + 10);
                const texted: Array<string> = sliced.map((track: Track, i: number) => `\`${i + 1}.\` ${track.title}`);
                const embed: MessageEmbed = Embed(interaction).setAuthor({ name: "Added songs" }).setDescription(texted.join("\n")).setColor('RANDOM').setTitle(`Duration: ${Util.buildTimeCode(Util.parseMS(queue.totalTime))}`)
                pages.push(embed);
                i += 10;
            };

            const ids: Array<string> = [interaction.member.user.id];
            
            const b1: MessageButton = new MessageButton()
                .setCustomId("left")
                .setStyle("SECONDARY")
                .setEmoji("⬅");

            const b2: MessageButton = new MessageButton()
                .setCustomId("right")
                .setStyle("SECONDARY")
                .setEmoji("➡");

            var buttons: Array<MessageButton> = [b1, b2];

            if (pages.length === 1) buttons = buttons.map((button : MessageButton) => button.setDisabled(true));

            const row = new MessageActionRow().addComponents(buttons);

            const curPage = await interaction.reply({
                embeds: [pages[page].setFooter({text: `${page + 1} / ${pages.length}`})],
                components: [row], fetchReply: true,
            }) as Message;


            const filter = (i) => {
                if (
                    (i.customId === buttons[0].customId ||
                        i.customId === buttons[1].customId) &&
                    ids.includes(i.user.id)) {
                    return true;
                } else if (!ids.includes(i.user.id)) {
                    const intEmbed = new MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle("Error!")
                        .setDescription("Author of this message is not you!");

                    return i.reply({ embeds: [intEmbed], ephemeral: true })
                }

            };

            const collector = curPage.createMessageComponentCollector({
                filter,
                time: 100000,
            });
            let toClose = false;
            collector.on("collect", async (i) => {
                await i.deferUpdate();
                switch (i.customId) {
                    case buttons[0].customId:
                        page = page > 0 ? --page : pages.length - 1;
                        break;
                    case buttons[1].customId:
                        page = page + 1 < pages.length ? ++page : 0;
                        break;
                    default:
                        break;
                }
                await i.editReply({
                    embeds: [pages[page].setFooter({text: `${page + 1} / ${pages.length}`})],
                    components: [row],
                }).catch(() => console.log('❌'));
                collector.resetTimer();
            });
            
            collector.on("end", () => {
                if (curPage && !toClose) {
                    const disabledRow = new MessageActionRow().addComponents(
                        buttons[0].setDisabled(true),
                        buttons[1].setDisabled(true),
                    );
                    curPage.edit({
                        embeds: [pages[page].setFooter({text: `${page + 1} / ${pages.length}`})],
                        components: [disabledRow],
                    });
                }
            });
        }
    }
})