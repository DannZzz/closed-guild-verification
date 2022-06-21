import { ModalBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { stripIndents } from "common-tags";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { MessageActionRow, MessageButton } from "discord.js";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand({
    uniqueName: "send-verify-message",
    data: new SlashCommandBuilder()
        .setDMPermission(false)
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
            .setTitle(`+ | Правила нашего сервера`)
            .setText(stripIndents`
            —— | Нецензурная брань разрешена, но **без злоупотреблений**.

            —— | **Оскорблять** других пользователей запрещено.

            —— | Нельзя использовать **NSFW**: шоковое содержание, **порнографию**.

            —— | Все виды **флуда**, а так же **SPAM** запрещены.

            —— | Жёсткий **троллинг** запрещён.

            —— | Размещение** рекламы** без предварительного согласия со стороны администратора запрещено.

            —— | В сообщениях нельзя отправлять **рассылки со спамом**.

            —— | Отправлять **ссылки** можно при согласовании с администратором.

            —— | Не допускается включение **музыки в микрофон** во время звонка, или конференции.

            —— | В микрофон не должны попадать посторонние звуки, которые **мешают** общению.

            —— | Пользователи не могут использовать картинки с изображением **террористических** организаций.

            —— | Администраторы могут потребовать от участника  сменить аватарку, или ник, если смысл сосредоточен на **оскорблении**.
            
            —— | Если вы **нарушаете правила** сервера, против вас будут **приняты меры** вплоть до ограничения доступа. 

            —— | **Обход запрета входом на сервер** под другим ником или другими средствами — бан.

            —— | Администратор **имеет право отказать** в доступе любому участнику. Ему **не нужно** указывать причины или предупреждать об этом. 

            —— | Категорический запрет на **неуважение и оскорбление** других пользователей.

            —— | Запрещено разжигать **этнические конфликты**, конфликты **по политическим и религиозным мотивам**.
            `)
            .newField(`! | Подтверждение`, `Нажмите на кнопку ниже, чтобы ввести пароль!`)
            .send(interaction.channel, {components: [new MessageActionRow().addComponents(button)]})
        
    }
        
})