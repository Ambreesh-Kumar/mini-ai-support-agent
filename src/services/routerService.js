const faqs = require("../data/faqs");

function routeQuery(message) {
  const lowerMessage = message.toLowerCase();

  for (const keyword of Object.keys(faqs)) {
    if (lowerMessage.includes(keyword)) {
      return {
        type: "RULE",
        answer: faqs[keyword]
      };
    }
  }

  return {
    type: "LLM"
  };
}

module.exports = {
  routeQuery
};