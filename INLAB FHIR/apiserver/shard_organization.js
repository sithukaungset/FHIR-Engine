/**
* input graph G 
  output = number of shards and chunk assignment

  number of shards, n = from 1 to current total shards according to Byzantine fault nodes (3f + 1)

  For i = 1,..,n 
    c = Chunk_Assignment (G, i)
    Calculate the overall utilization in (12) with the given c

  Determine n and c maximizing the overall utilization

*/

const prompt = require("prompt-sync")({ sigint: true });

function removeSmallest(arr) {
  var min = Math.min.apply(null, arr);
  return arr.filter((e) => {return e != min});
}

console.log(removeSmallest([2, 1, 3, 4, 5, 1]))