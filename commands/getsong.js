const request = require('request')
const {OAuthToken, PlaylistID} = require('../config').spotify
const {RichEmbed} = require('discord.js')

let totalTracks = null
let networkError = false

const requestFormat = {headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer "+OAuthToken
}}

request('https://api.spotify.com/v1/playlists/' + PlaylistID, requestFormat, (err, response, body) => {
  if (err || response.statusCode !== 200) return networkError = true
  totalTracks = JSON.parse(body).tracks.total
})

async function getSong(message) {
  if (networkError) return message.reply("Sorry, this command is unavailable due to a network error.")
  if (totalTracks === null) return message.reply("Sorry, this command is temporarily unavailable, please try again in a minute or two.")
  const songNumber = Math.floor(Math.random() * (totalTracks - 1))
  request(`https://api.spotify.com/v1/playlists/${PlaylistID}/tracks?offset=${songNumber}&limit=1`, requestFormat, (err, response, body) => {
    if (err || response.statusCode !== 200) return message.reply("Network Error.")
    const songResponse = JSON.parse(body)
    const songData = songResponse.items[0]
    let {name, artists} = songData.track
    artists = artists.map(artist => artist.name)
    const fields = [
      [artists.length > 1 ? "Artists" : "Artist", artists.join(", ")]
    ].map(([name, value]) => ({name, value}))
    const embed = new RichEmbed({fields, url: songData.track.external_urls.spotify})
    embed.setTitle(name)
    message.channel.send(embed)
  })
}

exports.run = getSong
