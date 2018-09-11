const kissImage = "https://i.imgur.com/Muh7YYP.jpg"

async function spinTheBottle(message) {
  const members = Array.from(message.guild.members)
  const match = members[Math.floor(Math.random()*members.length)][0]
  message.reply(`<@${match}> has been selected as your victim.\n${kissImage}`)
}

exports.run = spinTheBottle
