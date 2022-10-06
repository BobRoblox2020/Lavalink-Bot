const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: "play",
    aliases: ["p"],
    run: async (client, message, args) => {
        
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!")

if (!args.join(" ")) return message.reply("You need provide song name to play music!").catch(err => console.log(err))

const player = await client.poru.createConnection({
guildId: message.guild.id,
voiceChannel: message.member.voice.channel.id,
textChannel: message.channel.id,
deaf: true,
});
const result = await client.poru.resolve(args.join("  "), 'ytmsearch'); //client.poru.resolve(args.join(" ")); //
if(result.loadType === "SEARCH_RESULT" || result.loadType === "TRACK_LOADED") {
const track = result.tracks.shift();
track.info.requester = message.author;
player.queue.add(track);
let embed1 = new EmbedBuilder()
.setColor(client.config.color)
.setTitle("ADDED TO QUEUE")
.setDescription(`[${track.info.title}](${track.info.uri})`)
message.channel.send({embeds: [embed1]})
if (!player.isPlaying && !player.isPaused) return player.play();
}
if (result.loadType === "PLAYLIST_LOADED") {
for (let x of result.tracks) {
x.info.requester = message.author;
player.queue.add(x);
}
let embed2 = new EmbedBuilder()
.setColor(client.config.color)
.setTitle("ADDED TO QUEUE")
.setDescription(`${result.playlistInfo.name}`)
message.channel.send({embeds: [embed2]})
if (!player.isPlaying && !player.isPaused) return player.play();
}
  }
}