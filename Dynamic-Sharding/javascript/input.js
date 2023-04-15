// Assigning to exports will not modify module, must use module.exports


const prompt = require("prompt-sync")({ sigint: true });

const username =  prompt('Username : ');
const carNumber = prompt('Car Number : ');
const carBrand =  prompt('Car Brand : ');
const carModel =  prompt('Car Model : ');
const carColor =  prompt('Car Color : ');
const carOwner =  prompt('Car New Owner : '); 


module.exports = { Username: username,CarNumber: carNumber,CarBrand: carBrand,CarModel: carModel,CarColor: carColor,CarOwner: carOwner };
