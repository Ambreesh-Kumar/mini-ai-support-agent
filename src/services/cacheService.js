const stringSimilarity = require("string-similarity");

const cache = [];

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

function findCachedResponse(question) {
  if (!cache.length) return null;

  const normalizedQuestion = normalize(question);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of cache) {
    const score = stringSimilarity.compareTwoStrings(
      normalizedQuestion,
      normalize(item.question),
    );

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (highestScore >= Number(process.env.CACHE_SIMILARITY_THRESHOLD || 0.75)) {
    return {
      ...bestMatch,
      similarity: highestScore,
    };
  }

  return null;
}

function addToCache(question, answer) {
  cache.push({
    question,
    answer,
    createdAt: new Date().toISOString(),
  });
}

function getCacheSize() {
  return cache.length;
}

module.exports = {
  findCachedResponse,
  addToCache,
  getCacheSize,
};
