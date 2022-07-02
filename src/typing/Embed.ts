import { Interaction, InteractionReplyOptions, MessageEmbed } from "discord.js";

type sendType = "followUp" | "reply" ;

class EmbedInteraction extends MessageEmbed {
    constructor(private interaction: Interaction) {
        super();
    }

    public setSuccess (text: string) {
        this.setDescription(text).setColor("GREEN");
        return this;
    }

    public setError (text: string) {
        this.setDescription(text).setColor("RED");
        return this;
    }

    public setText (text: string) {
        this.setDescription(text);
        return this;
    }

    public send (type: sendType = "reply", options?: InteractionReplyOptions) {
        if (!options) {
            return this.interaction[type]({embeds: [this]});
        } else {
            options.embeds = [this];
            return this.interaction[type](options);
        }
    }
    
}

export const Embed = function(interaction: Interaction) {
    return new EmbedInteraction(interaction);
}