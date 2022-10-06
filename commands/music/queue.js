
const {EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");
const { formatDuration } = require('../../handlers/function');
module.exports = {
    name: "queue",
    aliases: [],
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel.id
        if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")

        const player = client.poru.players.get(message.guild.id)
        
        const button = new ButtonBuilder()
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("skip")
        const button2 = new ButtonBuilder()
        .setEmoji("🛑")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("stop")
        
        const row = new ActionRowBuilder({ components: [button, button2] })

        const queue = player.queue.length > 9 ? player.queue.slice(0, 10) : player.queue;
        const embed = new EmbedBuilder()
       .setColor(client.config.color)
       .setTitle('CURRENTLY PLAYING')
       .setThumbnail(`${player.currentTrack.info.image}`)
       .setDescription(`[${player.currentTrack.info.title}](${player.currentTrack.info.uri})`)
       .setFooter({text: `Queue: ${player.queue.length}`});
       
   if (queue.length) embed.addFields({name: 'UP NEXT', value: queue.map((track, index) => `**${index + 1})** \`${track.info.title}\``).join('\n')});
   if (!player) return message.channel.send("There aren't any music in queue!")
           const msg = await message.channel.send({ embeds: [embed], components: [row] })
        let filter = i => i.user.id == message.author.id
        const collector = msg.createMessageComponentCollector({
          filter,
          time: 60000
        })
        collector.on("collect", async (btn) => {
            if(btn.isButton()){
                if(btn.customId == "skip"){
                    const queue = client.poru.players.get(message.guild.id)
                    if(!queue) return btn.reply({ content: "There aren't any song in queue!", ephemeral: true })
                    else {
                        queue.stop()
                        btn.reply({ content: '✅ Successfully Skip The Song', ephemeral: true })
                    }
                }
                if(btn.customId == "stop"){
                    const queue = client.poru.players.get(message.guild.id)
                    if(!queue) {
                        btn.reply({ content: "❌ There aren't any song in queue!", ephemeral: true })
                    } else {
                        queue.destroy()
                    }
                }
            }
        })
        collector.on('end', async (end) => {
            msg.edit({ embeds: [embed], components: [rows] })
        })
    }
}
