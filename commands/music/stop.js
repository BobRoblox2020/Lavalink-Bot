const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "stop",
    aliases: [""],
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel.id
        if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")

        const music = client.poru.players.get(message.guild.id)

        if(!music) return message.channel.send("There aren't any music is playing!")

        music.destroy()
        const embed = new EmbedBuilder()
        .setDescription(`✅ Successfully stopped all the queue!`)
        message.channel.send({ embeds: [embed] })
    }
}