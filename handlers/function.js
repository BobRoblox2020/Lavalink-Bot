const { Interaction, Collection } = require('discord.js')

/**
 *
 * @param {Interaction} interaction
 * @param {Object} cmd
 */

function formatDuration(millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      else
        return (
          (h < 10 ? "0" : "") +
          h +
          ":" +
          (m < 10 ? "0" : "") +
          m +
          ":" +
          (s < 10 ? "0" : "") +
          s
        );
    } catch (e) {
      console.log(e);
    }
  }
  function bar(player) {
    let size = 10;
    let line = "<:blackline:947020422577262622>";
    let slider = "<:cyanline:946748093389479946>";
  
    if (!player.queue.current) return `${slider}${line.repeat(size - 1)}]`;
    let current =
      player.queue.current.duration !== 0
        ? player.position
        : player.queue.current.duration;
    let total = player.queue.current.duration;
    let bar =
      current > total
        ? [line.repeat((size / 2) * 2), (current / total) * 100]
        : [
            line
              .repeat(Math.round((size / 2) * (current / total)))
              .replace(/.$/, slider) +
              line.repeat(size - Math.round(size * (current / total)) + 1),
            current / total,
          ];
  
    if (!String(bar).includes(slider)) return `${slider}${line.repeat(size - 1)}`;
    return `${bar[0]}`;
  }

module.exports = {
    formatDuration, bar
}