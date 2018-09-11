const DateDiff = require('date-diff')
//const birthday = new Date('2017-09-24T10:10:08Z')
const birthday = new Date('2017-09-11T10:10:08Z')
const timer = require("../functions/timer")

async function age(message){
  var nowUTC = new Date(new Date().getTime());
  let dif = new DateDiff(nowUTC,birthday)
  const years = Math.floor(dif.years())
  let months = dif.months() % 12
  let days = Math.floor((months % 1) * 30)
  months = Math.floor(months)
  if (months === 0 && days === 0) {
    const response = await message.reply(`I am ${years} years old today!!`)
    response.react('🎂')
    await timer(10)
    response.react('😊')
    return
  }
  const yearsString = years > 0 ? years + " years" : ""
  const monthsString = months > 0 ? months + " months" : ""
  const daysString = days > 0 ? days+" days" : ""
  let ageString = [yearsString, monthsString, daysString].filter(string => string.length > 0)
  if (ageString.length > 1) ageString[ageString.length - 1] = "and "+ageString[ageString.length - 1]
  ageString = ageString.join(', ')
  message.reply(`I am ${ageString} old.`);
}

exports.maxArgs = 0
exports.run = age
