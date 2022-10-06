const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const fetch = require('node-fetch')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop the song!"),
    
    async run(interaction, client) {
        const voiceChannel = interaction.member.voice.channel.id
        if(!voiceChannel) return interaction.followUp("🔊 Please join a Voice Channel to continue!")

        const music = client.poru.players.get(interaction.guild.id)

        if(!music) return interaction.followUp("There aren't any music is playing!")

        music.destroy()
        const embed = new Discord.EmbedBuilder()
        .setDescription(`✅ Successfully stopped all the queue!`)
        interaction.followUp({ embeds: [embed] })
    }
}