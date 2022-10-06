const Discord = require("discord.js")


module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("join")
    .setDescription("Make bot join Voice Channel!"),
    
    async run(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.followUp(`🔊 You need to join a voice channel!`)
        }
        const player = await client.poru.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            deaf: true,
          })
        interaction.followUp({ content: `✅ Successfully joined <#${voiceChannel.id}>` })
    }
}