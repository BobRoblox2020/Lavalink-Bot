const Discord = require("discord.js")
const fetch = require('node-fetch')


module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song!!")
    .addStringOption((option) => 
        option
        .setName("song")
        .setDescription("Song name to play")
        .setRequired(true)
    ),
    
    async run(interaction, client) {
        const song = interaction.options.getString("song")
        const voice = interaction.member.voice.channel;
        if (!voice) return interaction.followUp("You must Join a voice channel before using this command!", { ephemeral: false })
        
        const player = await client.poru.createConnection({
        guildId: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        deaf: true,
        });
        const result = await client.poru.resolve(song, 'ytmsearch'); //client.poru.resolve(args.join(" ")); //
        if(result.loadType === "SEARCH_RESULT" || result.loadType === "TRACK_LOADED") {
        const track = result.tracks.shift();
        track.info.requester = interaction.user;
        player.queue.add(track);
        let embed1 = new Discord.EmbedBuilder()
        .setColor(client.config.color)
        .setTitle("ADDED TO QUEUE")
        .setDescription(`[${track.info.title}](${track.info.uri})`)
        interaction.followUp({embeds: [embed1]})
        if (!player.isPlaying && !player.isPaused) return player.play();
        }
        if (result.loadType === "PLAYLIST_LOADED") {
        for (let x of result.tracks) {
        x.info.requester = interaction.user;
        player.queue.add(x);
        }
        let embed2 = new Discord.EmbedBuilder()
        .setColor(client.config.color)
        .setTitle("ADDED TO QUEUE")
        .setDescription(`${result.playlistInfo.name}`)
        interaction.followUp({embeds: [embed2]})
        if (!player.isPlaying && !player.isPaused) return player.play();
        }
    }
}