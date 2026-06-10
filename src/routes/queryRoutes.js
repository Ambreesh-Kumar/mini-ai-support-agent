const express = require("express");
const router = express.Router();

const { askLLM } = require("../services/llmService");
const { routeQuery } = require("../services/routerService");
const {
  incrementTotalQueries,
  incrementRuleBased,
  incrementLlmCalls,
} = require("../services/statsService");
const { findCachedResponse, addToCache } = require("../services/cacheService");

const { incrementCacheHits } = require("../services/statsService");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "message is required",
      });
    }
    incrementTotalQueries();

    const decision = routeQuery(message);

    const cachedResponse = findCachedResponse(message);

    if (cachedResponse) {
      incrementCacheHits();

      return res.json({
        source: "cache",
        similarity: cachedResponse.similarity,
        answer: cachedResponse.answer,
      });
    }

    if (decision.type === "RULE") {
      incrementRuleBased();
      return res.json({
        source: "rules",
        answer: decision.answer,
      });
    }

    incrementLlmCalls();

    const answer = await askLLM(message);

    addToCache(message, answer);

    return res.json({
      source: "llm",
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
