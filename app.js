const Discord = require("discord.js")
const messageListener = require('./messageListener')
const config = require('./config')

const token = config.token

const client = new Discord.Client()

client.on('ready', () => {
  console.log('I am awake!')
  client.user.setGame('Try "Minori Help"')
})

client.on('message', messageListener.bind(null, client))

client.login(token)
