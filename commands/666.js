const ResponseRandomizer = require("../functions/ResponseRandomizer")
const {generate} = new ResponseRandomizer([["Tenderizing unborn children and screeching like a chimpanzee...", 0.5], "Revoking Seabear Circle"])

exports.run = generate
