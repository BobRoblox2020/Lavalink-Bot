const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    category: "music",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) {
            return message.reply(`🔊 You need to join a voice channel!`)
        }
        const player = client.poru.players.get(message.guild.id)
        if(!player) {
            message.reply("❌ There aren't any player in this server!")
        } else {
            player.destroy()
            message.reply({ content: `✅ Successfully disconnected from <#${voiceChannel.id}>` })
        }
    }}