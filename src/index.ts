import { Client } from "client-discord"
import { TOKEN } from "./config"
import handler from "./handler"
import { registerSlashCommands } from "./register-slash"
import { Player } from "discord-player";

const client = new Client ({token: TOKEN, intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"], colors: {main: "DARK_GOLD", error: "DARK_RED", success: "DARK_GREEN"}})
client.player = new Player(client);

handler(client)

client.player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now Playing **${track.title}**!`));
client.player.on("error", (queue, error) => console.log(error));
client.player.on("connectionError", (queue, error) => console.log(error));

client.on("error", (err) => console.log("Discord Error\n", err))
process.on("unhandledRejection", (er) => console.log("Unhandled Rejection\n", er))

