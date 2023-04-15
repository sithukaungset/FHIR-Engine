/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });

async function main() {
    try {
        // load the network configuration
        // select the shard randomly
        const max = 3;
        const min = 1;
        const shardno = Math.floor(Math.random() * (max - min +1)+ min);
        console.log(shardno);
        if (shardno == 1){
            var shardname = 'mychannel';
            var org = 'org2.example.com';
            var connection = 'connection-org2.json';
            var id = 'Org2MSP';
            var caID = 'ca.org2.example.com';
            var aff = 'org2.department1';
        }
        else if (shardno == 2){
            var shardname = 'channelall';
            var org = 'org3.example.com';
            var connection = 'connection-org3.json';
            var id = 'Org3MSP';
            var caID = 'ca.org3.example.com';
            var aff = 'org3.department1';
            
        }
        else if (shardno == 3){
            var shardname= 'shard3';
            var org = 'org4.example.com';
            var connection = 'connection-org4.json';
            var id = 'Org4MSP';
            var caID = 'ca.org4.example.com';
            var aff = 'org4.department1';
            
        }

        console.log(`By random, Selected Shard is ${shardname}`);
        console.log(`Selected OrgMSP is ${id}`);

    
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations',org, connection);
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        console.log(ccpPath);

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[caID].url;
        const ca = new FabricCAServices(caURL);
        console.log(caURL);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const username =  prompt('Username : ');

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log(`An identity for the user ${username} already exists in the wallet`);
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: aff,
            enrollmentID: username,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: id,
            type: 'X.509',
            
        };
        await wallet.put(username, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${username} and imported it into the wallet`);





    } catch (error) {
        console.error(`Failed to register user ${username}: ${error}`);
        process.exit(1);
    }
}

main();


