/**
* input graph G and n, number of shards
  output = chunk assignment

  Step 1. Determine the number of shards
  If n is not given as an input parameter
    n = current number of shards
  
  Step 2. Generate a total of n, number of clusters and determine cluster head 

  Create total n , number of sets: h1, h2, h3, ..., h_n
  Move all chunks, i.e, c1, ..., c_n, of the set V to the priority queue V prime
  in which the chunk priority is determined by the sum of weights of the chunk's cross shard transaction edges

  For i , 1,,...., n of shards
    Select the chunk with the highest priority from V prime
    Add the select chunk in hi, and then delete it from V prime
  
  Step 3. Assign all remaining chunks to the cluster

  For c_k = each chunk in V prime
    For i = 1, ..., n of shards
      u_i(c) = calculate the utilization of the i-th shard with the chunks included in h_i
    
    For i = 1, ... , n of shards
      u_i(c) prime = calculate the utilization of the i-th shard with the chunks included in h_i U c_k

  Select a cluster satisfying arg max {u'(c) - u(c)}

  Step 4. Determine c vector = {c1,..ck,...,c_n}
  
  For i = 1,.., n of shards
    For c = each chunk in h_ i
        c = i
        

*/
const prompt = require("prompt-sync")({ sigint: true });
let h1, h2, h3
const n = prompt("Number of shards : ")


const v1 = prompt("Sum of the edges weight in chunk 1 : ")
const v2 = prompt("Sum of the edges weight in chunk 2 : ")
const v3 = prompt("Sum of the edges weight in chunk 3 : ")
const v4 = prompt("Sum of the edges weight in chunk 4 : ")
const v5 = prompt("Sum of the edges weight in chunk 5: ")
const v =  [v1,v2,v3,v4,v5]
const highestToLowest = v.sort((a,b) => b-a);
console.log(highestToLowest)
h1 = v[0]
h2 = [ v[1], v[2] ] 
h3 = [ v[3], v[4] ] 
const shard = [h1,h2,h3]
console.log(shard)


