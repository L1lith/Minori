const titleCase = require('./functions/titleCase')
const commands = require("require-directory")(module, 'commands/')

const commandPrefix = "minori"

async function messageListener(client, message) {
  const {content} = message
  const parts = content.split(" ")
  if ((parts[0] || "").toLowerCase() === commandPrefix || parts[0] === "<@"+client.user.id+">") {
    const command = (parts[1] || "").toLowerCase()
    const args = parts.slice(2).filter(str => str.length > 0)
    const fullArgsString = args.join(" ")
    const commandData = [message, args, {fullArgsString, command, parts, content, client}]
    let output
    try {
      if (command.length < 1) {
        output = await commands.mention.run(...commandData)
      } else if (commands.hasOwnProperty(command)) {
        const commandObject = commands[command]
        const helpString = commandObject.help ? `\nUsage: ${titleCase(command)} ` + commandObject.help : ""
        if (typeof commandObject.argCount == 'number') {
          if (args.length < commandObject.argCount) return message.reply("Missing Arguments" + helpString)
          if (args.length > commandObject.argCount) return message.reply("Too many arguments" + helpString)
        }
        if (typeof commandObject.minArgs == 'number') {
          if (args.length < commandObject.minArgs) return message.reply("Missing Arguments" + helpString)
        }
        if (typeof commandObject.maxArgs == "number") {
          if (args.length > commandObject.maxArgs) return message.reply("Too many arguments" + helpString)
        }
        output = await commandObject.run(...commandData)
      } else {
        output = await commands.unknown.run(...commandData)
      }
      if (typeof output == 'string') return message.reply(output)
    } catch(err) {
      if (err instanceof Error) {
        console.log(err)
        message.reply("Error, unable to complete request")
      } else {
        message.reply(err.toString())
      }
    }
  }
}

module.exports = messageListener
