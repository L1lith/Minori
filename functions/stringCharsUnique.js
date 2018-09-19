function stringCharsUnique(str) {
  str = str.toString()
  return str === [...new Set(str)].join('')
}

module.exports = stringCharsUnique
