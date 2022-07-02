import { ModalBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { stripIndents } from "common-tags";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { MessageActionRow, MessageButton } from "discord.js";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand({
    uniqueName: "send-verify-message",
    data: new SlashCommandBuilder()
        
        .setName("verify-message")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("send verifying message"),
    async execute({interaction, command, Embed}) {
        interaction.reply({content: "Хорошо...", ephemeral: true});

        const button = new MessageButton()
                            .setCustomId("input-password")
                            .setStyle("SECONDARY")
                            .setLabel("Верификация")
                            .setEmoji("🔐")
        
        Embed
            .setTitle(`😎 | Вход закрыт`)
            .setText(stripIndents`Владелец сервера решил закрыть сервер от общего доступа.
            
            В настоящее время может зайти только ограниченное количество участников!`)
            .newField(`🕳 | Подтверждение`, `Нажмите на кнопку ниже, чтобы ввести пароль!`)
            .send(interaction.channel, {components: [new MessageActionRow().addComponents(button)]})
        
    }
        
})