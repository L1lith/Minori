const titleCase = require('../functions/titleCase')
const commands = require("require-directory")(module)
const usageDescriptions = {}
let commandListString = []

Object.entries(commands).forEach(([commandName, exports]) => {
  if (["unknown", "mention"].includes(commandName) || exports.hidden === true) return // Reserved Commands
  if (typeof exports.usage == "string" && exports.usage.length > 0) {
    usageDescriptions[commandName] = exports.usage
  } else {
    usageDescriptions[commandName] = null
  }
  commandListString.push(commandName)
})

commandListString = commandListString.map(str => `- ${str}`).sort().join("\n")

function help(message, args){
  if (args.length > 1) throw "Too Many Arguments"
  if (args.length > 0) {
    const command = args[0].toLowerCase()
    if (usageDescriptions.hasOwnProperty(command)) {
      if (usageDescriptions[command] === null) {
        message.reply('My apologies, I do not have any information about that command.')
      } else {
        message.reply(`Usage: \`Minori ${titleCase(command)} ${usageDescriptions[command]}\``)
      }
    } else {
      message.reply('Sorry, I do not recognize that command.')
    }
  } else {
    message.reply('Commands: \`\`\`' + commandListString + '\`\`\`\nTo see more about a specific command try \`Minori Help {Command}\`')
  }
}

exports.run = help
