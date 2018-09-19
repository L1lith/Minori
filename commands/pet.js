const ResponseRandomizer = require("../functions/ResponseRandomizer")
const {generate} = new ResponseRandomizer(["*Purrrrrr*", "*cheep cheep*"])

exports.run = generate
