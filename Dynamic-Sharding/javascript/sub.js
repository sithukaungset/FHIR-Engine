//sub.js
console.log("sub.js is running");

setTimeout(()=> {
    // subprocess sending message to parent
    process.send({from: "client"});
},2000);

// subprocess listening to message from parent 
process.on("message", (message)=> {
    console.log("SUBPROCESS got message from " + message.from);
});