const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: "shuffle",
    aliases: [""],
    category: "filter",
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(`🔊 You need to join a voice channel!`);

        const player = client.poru.players.get(message.guild.id)
        if(!player) {
            message.reply("❌ There aren't any player in this server!")
        } else {
            player.queue.shuffle()
            message.reply({ content: `✅ Successfully shuffled the track!` })
        }
    }}