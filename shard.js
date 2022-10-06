const { ShardingManager } = require('discord.js');
const config = require('./config.json');

let manager = new ShardingManager('./index.js', {
    token: config.token,
    totalShards: 2,
});

manager.on('shardCreate', shard => {
    console.log(`[SHARDS]: Launched shard ${shard.id}`)
});

manager.spawn();