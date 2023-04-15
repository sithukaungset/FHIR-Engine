/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';



const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });

async function main() {
    try {
        // load the network configuration
        const username =  prompt('Username : ');
        const carNumber = prompt('Car Number : ');
        const carOwner =  prompt('Car New Owner : '); 
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
     
        var shard = identity.mspId;
    
        
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

        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);


            return;
        }
        // Create a new gateway for connecting to our peer node.
        console.time("TimeTaken");
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
        
        await contract.submitTransaction('changeCarOwner', carNumber, carOwner);
        console.log('Commit Done for Sender');

        await gateway.disconnect();
        console.timeEnd("TimeTaken");

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

exports.commitSend = main();
