function kill(message, args, {client}) {
  if (message.mentions.everyone === true || args[0] === "everyone") return message.reply("Executing Order 66.")
  const target = (Array.from(message.mentions.users)[0] || [])[0]
  if (!target) throw 'You must mention someone to target.'
  if (target === client.user.id) { // Telling Minori to kill itself
    return message.reply("Wow... I can't believe you'd say that. 😭")
  } else if (target === message.author.id) {
    return message.reply("Are you feeling okay?")
  }
  if (args[0]) {
    message.channel.send('Eliminating '+args[0])
  } else {
    message.channel.send('Please include a @target to terminate.')
  }
}

exports.argCount = 1
exports.usage = "{@Mention}"
exports.run = kill
