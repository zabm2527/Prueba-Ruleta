const Bet = require("../models/Bets");
const rouletteController = require("../controllers/roulette.controller");

exports.addNewBet = async (req, res) => {
  let numberIdBet = Math.floor(Math.random() * 999999);
  req.body.idBet = numberIdBet;
  let validValue = await validMaxValue(req.body.bet);
  let validNumber = await validNumbers(req.body.bet);
  let validState = await rouletteController.validStateRoulette(
    req.body.idRoulette
  );
  if (!validState) {
    res.json({
      message:
        "En este momento la ruleta se encuentra cerrada, no es posible realizar apuestas",
    });
  } else if (!validValue) {
    res.json({
      message: "Las apuesta maxima no puede exceder a los 10.000 dolares",
    });
  } else if (!validNumber) {
    res.json({
      message:
        "Alguno de los números seleccionados para la apuesta no es valido",
    });
  } else {
    const bets = new Bet(req.body);
    try {
      await bets.save();
      res.json({
        message:
          "Nueva apuesta registrada a la ruleta numero : " +
          req.body.idRoulette +
          " por el jugador numero " +
          req.body.idUser,
      });
    } catch (error) {
      res.status(400).json({
        message:
          "No se pudo procesar la petición fue imposible registrar una nueva apuesta a la rulera numero " +
          req.body.idRoulette,
      });
    }
  }
};
function validMaxValue(objbet) {
  let sumValue = 0;
  for (const betv of objbet) {
    sumValue = sumValue + betv.value;
  }
  if (sumValue > 10000) {
    return false;
  } else {
    return true;
  }
}
function validNumbers(objbet) {
  for (const betn of objbet) {
    if (betn.number < 0 || betn.number > 36) {
      return false;
    }
  }

  return true;
}
async function totalValueBets() {
  try {
    let totalbets = 0;
    let bets = await Bet.find({});
    for (const bet of bets) {
      bet.bet.forEach((element) => {
        totalbets = totalbets + element.value;
      });
    }

    return totalbets;
  } catch (error) {
    console.log(error);
  }
}
async function getWinners() {
  let numberWinner = Math.floor(Math.random() * 37);
  let numberColor = Math.floor(Math.random() * 2); // 0: red, 1: black
  try {
    let bets = await Bet.find({});
    let arrWinners = [];
    let count = 0;
    for (const bet of bets) {
      let arrbetswon = [];
      let countwo = 0;
      bet.bet.forEach((element) => {
        let totalValueWon = 0;
        let residue = 0;
        if (element.number == numberWinner) {
          totalValueWon = element.value * 5;
          if (element.color == 1) {
            residue = element.number % 2;
            if (residue == numberColor) {
              totalValueWon = totalValueWon * 1.8;
            }
          }
        } else {
          if (element.color == 1) {
            residue = element.number % 2;
            if (residue == numberColor) {
              totalValueWon = element.value * 1.8;
            }
          }
        }
        arrbetswon[countwo] = {
          numberBet: element.number,
          valueWon: totalValueWon,
        };
        countwo++;
      });
      arrWinners[count] = { idUser: bet.idUser, betswon: arrbetswon };
      count++;
    }

    return arrWinners;
  } catch (error) {
    res.send(error);
    next();
  }
}
exports.getWinners = getWinners;
exports.totalValueBets = totalValueBets;
