import { registerSlashCommands } from "../register-slash";
import Event from "../typing/Event";

export default new Event({
    name: "ready",
    callback: async (client) => {        
        client.user.setStatus("dnd");
        client.user.setActivity({"type": "STREAMING", "name": "da xz"})
        console.log(`${client.user.tag} - is ready!`);
        registerSlashCommands()
    }
})