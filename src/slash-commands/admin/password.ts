import { SlashCommandBuilder } from "@discordjs/builders";
import { PermissionFlagsBits } from "discord-api-types/v10";
import Models from "../../database/db";
import EmbedConstructor from "../../typing/Embed-Constructor";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand({
    uniqueName: "password-settings",
    data: new SlashCommandBuilder()
        
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setName("password")
        .setDescription("посмотреть пароли")
        .addSubcommand(o => o
            .setName("list")
            .setDescription("посмотреть список пароли"))
        .addSubcommand(o => o
            .setName("add")
            .setDescription("добавить новый пароль в список")
            .addStringOption(o => o
                .setName("password")
                .setDescription("новый пароль")
                .setRequired(true)))
        .addSubcommand(o => o
            .setName("remove")
            .setDescription("убрать пароль из списка")
            .addStringOption(o => o
                .setName("password")
                .setDescription("пароль")
                .setRequired(true))),
        async execute ({client, options, interaction, thisGuild, Embed}) {
            const subcommand = options.getSubcommand();
            const passwords = thisGuild.joinPasswords || []
            const guilds = new Models("Guild");
            if (subcommand === "list") {
                const data = passwords.map(x => `\`${x}\``);

                Embed  
                    .setUser(interaction.user)
                    .setText(data.length === 0 ? "нет пароли, вход открыт" : data.join("\n"))
                    .setTitle("Пароли")
                    .interactionReply(interaction, {ephemeral: true})
            } else if (subcommand === "add") {
                const password = options.getString("password");
                if (!passwords.includes(password)) await guilds.model.updateOne({_id: interaction.guildId}, {$push: {joinPasswords: password}});
                Embed.setUser(interaction.user).setSuccess("Успешно добавлен новый пароль").setTitle("Новый пароль").interactionReply(interaction, {ephemeral: true})
            } else {
                const password = options.getString("password");
                if (password.includes(password)) {
                    const arrWithout = client.util.remove(passwords, {elements: [password], indexes: []});
                    await guilds.model.updateOne({_id: interaction.guildId}, {$set: {joinPasswords: arrWithout}});
                }
                Embed.setUser(interaction.user).setSuccess("Пароль успешно убран!").setTitle("Удаление пароля").interactionReply(interaction, {ephemeral: true})
            }
        }

})