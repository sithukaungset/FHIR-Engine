
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
        const carNumber = prompt('Car Number : ');
        const carBrand =  prompt('Car Brand : ');
        const carModel =  prompt('Car Model : ');
        const carColor =  prompt('Car Color : ');
        const carOwner =  prompt('Car New Owner : '); 
        
        // Create a new file system based wallet for managing identities.
        console.time("TimeTaken");
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        const identity = await wallet.get(carOwner);
        if (!identity) {
            console.log(`An identity for the user ${carOwner} does not exist in the wallet`);
            return;
        }

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

        // Create a new gateway for connecting to our peer node.
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: carOwner, discovery: { enabled: true, asLocalhost: true } });
        
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(shardname);
        
        // Get the contract from the network.
        const contract = network.getContract(chaincode);
        
        
        await contract.submitTransaction('createCar', carNumber,carBrand, carModel, carColor, carOwner);
        console.log('Commit Done for Receiver');

        await gateway.disconnect();
        console.timeEnd("TimeTaken");
        
        

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

exports.commit = main();
