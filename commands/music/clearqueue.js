const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    category: "music",
    run: async (client, message, args) => {
      const voiceChannel = message.member.voice.channel.id
      if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")
      
        const player = client.poru.players.get(message.guild.id)
    
        if(!player.queue.length){
          message.reply("The queue is empty")
        }
        
        let queueLength = player.queue.length
    
        player.queue.clear();
        
        const embed = new EmbedBuilder()
        .setTitle("Successfully cleared the queue!")
        .setDescription(`\`${queueLength}\` has been removed from queue.`)
        .setColor(client.config.color)
        message.reply({ embeds: [embed] })
    }}