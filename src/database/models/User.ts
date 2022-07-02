import mongoose from "mongoose";
import { Currency } from "../../docs/currency/Currency";

type CooldownTypes = "daily"

export interface User {
    /**
     * User's discord id
     */
    _id: string;
    /**
     * Primary money
     * @type {keyof Currency}
     */
    primary?: number;
    /**
     * Secondary money
     * @type {keyof Currency}
     */
    secondary?: number;
    /**
     * ? Is user blocked by admins
     */
    isBlocked?: boolean;
    /**
     * Global cooldowns
     */
    cooldowns?: {[k in CooldownTypes]?: Date};
    /**
     * Custom playlist
     */
    playlist?: Array<string>;
}

export const User = mongoose.model("user", new mongoose.Schema<User>({
    _id: String,
    primary: { type: Number, default: 0 },
    secondary: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    cooldowns: { type: Object, default: {} },
    playlist: { type: Array as any, default: [] },
}))