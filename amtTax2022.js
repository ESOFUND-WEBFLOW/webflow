google.charts.load('current', {
        'packages': ['corechart']
      });
      google.charts.load('current', {
        'packages': ['table']
      });
      google.charts.setOnLoadCallback(drawChart);
      google.charts.setOnLoadCallback(drawTable);
 
 
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
 
      function drawChart() {
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
        spreadISO = numOps1 * (fmv - strike1) + numOps2 * (fmv - strike2) + numOps3 * (fmv - strike3);
        spread = spreadISO;
        totalIncome = income + spread;
        socSec = 0.062;
        medicare = 0.0145;
        stanDeduct = 12950;
        taxIncome = income - stanDeduct;
 
        if (checkBox.checked == true) {
          exemption = 118100;
          stanDeduct = 25900;
          if (income > stanDeduct) { taxIncome = income - stanDeduct;} else {taxIncome = 0;}
         
          if (taxIncome > 647850) {
            fedTax = 174253.5 + 0.37 * (taxIncome - 647850);
          } else if (taxIncome > 431900) {
            fedTax = 98671 + 0.35 * (taxIncome - 431900);
          } else if (taxIncome > 340100) {
            fedTax = 69295 + 0.32 * (taxIncome - 340100);
          } else if (taxIncome > 178150) {
            fedTax = 30427 + 0.24 * (taxIncome - 178150);
          } else if (taxIncome > 83550) {
            fedTax = 9615 + 0.22 * (taxIncome - 83550);
          } else if (taxIncome > 20550) {
            fedTax = 2055 + 0.12 * (taxIncome - 20550);
          } else {
            fedTax = 0.1 * taxIncome;
          }
        } else {
          exemption = 75900;
          stanDeduct = 12950;
          if (income > stanDeduct) { taxIncome = income - stanDeduct;} else {taxIncome = 0;}
   
          if (taxIncome > 539900) {
            fedTax = 162718 + 0.37 * (taxIncome - 539900);
          } else if (taxIncome > 215951) {
            fedTax = 49335.5 + 0.35 * (taxIncome - 215951);
          } else if (taxIncome > 170050) {
            fedTax = 34647.5 + 0.32 * (taxIncome - 170050);
          } else if (taxIncome > 89076) {
            fedTax = 15213.5 + 0.24 * (taxIncome - 89076);
          } else if (taxIncome > 41776) {
            fedTax = 4807.5 + 0.22 * (taxIncome - 41776);
          } else if (taxIncome > 10276) {
            fedTax = 1027.5 + 0.12 * (taxIncome - 10276);
          } else {
            fedTax = 0.1 * taxIncome;
          }
        }
 
        if (totalIncome - exemption < 194800) {
          fedRateAMT = 0.26;
        } else {
          fedRateAMT = 0.28;
        }
 
        if (state === "CA" || state === "IA") {
          stateRateAMT = 0.07;
        } else if (state === "CO") {
          stateRateAMT = 0.0347;
        } else if (state === "MN") {
          stateRateAMT = 0.058;
        } else {
          stateRateAMT = 0;
        }
 
 
        if (totalIncome > exemption) {
          totalAMT = (totalIncome - exemption) * (fedRateAMT + stateRateAMT);
        } else {
          totalAMT = 0;
        }
 
        if (totalAMT > (fedTax)) {
          amt = totalAMT - (fedTax);
        } else {
          amt = 0;
        }
 
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
            ['Standard Deduction', stanDeduct],
            ['Taxable Income', income - stanDeduct],
            ['Regular Federal Income Tax', fedTax]
          ]);
 
          amtTaxRates = google.visualization.arrayToDataTable([
            ['AMT Breakdown', ''],
            ['Income', income],
            ['Total ISO Spread', spreadISO],
            ['AMTI (AMT Income)', totalIncome],
            ['AMT Exemption', exemption],
            ['AMTI - Exemption (Min $0)', totalIncome - exemption],
            ['Alternative Minimum Tax (Rate: ' + Math.round((fedRateAMT + stateRateAMT) * 100) + '%)', totalAMT],
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
