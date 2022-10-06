module.exports = {
    name: "resume",
    run: async (client, message, args) => {
      const voiceChannel = message.member.voice.channel.id
      if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")
      
      let player = client.poru.players.get(message.guild.id)
  
    player.pause(false)
    message.channel.send(`✅ Successfully resumed the song!`)
    }
  }