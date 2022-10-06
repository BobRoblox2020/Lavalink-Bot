const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const fetch = require('node-fetch')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the song!"),
    
    async run(interaction, client) {
        const voiceChannel = interaction.member.voice.channel.id
        if(!voiceChannel) return interaction.followUp("🔊 Please join a Voice Channel to continue!")
        
        const music = client.poru.players.get(interaction.guild.id)

        music.stop()
        const embed = new Discord.EmbedBuilder()
        .setDescription(`✅ Successfully skipped the the song!`)
        interaction.followUp({ embeds: [embed] })
    }
}