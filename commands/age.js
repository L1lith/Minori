const DateDiff = require('date-diff')
const birthday = new Date('2017-09-24T10:10:08Z')
const timer = require("../functions/timer")
const {ReactionEmoji} = require('discord.js')
const stringCharsUnique = require('../functions/stringCharsUnique')

const numberEmojis = "0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣"

async function age(message, args, client){
  var nowUTC = new Date(new Date().getTime());
  let dif = new DateDiff(nowUTC,birthday)
  const years = Math.floor(dif.years())
  let months = dif.months() % 12
  let days = Math.floor((months % 1) * 30)
  months = Math.floor(months)
  if (months === 0 && days === 0) {
    const response = await message.reply(`I am ${years} years old today!!`)
    await response.react('🎂')
    await response.react('😊')
    if (stringCharsUnique(years)) {
      const ageEmojis = years.toString().split('').map(num => parseInt(num)).map(number => numberEmojis.slice(number * 2, (number + 1) * 2))
      for (let i = 0; i < ageEmojis.length; i++) {
        await response.react(ageEmojis[i])
      }
    }
    return
  }
  const yearsString = years > 0 ? years + " years" : ""
  const monthsString = months > 0 ? months + " months" : ""
  const daysString = days > 0 ? days+" days" : ""
  let ageString = [yearsString, monthsString, daysString].filter(string => string.length > 0)
  if (ageString.length > 1) ageString[ageString.length - 1] = "and "+ageString[ageString.length - 1]
  ageString = ageString.join(', ')
  return `I am ${ageString} old.`
}

exports.run = age
