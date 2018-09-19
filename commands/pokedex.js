const Pokedex = require('pokedex-promise-v2')
const titleCase = require('../functions/titleCase')
const {RichEmbed} = require('discord.js')
const dex = new Pokedex()

async function pokedex(message, args){
  if (args.length < 1) throw "You have to tell me who to look up!!!"
  message.reply('Looking up '+titleCase(args[0]))
  let pokemon
  try {
    pokemon = await dex.getPokemonByName(encodeURIComponent(args[0].toLowerCase()))
  } catch(error) {
    if (error.statusCode && error.statusCode == 404) {
      message.channel.send('That Pokemon is not even real. b-baka')
    } else {
      message.channel.send('Pokedex Error! Please change the batteries.')
    }
    return
  }

  let abilities = pokemon.abilities.sort((a, b) => a.slot - b.slot)
  abilities = abilities.map(({ability}) => titleCase(ability.name.split('-').join(" ")))
  const types = pokemon.types.map(typeObject=>{return titleCase(typeObject.type.name)})
  const images = Object.entries(pokemon.sprites).filter(entry=>{return entry[1] && !entry[0].includes('back')})
  const image = images[Math.floor(Math.random() * images.length)][1]
  const fields = [
    ['ID', pokemon.id],
    [types.length > 1 ? "Types" : "Type", types.join(', ')],
    [abilities.length > 1 ? "Abilities" : "Ability", abilities.join(", ")],
    ["Weight", pokemon.weight],
    ["Height", pokemon.height]
  ].map(([name, value]) => ({name, value}))
  const embed = new RichEmbed({title: titleCase(pokemon.name), fields})
  embed.setImage(image)
  embed.setURL('https://www.pokemon.com/us/pokedex/'+pokemon.name)
  message.channel.send(embed)
}

exports.maxArgs = 1
exports.usage = "{Pokemon}"
exports.run = pokedex
