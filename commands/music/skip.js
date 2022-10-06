module.exports = {
    name: "skip",
    aliases: [""],
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel.id
        if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")
        
        const music = client.poru.players.get(message.guild.id)

        music.stop()
    }
}