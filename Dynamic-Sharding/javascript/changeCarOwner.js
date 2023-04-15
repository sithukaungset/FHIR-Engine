/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { timeEnd, time } = require('console');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });

async function main() {
    try {
        // load the network configuration

        
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const username = await prompt('Username : ');
         
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        console.log(identity.mspId);
        var shard = identity.mspId;
        console.log(shard);
        
        if (shard === 'Org2MSP'){
            var shardname = 'mychannel';
            var chaincode = 'fabcar' ;

        }else if (shard === 'Org3MSP'){
            var shardname = 'channelall';
            var chaincode = 'fabcar1' ;

        }else if (shard === 'Org4MSP'){
            var shardname = 'shard3';
            var chaincode = 'fabcar2' ;

        }
        else {
            console.log('Error');
            return;
        }
        console.log(shardname);
        console.log(chaincode);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);


            return;
        }
        // Create a new gateway for connecting to our peer node.
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });


        
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(shardname);

        // Get the contract from the network.
        const contract = network.getContract(chaincode);

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        
        const carNumber = await prompt('Car Number : ');
        const carBrand = await prompt('Car Brand : ');
        const carModel = await prompt('Car Model : ');
        const carColor = await prompt('Car Color : ');

        const carOwner = await prompt('Car New Owner : ');  
        const newOwnerid = await wallet.get(carOwner);
        console.log(newOwnerid.mspId);
        if (!newOwnerid) {
            console.log(`An identity for the user ${carOwner} does not exist in the wallet`);
            return;
        }
        console.time("TimeTaken");
        console.time("TimeTaken1");


        const ccpPath1 = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp1 = JSON.parse(fs.readFileSync(ccpPath1, 'utf8'));
        
        const gateway1 = new Gateway();
        await gateway1.connect(ccp, { wallet, identity: carOwner, discovery: { enabled: true, asLocalhost: true } });

        
        if(newOwnerid.mspId === identity.mspId){
            process.exit(1);

        }
        
        else if (newOwnerid.mspId === 'Org2MSP'){
            var shname = 'mychannel';
            var cc = 'fabcar' ;

        }
        else if (newOwnerid.mspId === 'Org3MSP'){
            var shname = 'channelall';
            var cc = 'fabcar1' ;

        }
        else if (newOwnerid.mspId === 'Org4MSP'){
            var shname = 'shard3';
            var cc = 'fabcar2' ;

        }
        else{
            console.log('error');
            return;
        } 

        console.log(shname);
        console.log(cc);
        const newnetwork = await gateway1.getNetwork(shname);
        const newcontract = newnetwork.getContract(cc);
        
        await contract.submitTransaction('intershardPrepareSender', carNumber, carBrand, carModel, carColor, carOwner);
        console.log('Prepare Done for Sender');

        await gateway.disconnect();
        console.timeEnd("TimeTaken1");

        await newcontract.submitTransaction('intershardPrepareReceiver', carOwner);
        console.log('Prepare Done for Receiver');

        await gateway1.disconnect();
        
        console.timeEnd("TimeTaken");
        
        await contract.submitTransaction('intershardCommitSender', carNumber, carBrand, carModel, carColor, carOwner);
        console.log('Commit Done for Sender');


        await gateway.disconnect();
        console.timeEnd("TimeTaken1");



        await newcontract.submitTransaction('intershardCommitReceiver', carNumber, carBrand, carModel, carColor, carOwner);
        console.log('Commit Done for Receiver');
        // Disconnect from the gateway.

        await gateway1.disconnect();
        
        console.timeEnd("TimeTaken");

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
