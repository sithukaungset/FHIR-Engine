/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });

async function main() {
    try {

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

        // load the network configuration
        // let connectionProfile = yaml.safeLoad(fs.readFileSync('../../test-network/organizations/peerOrganizations/org2.example.com/connection-org2.yaml', 'utf8'));

        const connectionProfile = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations',org, connection);
        const ccp = JSON.parse(fs.readFileSync(connectionProfile, 'utf8'));
        console.log(connectionProfile);
       
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[caID];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const username =  prompt('Username : ');

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log(`An identity for the user ${username} already exists in the wallet`);
            return;
        }


        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'user1', enrollmentSecret: 'user1pw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: id,
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        console.log(`Successfully enrolled client user ${username} and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to enroll client user "isabella": ${error}`);
        process.exit(1);
    }
}

main();
