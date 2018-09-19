const weightedRandom = require('weighted-random')

class ResponseRandomizer {
  constructor(responses, defaultWeight=1) {
    this.responses = []
    this.weights = []
    responses.forEach(response => {
      if (typeof response == 'string') {
        this.responses.push(response)
        this.weights.push(defaultWeight)
      } else if (typeof response == 'object' && response !== null) {
        if (Array.isArray(response)) {
          if (typeof response[0] != 'string' || response[0].length < 1) throw new Error("Must supply response message string as first index")
          this.responses.push(response[0])
          this.weights.push(isFinite(response[1]) ? response[1] : defaultWeight)
        } else {
          if (typeof response.message != 'string' || response.message.length < 1) throw new Error("Response must have message string property")
          this.responses.push(response.message)
          this.weights.push(isFinite(response.weight) ? response.weight : defaultWeight)
        }
      }
    })
    this.generate = this.generate.bind(this)
  }
  generate() {
    return this.responses[weightedRandom(this.weights)]
  }
}

module.exports = ResponseRandomizer
