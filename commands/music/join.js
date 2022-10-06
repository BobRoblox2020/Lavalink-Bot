const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: "join",
    aliases: [""],
    category: "music",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) {
            return message.reply(`🔊 You need to join a voice channel!`)
        }
        const player = await client.poru.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            deaf: true,
          })
        message.reply({ content: `✅ Successfully joined <#${voiceChannel.id}>` })
    }}