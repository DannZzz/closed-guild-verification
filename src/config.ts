export const TOKEN = processOr("TOKEN", "ODcwMjQxNDEzODgxNzkwNTE0.GZjqw3.PJ0_iFOW4BU65B1qZiTk8tRNJLu1-y170ZS4A4");
export const MONGO = processOr("MONGO", "mongodb+srv://DannTest:099075020@botdiscord.hkvvx.mongodb.net/passwordmanager");
export const CLIENT_ID = processOr("CLIENT_ID", "870241413881790514");
export const DEV_ID = "382906068319076372";
export const PRIVATE_SERVER_DEV = processOr("PRIVATE_SERVER_DEV", "839462072970641419");
export const DEFAULT_PREFIX = processOr("DEFAULT_PREFIX", "!");
export const PAGINATION_EMOJIS = ["⏪", "◀", "▶", "⏩"];


function processOr(key: string, defaultValue: any): string {
    return process.env[key] || defaultValue;
}