const kissImage = "https://i.imgur.com/Muh7YYP.jpg"

async function spinTheBottle(message, args, {client}) {
  const members = Array.from(message.guild.members)
  if (members.length < 3) return "Not enough players"
  let match = null
  let tries = 0
  while (match === null || match === client.user.id || match === message.author.id) {
    tries++
    if (tries > 5) return "Picking error"
    match = members[Math.floor(Math.random()*members.length)][0]
  }
  return `<@${match}> has been selected as your victim.\n${kissImage}`
}

exports.run = spinTheBottle
