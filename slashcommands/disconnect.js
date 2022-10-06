const Discord = require("discord.js")


module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Make bot leave Voice Channel!"),
    
    async run(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.followUp(`🔊 You need to join a voice channel!`)
        }
        const player = client.poru.players.get(interaction.guild.id)
        if(!player) {
            interaction.followUp("❌ There aren't any player in this server!")
        } else {
            player.destroy()
            interaction.followUp({ content: `✅ Successfully disconnected from <#${voiceChannel.id}>` })
        }
    }
}