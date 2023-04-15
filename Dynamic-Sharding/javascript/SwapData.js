/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });
let txID;
let res;



async function main(){
    const read = require('./ReadSwapData');
    res = await read.read;
   

    
    const del = require('./DeleteSwapData');
    
    txID = await del.prepare;
    console.log(txID);

    
    try{

 
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const username = await prompt('New Shard : ');

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
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', org, connection);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        
        const gateway = new Gateway();

        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        

        
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(shardname);

        // Get the contract from the network.
        const contract = network.getContract(chaincode);
        const accountID = prompt('Account ID : ');
        const customerID = prompt('Customer ID : ');
        const checkingBalance = prompt('Checking Balance : ');
        const customName = prompt('Name of customer : ');
  
        const history = txID;
        console.log(history);
        
        const transaction = contract.createTransaction('createSwapBlock');
        const result = await transaction.submit(accountID, customerID, checkingBalance, customName, history);
        console.log('Document has been swapped.', result.toString());
        console.log('Transaction has been submitted');
        gateway.disconnect();
    }

    catch (error){
        console.log(`Error processing transactions. ${error}`);
        console.log(error.stack);

}
finally{
    console.log('Disconnect from Fabric network');   
}
}
 
main().then(() => {
    console.log('Transaction Complete');
        
}).catch((e) => {
            console.log('Transaction Aborted');
            console.log(e);
            process.exit(-1);
        });

 


        
