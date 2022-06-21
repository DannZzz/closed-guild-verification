import { GuildMemberRoleManager } from "discord.js";
import Models from "../database/db";
import Event from "../typing/Event"

export default new Event({
    name: "interactionCreate",
    async callback (client, interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === "getting-password") {
            const password = interaction.fields.getTextInputValue('password');

            const model = new Models('Guild');
            const guild = await model.findOrCreate(interaction.guildId);

            if (guild?.joinPasswords?.length > 0 && !guild.joinPasswords.includes(password)) return interaction.reply({content: "Хаха, неправильно.", ephemeral: true});
            await interaction.reply({content: "Правильно ввёл, молодец чел!", ephemeral: true});
            setTimeout(() => {
                if (guild.verifyRole && interaction.guild.roles.cache.has(guild.verifyRole)){
                    try {
                        (interaction.member.roles as GuildMemberRoleManager).add(guild.verifyRole);
                    } catch{}
                }
            }, 3000)

        }
    }
})