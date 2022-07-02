import { SlashCommandBuilder } from "@discordjs/builders";
import { PermissionFlagsBits } from "discord-api-types/v10";
import Models from "../../database/db";
import SlashCommand from "../../typing/SlashCommand";

export default new SlashCommand ({
    uniqueName: 'set-verify-role',
    data: new SlashCommandBuilder()
                
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                .setName("set-verify-role")
                .addRoleOption(o => o
                                    .setName("role")
                                    .setDescription("verify role")
                                    .setRequired(true))
                .setDescription("Role will be given after member's correct password entering"),
    async execute({client, interaction, options, Embed}) {
        const role = options.getRole("role");

        const guildModel = new Models('Guild');

        await guildModel.model.updateOne({_id: interaction.guildId}, {$set: {verifyRole: role.id}});
        Embed
            .setSuccess("Роль успешно установлена!")
            .setUser(interaction.user)
            .interactionReply(interaction, {ephemeral: true})
    },
})