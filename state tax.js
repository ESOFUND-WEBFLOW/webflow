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
      var stateRateInc = 0;
      var income = 50000;
      var stateTaxIncome = 0;
      var stateStanDeduct = 0;
      var stateTax = 0;
      var stateRateInc = 0;
      var spread = (numOps * (fmv - strike));
      var totalIncome = income + spread;
      var married = false;
      var state = "N/a";
      var exemption = 72900;
      var spreadISO = 0;
      var totalAMT = (spreadISO + income - exemption) * (fedRateAMT + stateRateAMT);
      var stanDeduct = 12400;
      var taxIncome = income - stanDeduct;
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
        stanDeduct = 12400;
        taxIncome = income - stanDeduct;
 
        if (checkBox.checked == true) {
          exemption = 113400;
          stanDeduct = 24800;
          if (taxIncome > 622050) {
            fedTax = 167307.5 + 0.37 * (taxIncome - 622050);
          } else if (taxIncome > 414700) {
            fedTax = 94735 + 0.35 * (taxIncome - 414700);
          } else if (taxIncome > 326600) {
            fedTax = 66543 + 0.32 * (taxIncome - 326600);
          } else if (taxIncome > 171050) {
            fedTax = 29211 + 0.24 * (taxIncome - 171050);
          } else if (taxIncome > 80250) {
            fedTax = 9235 + 0.22 * (taxIncome - 80250);
          } else if (taxIncome > 19750) {
            fedTax = 1975 + 0.12 * (taxIncome - 19750);
          } else {
            fedTax = 0.1 * taxIncome;
          }
        } else {
          exemption = 72900;
          standdeduct = 12400;
          if (taxIncome > 518400) {
            fedTax = 156235 + 0.37 * (taxIncome - 518400);
          } else if (taxIncome > 207350) {
            fedTax = 47367.5 + 0.35 * (taxIncome - 207350);
          } else if (taxIncome > 163300) {
            fedTax = 33271.5 + 0.32 * (taxIncome - 163300);
          } else if (taxIncome > 85525) {
            fedTax = 14605.5 + 0.24 * (taxIncome - 85525);
          } else if (taxIncome > 40125) {
            fedTax = 4617.5 + 0.22 * (taxIncome - 40125);
          } else if (taxIncome > 9876) {
            fedTax = 987.5 + 0.12 * (taxIncome - 9875);
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
 
        if (state === "CO" || state === "KY" || state === "MA" || state === "UT" || state === "IL" || state === "IN" || state === "IN" || state === "NC" || state === "PA") {
          if (state === "CO") {
            stateRateInc = 0.0455;
            if (checkBox.checked == true) {
             stateStanDeduct = 25100;
            } else {
              stateStanDeduct = 12550;
            }
          } else if (state === "KY" || state === "MA") {
            stateRateInc = 0.05;
            if (checkBox.checked == true || state === "KY") {
              stateStanDeduct = 5380;
            } else if (checkBox.checked == false || state === "KY") {
              stateStanDeduct = 2690;
            } else {
              stateStanDeduct = 0;
            }
          } else if (state === "UT" || state === "IL") {
            stateRateInc = 0.0495;
          } else if (state === "IN") {
            stateRateInc = 0.0323;
          } else if (state === "MI") {
            stateRateInc = 0.0425;
          } else if (state === "NC") {
            stateRateInc = 0.0525;
            if (checkBox.checked == true) {
              stateStanDeduct = 21500;
            } else {
              stateStanDeduct = 10750;
            }
          } else if (state === "PA") {
            stateRateInc = 0.0525;
          }
          stateTaxIncome = income - stateStanDeduct;
          stateTax = stateTaxIncome * stateRateInc;
        } else if (state === "AL") {
          if (checkBox.checked == true) {
            stateStanDeduct = 7500;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > 6000) {
              stateTax = 220 + 0.05 * (stateTaxIncome - 6000);
            } else if (stateTaxIncome > 1000) {
              stateTax = 20 + 0.04 * (stateTaxIncome - 1000);
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 2500;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > 3000) {
              stateTax = 110 + 0.05 * (stateTaxIncome - 3000);
            } else if (stateTaxIncome > 500) {
              stateTax = 10 + 0.04 * (stateTaxIncome - 500);
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          }
        } else if (state === "AZ") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (500000)) {
              stateTax = (20105) + 0.08 * (stateTaxIncome - (500000));
            } else if (stateTaxIncome > (327263)) {
              stateTax = (12332) + 0.045 * (stateTaxIncome - (327263));
            } else if (stateTaxIncome > (109088)) {
              stateTax = (3234) + 0.0417 * (stateTaxIncome - (109088));
            } else if (stateTaxIncome > (54544)) {
              stateTax = (1412) + 0.0334 * (stateTaxIncome - (109088));
            } else {
              stateTax = 0.0259 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 12550;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (500000 / 2)) {
              stateTax = (20105 / 2) + 0.08 * (stateTaxIncome - (500000 / 2));
            } else if (stateTaxIncome > (327263 / 2)) {
              stateTax = (12332 / 2) + 0.045 * (stateTaxIncome - (327263 / 2));
            } else if (stateTaxIncome > (109088 / 2)) {
              stateTax = (3234 / 2) + 0.0417 * (stateTaxIncome - (109088 / 2));
            } else if (stateTaxIncome > (54544 / 2)) {
              stateTax = (1412 / 2) + 0.0334 * (stateTaxIncome - (109088 / 2));
            } else {
              stateTax = 0.0259 * stateTaxIncome;
            }
          }
        } else if (state === "AR") {
          if (checkBox.checked == true) {
            stateStanDeduct = 4400;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (8000)) {
              stateTax = (240) + 0.059 * (stateTaxIncome - (8000));
            } else if (stateTaxIncome > (4000)) {
              stateTax = (80) + 0.04 * (stateTaxIncome - (4000));
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 2200;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (8000 / 2)) {
              stateTax = (240 / 2) + 0.059 * (stateTaxIncome - (8000 / 2));
            } else if (stateTaxIncome > (4000 / 2)) {
              stateTax = (80 / 2) + 0.04 * (stateTaxIncome - (4000 / 2));
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          }
        } else if (state === "CA") {
          if (checkBox.checked == true) {
            stateStanDeduct = 9202;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1198024)) {
              stateTax = (118436) + 0.133 * (stateTaxIncome - (1198024));
            } else if (stateTaxIncome > (1000000)) {
              stateTax = (94079) + 0.123 * (stateTaxIncome - (1000000));
            } else if (stateTaxIncome > (718814)) {
              stateTax = (62305) + 0.113 * (stateTaxIncome - (718814));
            } else if (stateTaxIncome > (599016)) {
              stateTax = (49965) + 0.103 * (stateTaxIncome - (599016));
            } else if (stateTaxIncome > (117268)) {
              stateTax = (5163) + 0.093 * (stateTaxIncome - (117268));
            } else if (stateTaxIncome > (92788)) {
              stateTax = (3204) + 0.08 * (stateTaxIncome - (92788));
            } else if (stateTaxIncome > (66842)) {
              stateTax = (1648) + 0.06 * (stateTaxIncome - (66842));
            } else if (stateTaxIncome > (42350)) {
              stateTax = (668) + 0.04 * (stateTaxIncome - (42350));
            } else if (stateTaxIncome > (17864)) {
              stateTax = (178) + 0.02 * (stateTaxIncome - (17864));
            } else {
              stateTax = 0.01 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 4601;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1000000)) {
              stateTax = (107549) + 0.133 * (stateTaxIncome - (1000000));
            } else if (stateTaxIncome > (599012)) {
              stateTax = (58227) + 0.123 * (stateTaxIncome - (599012));
            } else if (stateTaxIncome > (718814 / 2)) {
              stateTax = (62305 / 2) + 0.113 * (stateTaxIncome - (718814 / 2));
            } else if (stateTaxIncome > (599016 / 2)) {
              stateTax = (49965 / 2) + 0.103 * (stateTaxIncome - (599016 / 2));
            } else if (stateTaxIncome > (117268 / 2)) {
              stateTax = (5163 / 2) + 0.093 * (stateTaxIncome - (117268 / 2));
            } else if (stateTaxIncome > (92788 / 2)) {
              stateTax = (3204 / 2) + 0.08 * (stateTaxIncome - (92788 / 2));
            } else if (stateTaxIncome > (66842 / 2)) {
              stateTax = (1648 / 2) + 0.06 * (stateTaxIncome - (66842 / 2));
            } else if (stateTaxIncome > (42350 / 2)) {
              stateTax = (668 / 2) + 0.04 * (stateTaxIncome - (42350 / 2));
            } else if (stateTaxIncome > (17864 / 2)) {
              stateTax = (178 / 2) + 0.02 * (stateTaxIncome - (17864 / 2));
            } else {
              stateTax = 0.01 * stateTaxIncome;
            }
          }
        } else if (state === "CT") {
          if (checkBox.checked == true) {
            stateStanDeduct = 9202;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1000000)) {
              stateTax = (63100) + 0.0699 * (stateTaxIncome - (1000000));
            } else if (stateTaxIncome > (500000)) {
              stateTax = (28600) + 0.069 * (stateTaxIncome - (500000));
            } else if (stateTaxIncome > (400000)) {
              stateTax = (22100) + 0.065 * (stateTaxIncome - (400000));
            } else if (stateTaxIncome > (200000)) {
              stateTax = (10100) + 0.06 * (stateTaxIncome - (200000));
            } else if (stateTaxIncome > (100000)) {
              stateTax = (4600) + 0.055 * (stateTaxIncome - (100000));
            } else if (stateTaxIncome > (20000)) {
              stateTax = (600) + 0.05 * (stateTaxIncome - (20000));
            } else {
              stateTax = 0.03 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 4601;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1000000 / 2)) {
              stateTax = (63100 / 2) + 0.0699 * (stateTaxIncome - (1000000 / 2));
            } else if (stateTaxIncome > (500000 / 2)) {
              stateTax = (28600 / 2) + 0.069 * (stateTaxIncome - (500000 / 2));
            } else if (stateTaxIncome > (400000 / 2)) {
              stateTax = (22100 / 2) + 0.065 * (stateTaxIncome - (400000 / 2));
            } else if (stateTaxIncome > (200000 / 2)) {
              stateTax = (10100 / 2) + 0.06 * (stateTaxIncome - (200000 / 2));
            } else if (stateTaxIncome > (100000 / 2)) {
              stateTax = (4600 / 2) + 0.055 * (stateTaxIncome - (100000 / 2));
            } else if (stateTaxIncome > (20000 / 2)) {
              stateTax = (600 / 2) + 0.05 * (stateTaxIncome - (20000 / 2));
            } else {
              stateTax = 0.03 * stateTaxIncome;
            }
          }
        } else if (state === "DE") {
          if (checkBox.checked == true) {
            stateStanDeduct = 6500;
          } else {
            stateStanDeduct = 325;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (60000)) {
            stateTax = (2943) + 0.066 * (stateTaxIncome - (60000));
          } else if (stateTaxIncome > (25000)) {
            stateTax = (1001) + 0.0555 * (stateTaxIncome - (25000));
          } else if (stateTaxIncome > (20000)) {
            stateTax = (741) + 0.052 * (stateTaxIncome - (20000));
          } else if (stateTaxIncome > (10000)) {
            stateTax = (261) + 0.048 * (stateTaxIncome - (10000));
          } else if (stateTaxIncome > (5000)) {
            stateTax = (66) + 0.039 * (stateTaxIncome - (5000));
          } else if (stateTaxIncome > (2000)) {
            stateTax = 0.022 * (stateTaxIncome - (2000));
          } else {
            stateTax = 0 * stateTaxIncome;
          }
        } else if (state === "GA") {
          if (checkBox.checked == true) {
            stateStanDeduct = 6000;
           stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (10000)) {
              stateTax = (340) + 0.0575 * (stateTaxIncome - (10000));
            } else if (stateTaxIncome > (7000)) {
              stateTax = (190) + 0.05 * (stateTaxIncome - (7000));
            } else if (stateTaxIncome > (5000)) {
              stateTax = (110) + 0.04 * (stateTaxIncome - (5000));
            } else if (stateTaxIncome > (3000)) {
              stateTax = (50) + 0.03 * (stateTaxIncome - (3000));
            } else if (stateTaxIncome > (1000)) {
              stateTax = (10) + 0.02 * (stateTaxIncome - (1000));
            } else {
              stateTax = 0.01 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 4600;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (7000)) {
              stateTax = (230) + 0.0575 * (stateTaxIncome - (7000));
            } else if (stateTaxIncome > (5250)) {
              stateTax = (142) + 0.05 * (stateTaxIncome - (5250));
            } else if (stateTaxIncome > (3750)) {
              stateTax = (82) + 0.04 * (stateTaxIncome - (3750));
            } else if (stateTaxIncome > (2250)) {
              stateTax = (37) + 0.03 * (stateTaxIncome - (2250));
            } else if (stateTaxIncome > (750)) {
              stateTax = (7) + 0.02 * (stateTaxIncome - (750));
            } else {
              stateTax = 0.01 * stateTaxIncome;
            }
          }
        } else if (state === "HI") {
          if (checkBox.checked == true) {
            stateStanDeduct = 4400;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (400000)) {
              stateTax = (32757) + 0.011 * (stateTaxIncome - (400000));
            } else if (stateTaxIncome > (350000)) {
              stateTax = (27757) + 0.010 * (stateTaxIncome - (350000));
            } else if (stateTaxIncome > (300000)) {
              stateTax = (23257) + 0.09 * (stateTaxIncome - (300000));
            } else if (stateTaxIncome > (96000)) {
              stateTax = (6427) + 0.0825 * (stateTaxIncome - (96000));
            } else if (stateTaxIncome > (72000)) {
              stateTax = (4531) + 0.079 * (stateTaxIncome - (72000));
            } else if (stateTaxIncome > (48000)) {
              stateTax = (2707) + 0.076 * (stateTaxIncome - (48000));
            } else if (stateTaxIncome > (38400)) {
              stateTax = (2016) + 0.072 * (stateTaxIncome - (38400));
            } else if (stateTaxIncome > (28800)) {
              stateTax = (1363) + 0.068 * (stateTaxIncome - (28800));
            } else if (stateTaxIncome > (19200)) {
              stateTax = (748) + 0.064 * (stateTaxIncome - (19200));
            } else if (stateTaxIncome > (9600)) {
              stateTax = (220) + 0.055 * (stateTaxIncome - (9600));
            } else if (stateTaxIncome > (4800)) {
              stateTax = (67) + 0.032 * (stateTaxIncome - (4800));
            } else {
              stateTax = 0.014 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 2200;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (400000 / 2)) {
              stateTax = (32757 / 2) + 0.011 * (stateTaxIncome - (400000 / 2));
            } else if (stateTaxIncome > (350000 / 2)) {
              stateTax = (27757 / 2) + 0.010 * (stateTaxIncome - (350000 / 2));
            } else if (stateTaxIncome > (300000 / 2)) {
              stateTax = (23257 / 2) + 0.09 * (stateTaxIncome - (300000 / 2));
            } else if (stateTaxIncome > (96000 / 2)) {
              stateTax = (6427 / 2) + 0.0825 * (stateTaxIncome - (96000 / 2));
            } else if (stateTaxIncome > (72000 / 2)) {
              stateTax = (4531 / 2) + 0.079 * (stateTaxIncome - (72000 / 2));
            } else if (stateTaxIncome > (48000 / 2)) {
              stateTax = (2707 / 2) + 0.076 * (stateTaxIncome - (48000 / 2));
            } else if (stateTaxIncome > (38400 / 2)) {
              stateTax = (2016 / 2) + 0.072 * (stateTaxIncome - (38400 / 2));
            } else if (stateTaxIncome > (28800 / 2)) {
              stateTax = (1363 / 2) + 0.068 * (stateTaxIncome - (28800 / 2));
            } else if (stateTaxIncome > (19200 / 2)) {
              stateTax = (748 / 2) + 0.064 * (stateTaxIncome - (19200 / 2));
            } else if (stateTaxIncome > (9600 / 2)) {
              stateTax = (220 / 2) + 0.055 * (stateTaxIncome - (9600 / 2));
            } else if (stateTaxIncome > (4800 / 2)) {
              stateTax = (67 / 2) + 0.032 * (stateTaxIncome - (4800 / 2));
            } else {
              stateTax = 0.014 * stateTaxIncome;
            }
          }
        } else if (state === "ID") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (23520)) {
              stateTax = (1087) + 0.06925 * (stateTaxIncome - (23520));
            } else if (stateTaxIncome > (15680)) {
              stateTax = (568) + 0.06625 * (stateTaxIncome - (15680));
            } else if (stateTaxIncome > (12544)) {
              stateTax = (392) + 0.05625 * (stateTaxIncome - (12544));
            } else if (stateTaxIncome > (9408)) {
              stateTax = (246) + 0.04625 * (stateTaxIncome - (9408));
            } else if (stateTaxIncome > (6272)) {
              stateTax = (133) + 0.03625 * (stateTaxIncome - (6272));
            } else if (stateTaxIncome > (3136)) {
              stateTax = (35) + 0.03125 * (stateTaxIncome - (3136));
            } else {
              stateTax = 0.01125 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 12550;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (23520 / 2)) {
              stateTax = (1087 / 2) + 0.06925 * (stateTaxIncome - (23520 / 2));
            } else if (stateTaxIncome > (15680 / 2)) {
              stateTax = (568 / 2) + 0.06625 * (stateTaxIncome - (15680 / 2));
            } else if (stateTaxIncome > (12544 / 2)) {
              stateTax = (392 / 2) + 0.05625 * (stateTaxIncome - (12544 / 2));
            } else if (stateTaxIncome > (9408 / 2)) {
              stateTax = (246 / 2) + 0.04625 * (stateTaxIncome - (9408 / 2));
            } else if (stateTaxIncome > (6272 / 2)) {
              stateTax = (133 / 2) + 0.03625 * (stateTaxIncome - (6272 / 2));
            } else if (stateTaxIncome > (3136 / 2)) {
              stateTax = (35 / 2) + 0.03125 * (stateTaxIncome - (3136 / 2));
            } else {
              stateTax = 0.01125 * stateTaxIncome;
            }
          }
        } else if (state === "IA") {
          if (checkBox.checked == true) {
            stateStanDeduct = 5240;
          } else {
            stateStanDeduct = 2130;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (75420)) {
            stateTax = (32757) + 0.0853 * (stateTaxIncome - (75420));
          } else if (stateTaxIncome > (50280)) {
            stateTax = (27757) + 0.0744 * (stateTaxIncome - (50280));
          } else if (stateTaxIncome > (33520)) {
            stateTax = (23257) + 0.0625 * (stateTaxIncome - (33520));
          } else if (stateTaxIncome > (25140)) {
            stateTax = (6427) + 0.0596 * (stateTaxIncome - (25140));
          } else if (stateTaxIncome > (15084)) {
            stateTax = (4531) + 0.0563 * (stateTaxIncome - (15084));
          } else if (stateTaxIncome > (6704)) {
            stateTax = (2707) + 0.0414 * (stateTaxIncome - (6704));
          } else if (stateTaxIncome > (3352)) {
            stateTax = (2016) + 0.0225 * (stateTaxIncome - (3352));
          } else if (stateTaxIncome > (1676)) {
            stateTax = (1363) + 0.0067 * (stateTaxIncome - (1676));
          } else {
            stateTax = 0.0033 * stateTaxIncome;
          }
        } else if (state === "KS") {
          if (checkBox.checked == true) {
            stateStanDeduct = 7500;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (60000)) {
              stateTax = (2505) + 0.057 * (stateTaxIncome - (60000));
            } else if (stateTaxIncome > (30000)) {
              stateTax = (930) + 0.0525 * (stateTaxIncome - (30000));
            } else {
              stateTax = 0.031 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 3000;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (60000 / 2)) {
              stateTax = (2505 / 2) + 0.057 * (stateTaxIncome - (60000 / 2));
            } else if (stateTaxIncome > (30000 / 2)) {
              stateTax = (930 / 2) + 0.0525 * (stateTaxIncome - (30000 / 2));
            } else {
              stateTax = 0.031 * stateTaxIncome;
            }
          }
        } else if (state === "LA") {
          if (checkBox.checked == true) {
            stateStanDeduct = 0;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (100000)) {
              stateTax = (3500) + 0.06 * (stateTaxIncome - (100000));
            } else if (stateTaxIncome > (25000)) {
              stateTax = (500) + 0.04 * (stateTaxIncome - (25000));
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 0;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (100000 / 2)) {
              stateTax = (3500 / 2) + 0.06 * (stateTaxIncome - (100000 / 2));
            } else if (stateTaxIncome > (25000 / 2)) {
              stateTax = (500 / 2) + 0.04 * (stateTaxIncome - (25000 / 2));
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          }
        } else if (state === "ME") {
          if (checkBox.checked == true) {
           stateStanDeduct = 25100;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (106350)) {
              stateTax = (6751) + 0.0715 * (stateTaxIncome - (106350));
            } else if (stateTaxIncome > (44950)) {
              stateTax = (2607) + 0.0675 * (stateTaxIncome - (44950));
            } else {
              stateTax = 0.058 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 12550;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (106350 / 2)) {
              stateTax = (6751 / 2) + 0.0715 * (stateTaxIncome - (106350 / 2));
            } else if (stateTaxIncome > (44950 / 2)) {
              stateTax = (2607 / 2) + 0.0675 * (stateTaxIncome - (44950 / 2));
            } else {
              stateTax = 0.058 * stateTaxIncome;
            }
          }
        } else if (state === "MD") {
          if (checkBox.checked == true) {
            stateStanDeduct = 4650;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (300000)) {
              stateTax = (15072) + 0.0575 * (stateTaxIncome - (300000));
            } else if (stateTaxIncome > (225000)) {
              stateTax = (10947) + 0.0550 * (stateTaxIncome - (225000));
            } else if (stateTaxIncome > (175000)) {
              stateTax = (8322) + 0.0525 * (stateTaxIncome - (175000));
            } else if (stateTaxIncome > (150000)) {
              stateTax = (7072) + 0.05 * (stateTaxIncome - (150000));
            } else if (stateTaxIncome > (3000)) {
              stateTax = (90) + 0.0475 * (stateTaxIncome - (3000));
            } else if (stateTaxIncome > (2000)) {
              stateTax = (50) + 0.04 * (stateTaxIncome - (2000));
            } else if (stateTaxIncome > (1000)) {
              stateTax = (20) + 0.03 * (stateTaxIncome - (1000));
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 4300;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (250000)) {
              stateTax = (12760) + 0.0575 * (stateTaxIncome - (300000));
            } else if (stateTaxIncome > (150000)) {
              stateTax = (7260) + 0.0550 * (stateTaxIncome - (150000));
            } else if (stateTaxIncome > (125000)) {
              stateTax = (5947) + 0.0525 * (stateTaxIncome - (125000));
            } else if (stateTaxIncome > (100000)) {
              stateTax = (4697) + 0.05 * (stateTaxIncome - (100000));
            } else if (stateTaxIncome > (3000)) {
              stateTax = (90) + 0.0475 * (stateTaxIncome - (3000));
            } else if (stateTaxIncome > (2000)) {
              stateTax = (50) + 0.04 * (stateTaxIncome - (2000));
            } else if (stateTaxIncome > (1000)) {
              stateTax = (20) + 0.03 * (stateTaxIncome - (1000));
            } else {
              stateTax = 0.02 * stateTaxIncome;
            }
          }
        } else if (state === "MN") {
          if (checkBox.checked == true) {
            stateStanDeduct = 15050;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (276200)) {
              stateTax = (2129) + 0.0985 * (stateTaxIncome - (276200));
            } else if (stateTaxIncome > (158140)) {
              stateTax = (10176) + 0.0785 * (stateTaxIncome - (158140));
            } else if (stateTaxIncome > (39810)) {
              stateTax = (19444) + 0.0680 * (stateTaxIncome - (39810));
            } else {
              stateTax = 0.0535 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 12525;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (166040)) {
              stateTax = (11700) + 0.0985 * (stateTaxIncome - (166040));
            } else if (stateTaxIncome > (89440)) {
              stateTax = (5678) + 0.0785 * (stateTaxIncome - (89440));
            } else if (stateTaxIncome > (27230)) {
              stateTax = (1456) + 0.0680 * (stateTaxIncome - (27230));
            } else {
              stateTax = 0.0535 * stateTaxIncome;
            }
          }
        } else if (state === "MS") {
          if (checkBox.checked == true) {
            stateStanDeduct = 4600;
          } else {
            stateStanDeduct = 2300;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (10000)) {
            stateTax = (230) + 0.05 * (stateTaxIncome - (10000));
          } else if (stateTaxIncome > (5000)) {
            stateTax = (30) + 0.04 * (stateTaxIncome - (5000));
          } else if (stateTaxIncome > (4000)) {
            stateTax = 0.03 * (stateTaxIncome - (4000));
          } else {
            stateTax = 0;
          }
        } else if (state === "MO") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
          } else {
            stateStanDeduct = 12550;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (8584)) {
            stateTax = (277) + 0.0575 * (stateTaxIncome - (8584));
          } else if (stateTaxIncome > (7511)) {
            stateTax = (223) + 0.0550 * (stateTaxIncome - (7511));
          } else if (stateTaxIncome > (6438)) {
            stateTax = (175) + 0.0525 * (stateTaxIncome - (6438));
          } else if (stateTaxIncome > (5365)) {
            stateTax = (132) + 0.05 * (stateTaxIncome - (5365));
          } else if (stateTaxIncome > (4292)) {
            stateTax = (94) + 0.0475 * (stateTaxIncome - (4292));
          } else if (stateTaxIncome > (3291)) {
            stateTax = (62) + 0.04 * (stateTaxIncome - (3291));
          } else if (stateTaxIncome > (2146)) {
            stateTax = (35) + 0.03 * (stateTaxIncome - (2146));
          } else if (stateTaxIncome > (1073)) {
            stateTax = (14) + 0.03 * (stateTaxIncome - (1073));
          } else if (stateTaxIncome > (107)) {
            stateTax = (0) + 0.03 * (stateTaxIncome - (107));
          } else {
            stateTax = 0;
          }
        } else if (state === "MT") {
          if (checkBox.checked == true) {
            stateStanDeduct = 9580;
          } else {
            stateStanDeduct = 4790;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (18700)) {
            stateTax = (694) + 0.069 * (stateTaxIncome - (8584));
          } else if (stateTaxIncome > (14500)) {
            stateTax = (442) + 0.06 * (stateTaxIncome - (7511));
          } else if (stateTaxIncome > (11300)) {
            stateTax = (282) + 0.05 * (stateTaxIncome - (6438));
          } else if (stateTaxIncome > (8400)) {
            stateTax = (166) + 0.04 * (stateTaxIncome - (5365));
          } else if (stateTaxIncome > (5500)) {
            stateTax = (79) + 0.03 * (stateTaxIncome - (4292));
          } else if (stateTaxIncome > (3100)) {
            stateTax = (31) + 0.02 * (stateTaxIncome - (3291));
          } else {
            stateTax = 0.01 * stateTaxIncome;
          }
        } else if (state === "NE") {
          if (checkBox.checked == true) {
            stateStanDeduct = 14200;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (64430)) {
              stateTax = (2558) + 0.0684 * (stateTaxIncome - (64430));
            } else if (stateTaxIncome > (39990)) {
              stateTax = (1333) + 0.0501 * (stateTaxIncome - (39990));
            } else if (stateTaxIncome > (6660)) {
              stateTax = (163) + 0.0351 * (stateTaxIncome - (6660));
            } else {
              stateTax = 0.0246 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 7100;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (32210)) {
              stateTax = (1278) + 0.0684 * (stateTaxIncome - (32210));
            } else if (stateTaxIncome > (19990)) {
              stateTax = (666) + 0.0501 * (stateTaxIncome - (19990));
            } else if (stateTaxIncome > (3340)) {
              stateTax = (82) + 0.0351 * (stateTaxIncome - (3340));
            } else {
              stateTax = 0.0246 * stateTaxIncome;
            }
          }
        } else if (state === "NJ") {
          if (checkBox.checked == true) {
            stateStanDeduct = 0;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1000000)) {
              stateTax = (72657) + 0.1075 * (stateTaxIncome - (1000000));
            } else if (stateTaxIncome > (500000)) {
              stateTax = (27807) + 0.0897 * (stateTaxIncome - (500000));
            } else if (stateTaxIncome > (150000)) {
              stateTax = (5512) + 0.0637 * (stateTaxIncome - (150000));
            } else if (stateTaxIncome > (80000)) {
              stateTax = (1645) + 0.05525 * (stateTaxIncome - (80000));
            } else if (stateTaxIncome > (70000)) {
              stateTax = (1295) + 0.035 * (stateTaxIncome - (70000));
            } else if (stateTaxIncome > (50000)) {
              stateTax = (805) + 0.0245 * (stateTaxIncome - (50000));
            } else if (stateTaxIncome > (20000)) {
              stateTax = (280) + 0.0175 * (stateTaxIncome - (20000));
            } else {
              stateTax = 0.014 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 0;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1000000)) {
              stateTax = (74573) + 0.1075 * (stateTaxIncome - (1000000));
            } else if (stateTaxIncome > (500000)) {
              stateTax = (29723) + 0.0897 * (stateTaxIncome - (500000));
            } else if (stateTaxIncome > (150000 / 2)) {
              stateTax = (2651) + 0.0637 * (stateTaxIncome - (150000 / 2));
            } else if (stateTaxIncome > (80000 / 2)) {
              stateTax = (717) + 0.05525 * (stateTaxIncome - (80000 / 2));
            } else if (stateTaxIncome > (70000 / 2)) {
              stateTax = (542) + 0.035 * (stateTaxIncome - (70000 / 2));
            } else if (stateTaxIncome > (20000)) {
              stateTax = (280) + 0.0175 * (stateTaxIncome - (20000));
            } else {
              stateTax = 0.014 * stateTaxIncome;
            }
          }
        } else if (state === "NM") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (315000)) {
              stateTax = (15027) + 0.059 * (stateTaxIncome - (315000));
            } else if (stateTaxIncome > (24000)) {
              stateTax = (768) + 0.049 * (stateTaxIncome - (24000));
            } else if (stateTaxIncome > (16000)) {
              stateTax = (392) + 0.047 * (stateTaxIncome - (16000));
            } else if (stateTaxIncome > (8000)) {
              stateTax = (136) + 0.032 * (stateTaxIncome - (8000));
            } else {
              stateTax = 0.017 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 12550;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (210000)) {
              stateTax = (10010) + 0.059 * (stateTaxIncome - (210000));
            } else if (stateTaxIncome > (16000)) {
              stateTax = (504) + 0.049 * (stateTaxIncome - (16000));
            } else if (stateTaxIncome > (11000)) {
              stateTax = (269) + 0.047 * (stateTaxIncome - (11000));
            } else if (stateTaxIncome > (5500)) {
              stateTax = (93) + 0.032 * (stateTaxIncome - (5500));
            } else {
              stateTax = 0.017 * stateTaxIncome;
            }
          }
        } else if (state === "NY") {
          if (checkBox.checked == true) {
            stateStanDeduct = 16050;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (2155350)) {
              stateTax = (144905) + 0.0882 * (stateTaxIncome - (2155350));
            } else if (stateTaxIncome > (323200)) {
              stateTax = (19402) + 0.0685 * (stateTaxIncome - (323200));
            } else if (stateTaxIncome > (161550)) {
              stateTax = (9170) + 0.0633 * (stateTaxIncome - (161550));
            } else if (stateTaxIncome > (43000)) {
              stateTax = (2092) + 0.0597 * (stateTaxIncome - (43000));
            } else if (stateTaxIncome > (27900)) {
              stateTax = (1202) + 0.059 * (stateTaxIncome - (27900));
            } else if (stateTaxIncome > (23600)) {
              stateTax = (976) + 0.0525 * (stateTaxIncome - (23600));
            } else if (stateTaxIncome > (17150)) {
              stateTax = (686) + 0.045 * (stateTaxIncome - (17150));
            } else {
              stateTax = 0.04 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 8000;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (1077550)) {
              stateTax = (72166) + 0.0882 * (stateTaxIncome - (1077550));
            } else if (stateTaxIncome > (215400)) {
              stateTax = (13108) + 0.0685 * (stateTaxIncome - (215400));
            } else if (stateTaxIncome > (180650)) {
              stateTax = (4579) + 0.0633 * (stateTaxIncome - (180650));
            } else if (stateTaxIncome > (21400)) {
              stateTax = (1042) + 0.0597 * (stateTaxIncome - (21400));
            } else if (stateTaxIncome > (13900)) {
              stateTax = (599) + 0.059 * (stateTaxIncome - (13900));
            } else if (stateTaxIncome > (11700)) {
              stateTax = (484) + 0.0525 * (stateTaxIncome - (11700));
            } else if (stateTaxIncome > (8500)) {
              stateTax = (340) + 0.045 * (stateTaxIncome - (8500));
            } else {
              stateTax = 0.04 * stateTaxIncome;
            }
          }
        } else if (state === "ND") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (440600)) {
              stateTax = (9716) + 0.0290 * (stateTaxIncome - (440600));
            } else if (stateTaxIncome > (246700)) {
              stateTax = (4597) + 0.0264 * (stateTaxIncome - (246700));
            } else if (stateTaxIncome > (161950)) {
              stateTax = (2673) + 0.0227 * (stateTaxIncome - (161950));
            } else if (stateTaxIncome > (67050)) {
              stateTax = (737) + 0.0204 * (stateTaxIncome - (67050));
            } else {
              stateTax = 0.0110 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 12550;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (440600)) {
              stateTax = (10281) + 0.0290 * (stateTaxIncome - (440600));
            } else if (stateTaxIncome > (202650)) {
              stateTax = (3999) + 0.0264 * (stateTaxIncome - (202650));
            } else if (stateTaxIncome > (97150)) {
              stateTax = (1604) + 0.0227 * (stateTaxIncome - (197150));
            } else if (stateTaxIncome > (40125)) {
              stateTax = (441) + 0.0204 * (stateTaxIncome - (40125));
            } else {
              stateTax = 0.0110 * stateTaxIncome;
            }
          }
        } else if (state === "OH") {
          stateStanDeduct = 0;
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (221300)) {
            stateTax = (7826) + 0.04797 * (stateTaxIncome - (221300));
          } else if (stateTaxIncome > (110650)) {
            stateTax = (2943) + 0.04413 * (stateTaxIncome - (110650));
          } else if (stateTaxIncome > (88450)) {
            stateTax = (2099) + 0.03802 * (stateTaxIncome - (88450));
          } else if (stateTaxIncome > (44250)) {
            stateTax = (629) + 0.03326 * (stateTaxIncome - (44250));
          } else if (stateTaxIncome > (22150)) {
            stateTax = 0.0285 * (stateTaxIncome - (22150));
          } else {
            stateTax = 0;
          }
        } else if (state === "OK") {
          if (checkBox.checked == true) {
            stateStanDeduct = 12700;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (12200)) {
              stateTax = (255) + 0.05 * (stateTaxIncome - (12200));
            } else if (stateTaxIncome > (9800)) {
              stateTax = (159) + 0.04 * (stateTaxIncome - (9800));
            } else if (stateTaxIncome > (7500)) {
              stateTax = (90) + 0.03 * (stateTaxIncome - (7500));
            } else if (stateTaxIncome > (5000)) {
              stateTax = (40) + 0.02 * (stateTaxIncome - (5000));
            } else if (stateTaxIncome > (2000)) {
              stateTax = (10) + 0.01 * (stateTaxIncome - (2000));
            } else {
              stateTax = 0.005 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 6350;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (7200)) {
              stateTax = (171) + 0.05 * (stateTaxIncome - (7200));
            } else if (stateTaxIncome > (9800 / 2)) {
              stateTax = (79) + 0.04 * (stateTaxIncome - (9800 / 2));
            } else if (stateTaxIncome > (7500 / 2)) {
              stateTax = (90 / 2) + 0.03 * (stateTaxIncome - (7500 / 2));
            } else if (stateTaxIncome > (5000 / 2)) {
              stateTax = (40 / 2) + 0.02 * (stateTaxIncome - (5000 / 2));
            } else if (stateTaxIncome > (2000 / 2)) {
              stateTax = (10 / 2) + 0.01 * (stateTaxIncome - (2000 / 2));
            } else {
              stateTax = 0.005 * stateTaxIncome;
            }
          }
        } else if (state === "OR") {
          if (checkBox.checked == true) {
            stateStanDeduct = 4630;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (250000)) {
              stateTax = (21361) + 0.099 * (stateTaxIncome - (250000));
            } else if (stateTaxIncome > (18400)) {
              stateTax = (1096) + 0.0875 * (stateTaxIncome - (18400));
            } else if (stateTaxIncome > (7300)) {
              stateTax = (346) + 0.0675 * (stateTaxIncome - (7300));
            } else {
              stateTax = 0.0475 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 2315;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (250000 / 2)) {
              stateTax = (10680) + 0.099 * (stateTaxIncome - (250000 / 2));
            } else if (stateTaxIncome > (18400 / 2)) {
              stateTax = (548) + 0.0875 * (stateTaxIncome - (18400 / 2));
            } else if (stateTaxIncome > (7300 / 2)) {
              stateTax = (173) + 0.0675 * (stateTaxIncome - (7300 / 2));
            } else {
              stateTax = 0.0475 * stateTaxIncome;
            }
          }
        } else if (state === "RI") {
          if (checkBox.checked == true) {
            stateStanDeduct = 18100;
          } else {
            stateStanDeduct = 9050;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (150550)) {
            stateTax = (6489) + 0.0599 * (stateTaxIncome - (150550));
          } else if (stateTaxIncome > (66200)) {
            stateTax = (2482) + 0.0475 * (stateTaxIncome - (66200));
          } else {
            stateTax = 0.0375 * stateTaxIncome;
          }
        } else if (state === "SC") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
          } else {
            stateStanDeduct = 12550;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (15400)) {
            stateTax = (555) + 0.07 * (stateTaxIncome - (15400));
          } else if (stateTaxIncome > (12310)) {
            stateTax = (369) + 0.06 * (stateTaxIncome - (12310));
          } else if (stateTaxIncome > (9230)) {
            stateTax = (215) + 0.05 * (stateTaxIncome - (9230));
          } else if (stateTaxIncome > (6150)) {
            stateTax = (92) + 0.04 * (stateTaxIncome - (6150));
          } else if (stateTaxIncome > (3070)) {
            stateTax = 0.03 * (stateTaxIncome - (3070));
          } else {
            stateTax = 0;
          }
        } else if (state === "VT") {
          if (checkBox.checked == true) {
            stateStanDeduct = 12500;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (248350)) {
              stateTax = (15052) + 0.0875 * (stateTaxIncome - (248350));
            } else if (stateTaxIncome > (163000)) {
              stateTax = (8565) + 0.076 * (stateTaxIncome - (163000));
            } else if (stateTaxIncome > (67450)) {
              stateTax = (2259) + 0.066 * (stateTaxIncome - (67450));
            } else {
              stateTax = 0.0335 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 6250;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (204000)) {
              stateTax = (13214) + 0.0875 * (stateTaxIncome - (204000));
            } else if (stateTaxIncome > (97800)) {
              stateTax = (5143) + 0.076 * (stateTaxIncome - (97800));
            } else if (stateTaxIncome > (40350)) {
              stateTax = (1351) + 0.066 * (stateTaxIncome - (40350));
            } else {
              stateTax = 0.0335 * stateTaxIncome;
            }
          }
        } else if (state === "VA") {
          if (checkBox.checked == true) {
            stateStanDeduct = 9000;
          } else {
            stateStanDeduct = 4500;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (17000)) {
            stateTax = (720) + 0.0575 * (stateTaxIncome - (17000));
          } else if (stateTaxIncome > (5000)) {
            stateTax = (120) + 0.05 * (stateTaxIncome - (5000));
          } else if (stateTaxIncome > (3000)) {
            stateTax = (60) + 0.03 * (stateTaxIncome - (3000));
          } else {
            stateTax = 0.02 * stateTaxIncome;
          }
        } else if (state === "WV") {
          stateStanDeduct = 0;
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (60000)) {
            stateTax = (2775) + 0.065 * (stateTaxIncome - (60000));
          } else if (stateTaxIncome > (40000)) {
            stateTax = (1575) + 0.06 * (stateTaxIncome - (40000));
          } else if (stateTaxIncome > (25000)) {
            stateTax = (900) + 0.045 * (stateTaxIncome - (25000));
          } else if (stateTaxIncome > (10000)) {
            stateTax = (300) + 0.04 * (stateTaxIncome - (10000));
         } else {
            stateTax = 0.03 * stateTaxIncome;
          }
        } else if (state === "WI") {
          if (checkBox.checked == true) {
            stateStanDeduct = 20470;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (355910)) {
              stateTax = (21612) + 0.0765 * (stateTaxIncome - (355910));
            } else if (stateTaxIncome > (32330)) {
              stateTax = (1323) + 0.0627 * (stateTaxIncome - (32330));
            } else if (stateTaxIncome > (16160)) {
              stateTax = (572) + 0.0465 * (stateTaxIncome - (16160));
            } else {
              stateTax = 0.0354 * stateTaxIncome;
            }
          } else {
            stateStanDeduct = 11050;
            stateTaxIncome = income - stateStanDeduct;
            if (stateTaxIncome > (266930)) {
              stateTax = (16209) + 0.0765 * (stateTaxIncome - (266930));
            } else if (stateTaxIncome > (24250)) {
              stateTax = (993) + 0.0627 * (stateTaxIncome - (24250));
            } else if (stateTaxIncome > (12120)) {
              stateTax = (429) + 0.0465 * (stateTaxIncome - (12120));
            } else {
              stateTax = 0.0354 * stateTaxIncome;
            }
          }
        } else if (state === "DC") {
          if (checkBox.checked == true) {
            stateStanDeduct = 25100;
          } else {
            stateStanDeduct = 12550;
          }
          stateTaxIncome = income - stateStanDeduct;
          if (stateTaxIncome > (1000000)) {
            stateTax = (85025) + 0.0895 * (stateTaxIncome - (1000000));
          } else if (stateTaxIncome > (350000)) {
            stateTax = (28150) + 0.0875 * (stateTaxIncome - (350000));
         } else if (stateTaxIncome > (60000)) {
            stateTax = (3500) + 0.085 * (stateTaxIncome - (60000));
          } else if (stateTaxIncome > (40000)) {
            stateTax = (2200) + 0.065 * (stateTaxIncome - (40000));
          } else if (stateTaxIncome > (10000)) {
            stateTax = (400) + 0.06 * (stateTaxIncome - (10000));
          } else {
            stateTax = 0.04 * stateTaxIncome;
          }
        } else {
          stateTax = 0;
        }
 
        if (totalIncome > exemption) {
          totalAMT = (totalIncome - exemption) * (fedRateAMT + stateRateAMT);
        } else {
          totalAMT = 0;
        }
 
        if (totalAMT > (fedTax + stateTax)) {
          amt = totalAMT - (fedTax + stateTax);
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
            ['Regular Federal Income Tax', fedTax],
            ['Regular ' + state + ' Income Tax', stateTax],
            ['Total Regular Income Tax', fedTax + stateTax]
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
