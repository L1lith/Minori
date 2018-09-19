const ResponseRandomizer = require("../functions/ResponseRandomizer")
const {generate} = new ResponseRandomizer([[
  "Tenderizing unborn children and screeching like a chimpanzee...", 0.5],
  "Revoking seabear circle",
  "Playing record backwards",
  "Drawing pentagram"
])

exports.run = generate
exports.hidden = true
