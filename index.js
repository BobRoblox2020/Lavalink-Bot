const discord = require("discord.js");
const { GatewayIntentBits, Partials } = require("discord.js");
const { Poru } = require("poru");

const client = new discord.Client({
intents: [
GatewayIntentBits.Guilds, 
GatewayIntentBits.GuildMessages, 
GatewayIntentBits.GuildVoiceStates, 
GatewayIntentBits.GuildMessageReactions, 
GatewayIntentBits.MessageContent
], 
partials: [
Partials.Message, 
Partials.Channel, 
Partials.Reaction
],
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.cooldowns = new discord.Collection();
client.slashcommands = new discord.Collection();
client.config = require('./config.json');

["Handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//error decator
process.on("unhandledRejection", (reason, promise) => {
  try {
      console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
  } catch {
      console.error(reason);
  }
});

//Lavalink
const node = [{
    host: 'your_lavalink',
    password: 'lavalink_pass',
    port: 0000,  //change to your lavalink port
    secure: false, //secure: true,
    name: "lavalink1"
}];
client.nodes = node
client.poru = new Poru(client, node,{
    deezer: {
        playlistLimit: 5
    }, 
    spotify:{ 
    clientID: "Your_Spotify_Id", 
    clientSecret: "Your_Spotify_Secret" 
    },
    apple:{
    playlistLimit:5
    }
    })
const music = client.poru;
//event
music.on('nodeConnect', (node) => {
console.log(`Connected to ${node.name}!`)
})
music.on('nodeClose', (node) => {
    node.connect();
})
music.on('nodeError', (node, error) => {
console.log(`Node ${node.name} got an error: ${error}`)
})
music.on('queueEnd', (player) => {
let emved = new discord.EmbedBuilder()
.setTitle("QUEUE ENDED")
.setColor(client.config.color)
.setDescription(`Share [${client.user.username}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) To Your Friends If You Enjoying Music With Bot!`)
const channel = client.channels.cache.get(player.textChannel);
channel.send({embeds: [emved]})
player.destroy()
})

music.on('trackStart', (player, track) => {
let embed = new discord.EmbedBuilder()
.setTitle("NOW PLAYING")
.setColor(client.config.color)
.setDescription(`[${track.info.title}](${track.info.uri}) [${track.info.requester}]`)
const channel = client.channels.cache.get(player.textChannel);
channel.send({embeds: [embed]})
});

client.login(client.config.token)