const express = require("express");
const routes = express.Router();
const rouletteController = require("../controllers/roulette.controller");
const betsController = require("../controllers/bets.controller")

module.exports = function () {
  routes.post("/closeRouletteById", rouletteController.closeRouletteById);
  routes.post("/addNewBet", betsController.addNewBet);
  routes.post("/activeRouletteById", rouletteController.activeRouletteById);
  routes.post("/addNewRoulette", rouletteController.addNewRoulette);
  routes.get("/findAllRoulettes", rouletteController.findAllRoulettes);

  return routes;
};
