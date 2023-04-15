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

        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const username = await prompt('Username : ');
         
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        console.log(identity.mspId);
        
        
        if (identity.mspId === 'Org2MSP'){
            var shardname = 'mychannel';
            var chaincode = 'fabcar' ;
            var org = 'org2.example.com';
            var connection = 'connection-org2.json';
        }else if (identity.mspId === 'Org3MSP'){
            var shardname = 'channelall';
            var chaincode = 'fabcar1' ;
            var org = 'org3.example.com';
            var connection = 'connection-org3.json';
        }else if (identity.mspId === 'Org4MSP'){
            var shardname = 'shard3';
            var chaincode = 'fabcar2' ;
            var org = 'org4.example.com';
            var connection = 'connection-org4.json';
        }else 
        {
            console.log('error');
            return;
        }

        console.log(shardname);
        console.log(chaincode);
        console.log(org);
        console.log(connection);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');

            return;
        }
        // Create a new gateway for connecting to our peer node.
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', org, connection);
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
        
        const sourceAccount = prompt('Source Accout Number : ');
        const destAccount = prompt('Destination Account Number : ');
        const amount = prompt('Amount of money : ');


        console.time("TimeTaken");
        await contract.submitTransaction('sendPayment', sourceAccount, destAccount, amount);
        console.log('Transaction has been submitted');
        // Disconnect from the gateway.
        await gateway.disconnect();
        console.timeEnd("TimeTaken");
        
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
