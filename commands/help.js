const titleCase = require('../functions/titleCase')
const commands = require("require-directory")(module)
const helpDescriptions = {}
let commandListString = []

Object.entries(commands).forEach(([commandName, exports]) => {
  if (["unknown", "mention"].includes(commandName)) return // Reserved Commands
  if (typeof exports.help == "string" && exports.help.length > 0) {
    helpDescriptions[commandName] = exports.help
  } else {
    helpDescriptions[commandName] = null
  }
  commandListString.push(commandName)
})

commandListString = titleCase(commandListString.sort().join(", "))

function help(message, args){
  if (args.length > 1) throw "Too Many Arguments"
  if (args.length > 0) {
    const command = args[0].toLowerCase()
    if (helpDescriptions.hasOwnProperty(command)) {
      if (helpDescriptions[command] === null) {
        message.reply('My apologies, I do not have any information about that command.')
      } else {
        message.reply(`Usage: Minori ${titleCase(command)} ${helpDescriptions[command]}`)
      }
    } else {
      message.reply('Sorry, I do not recognize that command.')
    }
  } else {
    message.reply('Commands: ' + commandListString + '\nTo See More about a specific command try "Minori Help {Command}"')
  }
}

exports.run = help
