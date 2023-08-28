google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.load('current', {
  'packages': ['table']
});

google.charts.setOnLoadCallback(drawChart);

const STATE_ABBREVIATIONS_MAP = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
}

var numOps = 1000;
var strike = 1;
var fmv = 5;
var fedRateAMT = 0.28;
var stateRateAMT = 0;
var fedRateInc = 0.12;
var income = 50000;
var spread = (numOps * (fmv - strike));
var totalIncome = income + spread;
var married = false;
var state = "N/a";
var exemption = 75900;
var spreadISO = 0;
var totalAMT = (spreadISO + income - exemption) * (fedRateAMT + stateRateAMT);
var stanDeduct = 12950;
var taxIncome = income;
var fedTax = 0;
var amt = 0;
var chart;
var taxTable;
var options = {
  'width': "100%",
  'height': 400,
  'legend': 'none',
  'vAxis': {
    minValue: 0,
    format: 'currency'
  }
};

var taxData
var stateTaxData

var yearInput

function refreshData(year) {
  fetchData(`https://api.esofund.io/tax/${year}`, false);
  fetchData(`https://api.esofund.io/tax/state/${year}`, true);
}

if (document.readyState !== 'loading') {
  if (yearInput) {
    refreshData(yearInput.value);
  }
} else {
  document.addEventListener('DOMContentLoaded', function () {
    yearInput = document.getElementById("taxYear");
    console.log(yearInput)
    if (yearInput) {
      if (yearInput.value) {
        refreshData(yearInput.value);
      }
      yearInput.addEventListener('change', function() {
        // Retrieve the selected value
        console.log("Added event listener to the year input")
        const selectedValue = yearInput.value;
        refreshData(selectedValue);
      })
    } else {
      console.log("Could not find year input")
    }
  });
}

function fetchData(url, isState) {
  fetch(url) // Replace with your URL
    .then(response => response.json())
    .then(data => {
      if (isState) {
        stateTaxData = data.taxData;
      } else {
        taxData = data.taxData;
      }
      drawChart()
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function getTaxDataFromInputs(fedTaxableIncome, fedTaxableIncomeOnly, isMarried) {
  const taxDataSorted = taxData.filter(t => (t.isMarried && isMarried) || (!t.isMarried && !isMarried)).sort((a, b) => b.fedLevel - a.fedLevel)
  let fedTax = 0
  let fedIncomeOnlyTax = 0
  let isFedTaxSet = false
  let isFedTaxOnlySet = false

  for (let i = 0; i < taxDataSorted.length; i++) {
    const tax = taxDataSorted[i]
    if (fedTaxableIncome > tax.fedLevel && !isFedTaxSet) {
      fedTax = tax.fedOwe + tax.fedRate * (fedTaxableIncome - tax.fedLevel) + (tax.socSec + tax.medicare) * fedTaxableIncome
      isFedTaxSet = true
    }

    if (fedTaxableIncomeOnly > tax.fedLevel && !isFedTaxOnlySet) {
      fedIncomeOnlyTax = tax.fedOwe + tax.fedRate * (fedTaxableIncomeOnly - tax.fedLevel) + (tax.socSec + tax.medicare) * fedTaxableIncomeOnly
      isFedTaxOnlySet = true
    }

    if (isFedTaxSet && isFedTaxOnlySet) {
      break
    }
  }
  
  return {
    fedTax,
    fedIncomeOnlyTax
  };
}

function getStateTaxDataFromInputs(state, income, isMarried) {
  const filteredStateTaxData = stateTaxData.filter(t => t.state === state)
  const stateTaxDataSorted = filteredStateTaxData.sort((a, b) => b.stateLevel - a.stateLevel)
  const stateDeduction = filteredStateTaxData.find(t => isMarried ? t.marriageStatus === "married" || t.marriageStatus === "na" : t.marriageStatus === "single" || t.marriageStatus === "na")?.stateDeduction ?? 0
  const stateTaxibleIncome = income + stateDeduction
  const stateTaxableIncomeOnly = income - stateDeduction

  let stateTax = 0
  let stateAmtRate = 0
  let stateIncomeOnlyTax = 0
  let isStateTaxSet = false
  let isStateTaxOnlySet = false

  for (let i = 0; i < stateTaxDataSorted.length; i++) {
    const tax = stateTaxDataSorted[i]
    if (stateTaxibleIncome > tax.stateLevel) {
      stateTax = tax.stateOwe + tax.stateRate * (stateTaxibleIncome - tax.stateLevel)
      stateAmtRate = tax.stateAmtRate
      isStateTaxSet = true
    }

    if (stateTaxableIncomeOnly > tax.stateLevel) {
      stateIncomeOnlyTax = tax.stateOwe + tax.stateRate * (stateTaxableIncomeOnly - tax.stateLevel)
      isStateTaxOnlySet = true
    }

    if (isStateTaxSet && isStateTaxOnlySet) {
      break
    }
  }

  return {
    stateTax,
    stateAmtRate,
    stateIncomeOnlyTax
  }
}

function drawChart() {
  if (!taxData || !stateTaxData) {
    console.log("No tax data")
    return
  }

  numOps1 = document.getElementsByName("numOps1")[0].valueAsNumber;
  strike1 = document.getElementsByName("strike1")[0].valueAsNumber;
  numOps2 = document.getElementsByName("numOps2")[0].valueAsNumber;
  strike2 = document.getElementsByName("strike2")[0].valueAsNumber;
  numOps3 = document.getElementsByName("numOps3")[0].valueAsNumber;
  strike3 = document.getElementsByName("strike3")[0].valueAsNumber;
  fmv = document.getElementsByName("fmv")[0].valueAsNumber;
  income = document.getElementsByName("income")[0].valueAsNumber;
  state = document.getElementsByName("state")[0].value;
  var checkBox = document.getElementById("married");
  const isMarried = checkBox.checked;

  spreadISO = numOps1 * (fmv - strike1) + numOps2 * (fmv - strike2) + numOps3 * (fmv - strike3);
  spread = spreadISO;
  const exemption = taxData.find(t => isMarried ? t.marriageStatus === "married" : t.marriageStatus === "single")?.exemption ?? 0
  const amtThreshold = taxData.find(t => isMarried ? t.marriageStatus === "married" : t.marriageStatus === "single")?.amtThreshold ?? 0
  const fedDeduction = taxData.find(t => isMarried ? t.marriageStatus === "married" : t.marriageStatus === "single")?.fedDeduction ?? 0
  const fedAmtLevel = taxData.find(t => isMarried ? t.marriageStatus === "married" : t.marriageStatus === "single")?.fedAmtLevel ?? 0

  const fedTaxableIncome = income + - fedDeduction
  const fedTaxableIncomeOnly = income - fedDeduction
  const amtIncome = income + spread
  const _amtExemption = exemption - 0.25 * (amtIncome - amtThreshold) > 0 ? exemption - 0.25 * (amtIncome - amtThreshold) : 0 
  const amtExemption = amtIncome > amtThreshold ? _amtExemption : exemption
  const fedAmtRate = amtIncome - amtExemption > fedAmtLevel ? 0.28 : 0.26

  const fedTaxData = getTaxDataFromInputs(fedTaxableIncome, fedTaxableIncomeOnly, isMarried)
  const fedTax = fedTaxData.fedTax

  const stateData = getStateTaxDataFromInputs(state, income, isMarried)
  const stateAmtRate = stateData.stateAmtRate

  const totalAmt = amtIncome > amtExemption ? (amtIncome - amtExemption) * (fedAmtRate + stateAmtRate) : 0
  const amt = totalAmt > fedTax ? totalAmt - fedTax : 0

  console.log("AMT: " + amt)

  if (spread > 0) {
    data = google.visualization.arrayToDataTable([
      ['Cost', '$', {
        role: 'style'
      }],
      ['Exercise Cost', numOps1 * strike1 + numOps2 * strike2 + numOps3 * strike3, "#075095"],
      ['AMT', amt, "#ff5757"]
    ]);

    regTaxRates = google.visualization.arrayToDataTable([
      ['Regular Income Tax Breakdown', ''],
      ['Income', income],
      ['Standard Deduction', fedDeduction],
      ['Taxable Income', income - fedDeduction],
      ['Regular Federal Income Tax', fedTax]
    ]);

    amtTaxRates = google.visualization.arrayToDataTable([
      ['AMT Breakdown', ''],
      ['Income', income],
      ['Total ISO Spread', spreadISO],
      ['AMTI (AMT Income)', amtIncome],
      ['AMT Exemption', amtExemption],
      ['AMTI - Exemption (Min $0)', amtIncome - amtExemption],
      ['Alternative Minimum Tax (Rate: ' + Math.round((fedAmtRate + stateAmtRate) * 100) + '%)', totalAmt],
      ['AMT Owed*', amt]
    ]);

    var formatter = new google.visualization.NumberFormat({
      prefix: '$',
      negativeColor: 'red',
      negativeParens: true
    });
    var chart = new google.visualization.ColumnChart(document.getElementById('amtgraph'));
    formatter.format(data, 1);
    chart.draw(data, options);
    var table = new google.visualization.Table(document.getElementById('reg_table_div'));
    formatter.format(regTaxRates, 1);
    table.draw(regTaxRates, {
      showRowNumber: false,
      alternatingRowStyle: false,
      width: '50%',
      height: '100%'
    });
    var table = new google.visualization.Table(document.getElementById('amt_table_div'));
    formatter.format(amtTaxRates, 1);
    table.draw(amtTaxRates, {
      showRowNumber: false,
      alternatingRowStyle: false,
      width: '50%',
      height: '100%'
    });
  }
}
