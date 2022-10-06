module.exports = {
    name: "deepbass",
    aliases: [""],
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel.id
        if(!voiceChannel) return message.channel.send("🔊 Please join a Voice Channel to continue!")

        const player = client.poru.players.get(message.guild.id)
        if(!player) {
            message.reply("❌ There aren't any player in this server!")
        }
if (player.filters.deepbass) {
    player.filters.deepbass = false

    player.filters.setEqualizer(Array(13).fill(0).map((n, i) => ({
        band: i,
        gain: 0
    })))
    return message.reply(`✅ Successfully disabled deepbass`)
} else {



    player.filters.setEqualizer([{
        band: 0,
        gain: 0.6
    },
    {
        band: 1,
        gain: 0.67
    },
    {
        band: 2,
        gain: 0.67
    },
    {
        band: 3,
        gain: 0
    },
    {
        band: 4,
        gain: -0.5
    },
    {
        band: 5,
        gain: 0.15
    },
    {
        band: 6,
        gain: -0.45
    },
    {
        band: 7,
        gain: 0.23
    },
    {
        band: 8,
        gain: 0.35
    },
    {
        band: 9,
        gain: 0.45
    },
    {
        band: 10,
        gain: 0.55
    },
    {
        band: 11,
        gain: 0.6
    },
    {
        band: 12,
        gain: 0.55
    },
    {
        band: 13,
        gain: 0
    }
    ]

    )
    player.filters.deepbass = true;
    return  message.reply(`✅ Successfully enabled deepbass!`)




        }
    }
}