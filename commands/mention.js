function mention(message){
  message.channel.send(`Hello <@${message.author.id}> ❤️\nType 'Minori Help' for a list of commands.`)
}

exports.run = mention
