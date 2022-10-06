module.exports = {
    name: "remove",
    aliases: [""],
    run: async (client, message, args) => {
        let player = client.poru.players.get(message.guild.id)

        if (args[0] == 0) return message.reply(`❌ I can't remove the song that is playing!`);
        if (args[0] > player.queue.length) return message.reply("❌ Can't find the song in queue!");
        if(!Number(args[0])) return message.reply("❌ Please enter a valid number!")

        player.queue.remove(args[0] - 1)
        return message.reply(`✅ Successfully removed song from queue!`)
    }
}