module.exports = async (client, message, newState, oldState) => {
    if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
        try {
            await newState.guild.me.voice.setSuppressed(false);
        } catch (e) {
            console.log(e)
        }
    }
}