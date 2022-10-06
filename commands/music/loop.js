module.exports = {
    name: "loop",
    aliases: [],
    description: "Loop queue's song!",
    category: "music",
    usage: "loop [song] [queue] [off]",
    cooldown: 5,
    run: async (client, message, args) => {
      if(!message.member.voice.channel) {
        message.channel.send(`🔊 You need to join a voice channel!`)
      } else {
        let player = client.poru.players.get(message.guild.id)
        if(!player) return message.channel.send("❌ You can't loop when queue is empty!")
        if (player.loop === 0) {
           player.TrackRepeat();
           message.reply("✅ Successfully enabled loop song!")
         } else if (player.loop === 1) {
           player.QueueRepeat();
           message.reply("✅ Successfully enabled loop queue!")
         } else if (player.loop === 2) {
           player.DisableRepeat();
           message.reply("✅ Successfully disabled loop!")
         }
      }
     }
  }