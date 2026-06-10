const { getCacheSize } = require("./cacheService");

const startTime = Date.now();

const stats = {
  totalQueries: 0,
  ruleBased: 0,
  llmCalls: 0,
  cacheHits: 0,
};

function incrementTotalQueries() {
  stats.totalQueries++;
}

function incrementRuleBased() {
  stats.ruleBased++;
}

function incrementLlmCalls() {
  stats.llmCalls++;
}

function incrementCacheHits() {
  stats.cacheHits++;
}

function getStats() {
  return {
    ...stats,
    cacheSize: getCacheSize(),
    cacheHitRate:
      stats.totalQueries === 0
        ? "0%"
        : `${((stats.cacheHits / stats.totalQueries) * 100).toFixed(2)}%`,
    uptimeSeconds: Math.floor(
      (Date.now() - startTime) / 1000
    ),
  };
}

module.exports = {
  incrementTotalQueries,
  incrementRuleBased,
  incrementLlmCalls,
  incrementCacheHits,
  getStats,
};