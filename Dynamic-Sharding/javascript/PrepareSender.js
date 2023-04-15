
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
        const username =  prompt('Username : ');
        const carNumber = prompt('Car Number : ');

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
          
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
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
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(shardname);

        // Get the contract from the network.
        const contract = network.getContract(chaincode);
        
        console.time("TimeTaken");
        const result = await contract.submitTransaction('queryCar', carNumber);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        console.log('Prepare Done for Sender');

        await gateway.disconnect();
        
        console.timeEnd("TimeTaken");
        return true;
 

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
          

exports.prepareSend = main();

