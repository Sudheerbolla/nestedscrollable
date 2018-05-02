// var request = require('superagent');

var GetImageClass = {
  getImage: function(value) {
    res = ''
    if (value) {
      if (value === 'AC')
        res = ICONS.C_ICON_0
      else if (value === '+/-')
        res = ICONS.C_ICON_3
      else if (value === '%')
        res = ICONS.C_ICON_1
      else if (value === '/')
        res = ICONS.C_ICON_9
      else if (value === '*')
        res = ICONS.C_ICON_6
      else if (value === '-')
        res = ICONS.C_ICON_5
      else if (value === '+')
        res = ICONS.C_ICON_2
      else if (value === '=')
        res = ICONS.C_ICON_4
      else if (value === '+/-')
        res = ICONS.C_ICON_3
    }
    return res;
  }
}

module.exports = GetImageClass;

// area

// 1m2 = 10000cm2, 1.19599yards2, 10.7639100001464 feets2, 1550.0030400210816879inch2 , 1.5425 * m2
// 1cm2 = 0.0001m2, 0.000119599yards2, 0.00107639100000000011 feets2, 0.15500030400000003317inch2 , 1.5425 * 10000 cm2
// 1yard2 =0.836127m2, 8361.269999970038cm2, 8.999996124959999122 feets2, 1295.9994419942399873inch2 , 1.5425 * 10000 cm2
// 1feet2 =0.092902999999667099096m2, 929.02999999667099473cm2, 0.11111106327111111569 yard2, 143.99993799936001437inch2 , 1.5425 * 10000 cm2
// 1inches2 =0.0006451597222199103622m2, 6.4515972221991031432cm2, 0.00077160460604938272376 yard2, 0.0069444414544444438633feet2 , 1.5425 * 10000 cm2
// 1MSI =0.64m2, 6.4515972221991031432cm2, 0.00077160460604938272376 yard2, 0.0069444414544444438633inch2 , 1.5425 * 10000 cm2

// Convert Square Meters to MSI  - MSI = 1.5425 X m² (Square Meters)
// Convert MSI to Square Meters - Square Meters = .64 X MSI

// length
// 1m = 100cm, 1000mm, 1.09361yard, 3.28083foot, 39.36996inches, 1msi
// 1cm = 0.01m, 10mm, 0.0109361yard, 0.0328083foot, 0.3936996inches, 1msi
// 1mm = 0.001m, 0.1cm, 0.00109361yard, 0.00328083foot, 0.03936996inches, 1msi
// 1yard = 0.9144m, 91.44cm, 914.4mm, 3foot, 36inches, 1msi
// 1foot = 0.3048m, 30.48cm, 304.8mm, 0.333333yard, 12inches, 1msi
// 1inch = 0.0254m, 2.54cm, 25.4mm, 0.0277778yard, 0.0833334foot, 1msi
// 1msi = 100cm, 1000mm, 1.09361yard, 3.28083foot, 39.36996inches, 1msi

// thickness
// 1mm = 39.3701mils, 1000um
// 1mils = 0.0254mm, 25.4um
// 1um = 0.0393701mils, 0.00100000054mm

// mass
// 1kg = 2.20462pound, 35.274 ounce, 9.81 newton
// 1pound = 0.453592kg, 16 ounce, 4.44822 newton
// 1ounce = 0.0283495kg, 0.0625pound, 3.596943079091newton
// 1newton = 0.102kg, 0.224809pound, 3.60 ounce

// Force Of Glue

// 1n/m = 0.01n/cm, 0.00004 n/25mm, 2.590079180963938164e-6 kg/mils, 8.85075 pound/in, 141.612 ounce/in
// 1n/cm = 100n/m, 0.004 n/25mm, 0.00025900791809639378592 kg/mils, 0.571015 pound/in , 1.4161193227806 ounce/in
// 1n/25mm =40n/m, 0.4n/cm, 0.00010360316723855751979 kg/mils, 0.228406 pound/in , 0.0056644772911224 ounce/in
// 1kg/mils = 0.00024908891n/m, 0.024908891n/cm, 0.00980665n/25mm, 1.42233e-6 pound/in , 0.008786352733402 ounce/in
// 1pound/in =175.127n/m, 1.75127n/cm, 0.00700508 n/25mm, 0.000453592kg/mils , 16 ounce/in
// 1ounce/in =0.0070615518333333 n/m, 1.4161193227806 n/cm, 0.00566447729 n/25mm, 2.83495e-5 kg/mils, 0.0625 pound/in

// Price
// ['Preis / m2', 'Preis / yd2', 'Preis / ft2', 'Preis / MSI']

// 1m2 = 0.093 ft2, 0.836 yd2, 0.645 MSI
// 1ft2 = 10.764 m2, 9 yd2, 6.94 *val or val/0.144 MSI
// 1yd2 = 1.20 m2, 0.111 ft2, 0.77 * val or val/1.296 MSI
// 1MSI = 1.550 m2, 1.296 yd2, 0.144 ft2


// getCalculatedValue = (number, conv) => {
//   var outPut = '';
//   if (this.state.unit == 'm') {
//     if (conv === 'm')
//       outPut = number
//     else if (conv == 'cm') {
//       outPut = 100 * number
//     } else if (conv == 'mm') {
//       outPut = 1000 * number
//     } else if (conv == 'yard') {
//       outPut = 1.09361 * number
//     } else if (conv == 'feet') {
//       outPut = 3.28083 * number
//     } else if (conv == 'inches') {
//       outPut = 39.36996 * number
//     } else if (conv == 'MSI') {
//       outPut = number
//     }
//   } else if (this.state.unit == 'cm') {
//     if (conv === 'm')
//       outPut = 0.01 * number
//     else if (conv == 'cm') {
//       outPut = number
//     } else if (conv == 'mm') {
//       outPut = 10 * number
//     } else if (conv == 'yard') {
//       outPut = 0.0109361 * number
//     } else if (conv == 'feet') {
//       outPut = 0.0328083 * number
//     } else if (conv == 'inches') {
//       outPut = 0.3936996 * number
//     } else if (conv == 'MSI') {
//       outPut = number
//     }
//   } else if (this.state.unit == 'mm') {
//     if (conv === 'm')
//       outPut = 0.001 * number
//     else if (conv == 'cm') {
//       outPut = 0.1 * number
//     } else if (conv == 'mm') {
//       outPut = number
//     } else if (conv == 'yard') {
//       outPut = 0.00109361 * number
//     } else if (conv == 'feet') {
//       outPut = 0.00328083 * number
//     } else if (conv == 'inches') {
//       outPut = 0.03936996 * number
//     } else if (conv == 'MSI') {
//       outPut = number
//     }
//   } else if (this.state.unit == 'yard') {
//     if (conv === 'm')
//       outPut = 0.9144 * number
//     else if (conv == 'cm') {
//       outPut = 91.44 * number
//     } else if (conv == 'mm') {
//       outPut = 914.4 * number
//     } else if (conv == 'yard') {
//       outPut = number
//     } else if (conv == 'feet') {
//       outPut = 3 * number
//     } else if (conv == 'inches') {
//       outPut = 36 * number
//     } else if (conv == 'MSI') {
//       outPut = number
//     }
//   } else if (this.state.unit == 'feet') {
//     if (conv === 'm')
//       outPut = 0.3048 * number
//     else if (conv == 'cm') {
//       outPut = 30.48 * number
//     } else if (conv == 'mm') {
//       outPut = 304.8 * number
//     } else if (conv == 'yard') {
//       outPut = 0.333333 * number
//     } else if (conv == 'feet') {
//       outPut = number
//     } else if (conv == 'inches') {
//       outPut = 12 * number
//     } else if (conv == 'MSI') {
//       outPut = number
//     }
//   } else if (this.state.unit == 'inches') {
//     if (conv === 'm')
//       outPut = 0.0254 * number
//     else if (conv == 'cm') {
//       outPut = 2.54 * number
//     } else if (conv == 'mm') {
//       outPut = 25.4 * number
//     } else if (conv == 'yard') {
//       outPut = 0.0277778 * number
//     } else if (conv == 'feet') {
//       outPut = 0.0833334 * number
//     } else if (conv == 'inches') {
//       outPut = number
//     } else if (conv == 'MSI') {
//       outPut = number
//     }
//   } else if (this.state.unit == 'MSI') {
//     outPut = number
//   }
//   outPut = this.round(outPut, 3);
//   return outPut.toString();
// }
