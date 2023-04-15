
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
        const carOwner =  prompt('Car New Owner : ');
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        const identity = await wallet.get(carOwner);
        if (!identity) {
            console.log(`An identity for the user ${carOwner} does not exist in the wallet`);
            return;
        }

        var shard = identity.mspId;
        console.time("TimeTaken");
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
        console.log(`The reciever ${carOwner} resides in ${shardname} and chaincode required is ${chaincode}`);
 
        console.log('Prepare done for Receiver')
        console.timeEnd("TimeTaken");



    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

exports.prepare = main();
