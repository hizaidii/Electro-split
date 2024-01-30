//function to calculate amount owed by each person
let amtOwedFn = function (gridAmt, VCAP, gridFixedCharges, p1name, p1initial, p1final, p2name, p2initial, p2final, p3name, p3initial, p3final, p4name, p4initial, p4final, gridUnits) {
  let totalAmt = gridAmt + VCAP + gridFixedCharges;

  let p1consumption = p1final - p1initial;
  let p2consumption = p2final - p2initial;
  let p3consumption = p3final - p3initial;
  let p4consumption = p4final - p4initial;

  let individualUnitsTotal = p1consumption + p2consumption + p3consumption + p4consumption;

  let commonUnitsPerPerson = (gridUnits - individualUnitsTotal) / 4;

  let avgUnitCost = totalAmt / gridUnits;

  let amtSpentPerPerson = totalAmt / 4;

  let p1AmtConsumed = (p1consumption + commonUnitsPerPerson) * avgUnitCost;
  let p2AmtConsumed = (p2consumption + commonUnitsPerPerson) * avgUnitCost;
  let p3AmtConsumed = (p3consumption + commonUnitsPerPerson) * avgUnitCost;
  let p4AmtConsumed = (p4consumption + commonUnitsPerPerson) * avgUnitCost;

  return {
    [p1name]: Math.round(amtSpentPerPerson - p1AmtConsumed),
    [p2name]: Math.round(amtSpentPerPerson - p2AmtConsumed),
    [p3name]: Math.round(amtSpentPerPerson - p3AmtConsumed),
    [p4name]: Math.round(amtSpentPerPerson - p4AmtConsumed),
    totalAmt: totalAmt,
    p1consumption: p1consumption,
    p2consumption: p2consumption,
    p3consumption: p3consumption,
    p4consumption: p4consumption,
  };
};

// let test = amtOwedFn(5124, 541, 807, "Gurdeep", 778, 885, "Shlok", 1602, 1745, "Abhishek", 2058, 2269, "Husain", 1580, 1652, 823);

// console.log(test.p1 + test.p2 + test.p3 + test.p4);

//function to simplify transactions
function simplifyTransactions(owedData) {
  let transactions = [];
  let debtors = [];
  let creditors = [];

  // Separating debtors and creditors
  for (const person in owedData) {
    if (person === "totalAmt" || person === "p1consumption" || person === "p2consumption" || person === "p3consumption" || person === "p4consumption") continue;

    if (owedData[person] < 0) {
      debtors.push({ name: person, amount: Math.abs(owedData[person]) });
    } else if (owedData[person] > 0) {
      creditors.push({ name: person, amount: owedData[person] });
    }
  }

  // Simplifying transactions
  while (debtors.length > 0 && creditors.length > 0) {
    let debtor = debtors[0];
    let creditor = creditors[0];
    let minAmount = Math.min(debtor.amount, creditor.amount);

    transactions.push(`${debtor.name} pays ₹${minAmount} to ${creditor.name}`);

    debtor.amount -= minAmount;
    creditor.amount -= minAmount;

    if (debtor.amount === 0) {
      debtors.shift();
    }

    if (creditor.amount === 0) {
      creditors.shift();
    }
  }

  return transactions;
}

// console.log(simplifyTransactions(test));

module.exports = {
  amtOwedFn,
  simplifyTransactions,
};
