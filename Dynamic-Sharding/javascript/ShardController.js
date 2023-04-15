/* 
Sharding Controller
Dynamic Sharding Blockchain
*/

'use strict';

async function main(){
    try {
        // Start the sharding controller
        const shared_variable = false;







    }
  catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
    
        }



}

// thread
const child_proc = require("child_process");

console.log("running main.js");

const sub = child_proc.fork("./sub.js");

// Sending message to subprocess
sub.send({from : "parent"});

//listening to message from subprocess
sub.on("message", (message)=> {
    console.log("PARENT got message from " + message.from);
    sub.disconnect();
});


