const futecCycles = require("../models/cycles");
const amountOwedFn = require("../public/js/amountOwedFn");

module.exports.getIndex = async (req, res, next) => {
  try {
    let currentCycleData = await futecCycles.findOne().sort({ startDate: -1 });
    res.render("index.hbs", { currentCycleData });
  } catch (err) {
    console.log(err);
    res.render("error.hbs");
  }
};

module.exports.postAddNewCycle = async (req, res, next) => {
  let { endDate, gridAmountConsumed, totalVCAP, gridFixedCharges, p1FinalMeter, p2FinalMeter, p3FinalMeter, p4FinalMeter, gridUnitsConsumed } = req.body;

  gridAmountConsumed = parseInt(gridAmountConsumed);
  totalVCAP = parseInt(totalVCAP);
  gridFixedCharges = parseInt(gridFixedCharges);
  p1FinalMeter = parseInt(p1FinalMeter);
  p2FinalMeter = parseInt(p2FinalMeter);
  p3FinalMeter = parseInt(p3FinalMeter);
  p4FinalMeter = parseInt(p4FinalMeter);
  gridUnitsConsumed = parseInt(gridUnitsConsumed);

  try {
    const currentCycleData = await futecCycles.findOne().sort({ startDate: -1 });

    const calcData = amountOwedFn.amtOwedFn(gridAmountConsumed, totalVCAP, gridFixedCharges, currentCycleData.p1name, currentCycleData.p1InitialMeter, p1FinalMeter, currentCycleData.p2name, currentCycleData.p2InitialMeter, p2FinalMeter, currentCycleData.p3name, currentCycleData.p3InitialMeter, p3FinalMeter, currentCycleData.p4name, currentCycleData.p4InitialMeter, p4FinalMeter, gridUnitsConsumed);

    const transactions = amountOwedFn.simplifyTransactions(calcData);

    currentCycleData.endDate = endDate;
    currentCycleData.gridAmountConsumed = gridAmountConsumed;
    currentCycleData.totalVCAP = totalVCAP;
    currentCycleData.gridFixedCharges = gridFixedCharges;
    currentCycleData.p1FinalMeter = p1FinalMeter;
    currentCycleData.p2FinalMeter = p2FinalMeter;
    currentCycleData.p3FinalMeter = p3FinalMeter;
    currentCycleData.p4FinalMeter = p4FinalMeter;
    currentCycleData.p1consumption = calcData.p1consumption;
    currentCycleData.p2consumption = calcData.p2consumption;
    currentCycleData.p3consumption = calcData.p3consumption;
    currentCycleData.p4consumption = calcData.p4consumption;
    currentCycleData.gridUnitsConsumed = gridUnitsConsumed;
    currentCycleData.totalAmt = calcData.totalAmt;
    currentCycleData.p1Owes = calcData[currentCycleData.p1name];
    currentCycleData.p2Owes = calcData[currentCycleData.p2name];
    currentCycleData.p3Owes = calcData[currentCycleData.p3name];
    currentCycleData.p4Owes = calcData[currentCycleData.p4name];
    currentCycleData.transactions = transactions;

    // console.log((currentCycleData.p1Owes = calcData.currentCycleData.p1name));

    await currentCycleData.save();

    let newEntry = await futecCycles.create({
      startDate: endDate,
      p1name: currentCycleData.p1name,
      p2name: currentCycleData.p2name,
      p3name: currentCycleData.p3name,
      p4name: currentCycleData.p4name,
      p1InitialMeter: p1FinalMeter,
      p2InitialMeter: p2FinalMeter,
      p3InitialMeter: p3FinalMeter,
      p4InitialMeter: p4FinalMeter,
    });

    res.redirect("/history");
  } catch (err) {
    console.log(err);
    res.render("error.hbs");
  }
};

module.exports.getHistory = async (req, res, next) => {
  try {
    let historicData = await futecCycles.find().sort({ startDate: -1 });
    res.render("history.hbs", { historicData });
  } catch (err) {
    console.log(err);
    res.render("error.hbs");
  }
};

// module.exports.getNestedHistory = (req,res,next)=>{
//     res.render('children.hbs');
// }

module.exports.getAbout = (req, res, next) => {
  res.render("about.hbs");
};

module.exports.getSettings = async (req, res, next) => {
  let currentCycleData = await futecCycles.findOne().sort({ startDate: -1 });
  res.render("settings.hbs", { currentCycleData });
};

module.exports.postSaveNames = async (req, res, next) => {
  let { p1newName, p2newName, p3newName, p4newName } = req.body;

  try {
    let currentCycleData = await futecCycles.findOne().sort({ startDate: -1 });
    if (p1newName !== "") {
      currentCycleData.p1name = p1newName;
    }
    if (p2newName !== "") {
      currentCycleData.p2name = p2newName;
    }
    if (p3newName !== "") {
      currentCycleData.p3name = p3newName;
    }
    if (p4newName !== "") {
      currentCycleData.p4name = p4newName;
    }
    await currentCycleData.save();
    res.redirect("/settings");
  } catch (err) {
    console.log(err);
    res.render("error.hbs");
  }
};
