export const TOKEN = processOr("TOKEN", "OTU3NjA5MDM1NTM5MDMwMDY2.G4HxuF.m45FcC2T6Q_SwKbUFtGJ7ysKzsZooPbmIrQ4jA");
export const MONGO = processOr("MONGO", "mongodb+srv://DannTest:099075020@botdiscord.hkvvx.mongodb.net/RoyaleBot");
export const CLIENT_ID = processOr("CLIENT_ID", "983361220885225472");
export const DEV_ID = "382906068319076372";
export const PRIVATE_SERVER_DEV = processOr("PRIVATE_SERVER_DEV", "983420110729535548");
export const DEFAULT_PREFIX = processOr("DEFAULT_PREFIX", "!");
export const PAGINATION_EMOJIS = ["⏪", "◀", "▶", "⏩"];


function processOr(key: string, defaultValue: any): string {
    return process.env[key] || defaultValue;
}