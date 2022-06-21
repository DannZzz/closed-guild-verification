import { Client } from "client-discord"
import { TOKEN } from "./config"
import handler from "./handler"
import { registerSlashCommands } from "./register-slash"

const client = new Client ({token: TOKEN, intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"], colors: {main: "DARK_GOLD", error: "DARK_RED", success: "DARK_GREEN"}})

handler(client).then(() => {
    registerSlashCommands()
})

client.on("error", (err) => console.log("Discord Error\n", err))
process.on("unhandledRejection", (er) => console.log("Unhandled Rejection\n", er))

