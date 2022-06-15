/**
* Zipf distribution
https://mir-s3-cdn-cf.behance.net/project_modules/1400/206d10112684331.601947d6d3636.jpg

*/

const prompt = require("prompt-sync")({ sigint: true });

function removeSmallest(arr) {
  var min = Math.min.apply(null, arr);
  return arr.filter((e) => {return e != min});
}

console.log(removeSmallest([2, 1, 3, 4, 5, 1]))