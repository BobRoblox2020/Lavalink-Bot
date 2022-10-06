module.exports = {
    name: "volume",
    aliases: [""],
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(`🔊 You need to join a voice channel!`);
    

        const music = client.poru.players.get(message.guild.id)
        if(!music) return message.channel.send("❌ I don't play any music right now!")

        if(!Number(args[0])) return message.reply(`❗Please provide valid number!`)
        if(!args[0]) return message.reply(`❗Please provide a number to change volume!`)

        music.setVolume(args[0])
        message.reply(`Successfully set volume to \`${args[0]}%\``)
    }
}