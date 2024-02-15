const {PagerError} = require("@jworkman-fs/asl/src/Exception/pager");

// Not included in the PagerError file part, so adding it here.
class PagerLimitExceededError extends PagerError {
    constructor(message) {
      super(400, message)
      this.name = "PagerLimitExceededError"
    }
}

module.exports = { PagerLimitExceededError }