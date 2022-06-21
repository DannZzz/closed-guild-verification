import { MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import Event from "../typing/Event";

export default new Event({
    name: "interactionCreate",
    async callback(client, interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === "input-password") {
            const input = new TextInputComponent().setStyle("SHORT").setCustomId("password").setPlaceholder("Думаешь, ты знаешь??").setLabel("Пароль").setMaxLength(50).setRequired(true)

            const row = new MessageActionRow<ModalActionRowComponent>().addComponents(input);

            const modal = new Modal().setCustomId("getting-password").setTitle("Верификация").addComponents(row);
            await interaction.showModal(modal);
        }

    }
})