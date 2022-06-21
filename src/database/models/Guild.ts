import { ChannelResolvable } from "discord.js";
import mongoose from "mongoose";
import { DEFAULT_PREFIX } from "../../config";
type ChannelId = string;
type RoleId = string;

export interface Guild {
    /**
     * Guild's id
     */
    _id: string;
    /**
     * Command permissions
     */
    commands?: {[k: string]: {disabledChannels: ChannelId[]}}
    /**
     * Server's prefix
     */
    prefix?: string
    /**
     * staff
     */
    staff?: RoleId[];
    /**
     * Some passwords
     */
    joinPasswords?: string[];
    /**
     * Role would be give if password is correct
     */
    verifyRole?: RoleId;
}

export const Guild = mongoose.model("guild", new mongoose.Schema<Guild>({
    _id: String,
    prefix: { type: String, default: DEFAULT_PREFIX },
    verifyRole: { type: String, default: null },
    commands: { type: Object, default: {} },
    staff: { type: Array as any, default: [] },
    joinPasswords: { type: Array as any, default: [] },
}))