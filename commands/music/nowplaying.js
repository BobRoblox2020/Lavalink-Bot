const {EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");
const { formatDuration } = require('../../handlers/function')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "music",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel.id
        if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")

        const music = client.poru.players.get(message.guild.id)

        if(!music) return message.channel.send(`I don't play any music right now!`)

        const button = new ButtonBuilder()
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("skip")
        const button2 = new ButtonBuilder()
        .setEmoji("🛑")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("stop")
        const button3 = new ButtonBuilder()
        .setEmoji("⏹")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("pause")
        const button4 = new ButtonBuilder()
        .setEmoji("⏸")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("resume")
        
        const row = new ActionRowBuilder({ components: [button, button2, button3, button4] })
         
        const createBar = (total, current, size = 10, line = '<:blackline:947020422577262622>', slider = '<:greenline:1016174603250434111>') => {
            if (!total) throw new Error('Total value is either not provided or invalid');
            if (!current && current !== 0) throw new Error('Current value is either not provided or invalid');
            if (isNaN(total)) throw new Error('Total value is not an integer');
            if (isNaN(current)) throw new Error('Current value is not an integer');
            if (isNaN(size)) throw new Error('Size is not an integer');
            if (current > total) {
                const bar = slider.repeat(size + 2);
                const percentage = (current / total) * 100;
                return [bar, percentage];
            } else {
                const percentage = current / total;
                const progress = Math.round((size * percentage));
                const emptyProgress = size - progress;
                const progressText = slider.repeat(progress);
                const emptyProgressText = line.repeat(emptyProgress);
                const bar = progressText + emptyProgressText;
                const calculated = percentage * 100;
                return [bar, calculated];
            }
          };
         
        const embed = new EmbedBuilder()
        .setTitle("CURRENTLY PLAYING")
        .setDescription(`[${music.currentTrack.info.title}](${music.currentTrack.info.uri})`)
        .addFields([
            {
                name: "Duration",
                value: `[\`${formatDuration(music.position)}\`  ${createBar(music.currentTrack.info.length, music.position)[0]}  \`${formatDuration(music.currentTrack.info.length)}\`]`,
            },
            {
                name: "Requester",
                value: `${music.currentTrack.info.requester}`,
                inline: true,
            },
            {
                name: "Artist",
                value: `\`${music.currentTrack.info.author}\``,
                inline: true
            }
        ])
        .setThumbnail(`${music.currentTrack.info.image}`)
        .setColor(client.config.color)
        .setThumbnail(`${music.currentTrack.info.image}`)
        .setColor(client.config.color)
        const msg = await message.channel.send({ embeds: [embed], components: [row] })
        let filter = i => i.user.id == message.author.id
        const collector = msg.channel.createMessageComponentCollector({
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
                if(btn.customId == "pause"){
                    const queue = client.poru.players.get(message.guild.id)
                    if(!queue) {
                        btn.reply({ content: "❌ There aren't any song in queue!", ephemeral: true })
                    } else {
                    queue.pause(true)
                    btn.reply({ content: '✅ Successfully Paused The Song The Song', ephemeral: true })
                    }
                }
                if(btn.customId == "resume"){
                    const queue = client.poru.players.get(message.guild.id)
                    if(!queue) {
                        btn.reply({ content: "❌ There aren't any song in queue!", ephemeral: true })
                    } else {
                    queue.pause(false)
                    btn.reply({ content: '✅ Successfully Resume The Song The Song', ephemeral: true })
                    }
                }
            }
        })
    }
}