const Roulette = require("../models/Roulette");
const betsController = require("../controllers/bets.controller");

exports.closeRouletteById = async (req, res) => {
  try {
    let validState = await validStateRoulette(req.body.id);
    if (!validState) {
      res.json({
        message: "La ruleta ya se encuentra cerrada",
      });
    } else {
      let totalvalue = await betsController.totalValueBets();
      const roulette = await Roulette.findOneAndUpdate(
        { id: req.body.id },
        { state: 2 }
      );
      let winners = await betsController.getWinners();
      res.json({
        message:
          "Se recaudó un total de " +
          totalvalue +
          " dolares en la ruleta " +
          req.body.id,
        winners: winners,
      });
    }
  } catch (error) {
    res.status(400).json({
      message:
        "No se pudo procesar la petición fue imposible cerrar la ruleta ",
    });
  }
};
exports.activeRouletteById = async (req, res) => {
  try {
    const roulette = await Roulette.findOneAndUpdate(
      { id: req.body.id },
      { state: 1 }
    );
    res.json({
      message:
        "Ruleta con identificación " + req.body.id + " se activó correctamente",
    });
  } catch (error) {
    res.status(400).json({
      message:
        "No se pudo procesar la petición fue imposible aperturar la ruleta ",
    });
  }
};
exports.addNewRoulette = async (req, res) => {
  let numberId = Math.floor(Math.random() * 999999);
  let objectbody = { id: numberId, name: req.body.name, state: 2 }; //state default 2: close
  const roulette = new Roulette(objectbody);
  try {
    await roulette.save();
    res.json({
      message: "Nueva ruleta registrada con el identificador : " + numberId,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "No se pudo procesar la petición fue imposible registrar una nueva ruleta ",
    });
  }
};
exports.findAllRoulettes = async (req, res) => {
  try {
    let roulettes = await Roulette.find({});
    if (roulettes.length === 0) {
      res
        .status(404)
        .json({ message: "No hay ruletas registradas por el momento" });
    } else {
      let newroulettes = [];
      let statedescrip = "";
      let count = 0;
      for (const roulette of roulettes) {
        if (roulette.state == 1) {
          statedescrip = "Abierta";
        } else {
          statedescrip = "Cerrada";
        }
        newroulettes[count] = { id: roulette.id, name: roulette.name, state: statedescrip };
        count++;
      }
      res.json(newroulettes);
    }
  } catch (error) {
    res.send(error);
    next();
  }
};
async function validStateRoulette(idRoulette) {
  try {
    let roulette = await Roulette.findOne({ id: idRoulette });
    if (roulette.state == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    res.send(error);
    next();
  }
}
exports.validStateRoulette = validStateRoulette;
