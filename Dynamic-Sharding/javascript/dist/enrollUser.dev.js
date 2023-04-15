/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

var FabricCAServices = require('fabric-ca-client');

var _require = require('fabric-network'),
    Wallets = _require.Wallets;

var fs = require('fs');

var yaml = require('js-yaml');

var path = require('path');

var prompt = require("prompt-sync")({
  sigint: true
});

function main() {
  var max, min, shardno, shardname, org, connection, id, caID, aff, connectionProfile, ccp, caInfo, caTLSCACerts, ca, walletPath, wallet, username, userIdentity, enrollment, x509Identity;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          max = 3;
          min = 1;
          shardno = Math.floor(Math.random() * (max - min + 1) + min);
          console.log(shardno);

          if (shardno == 1) {
            shardname = 'mychannel';
            org = 'org2.example.com';
            connection = 'connection-org2.json';
            id = 'Org2MSP';
            caID = 'ca.org2.example.com';
            aff = 'org2.department1';
          } else if (shardno == 2) {
            shardname = 'channelall';
            org = 'org3.example.com';
            connection = 'connection-org3.json';
            id = 'Org3MSP';
            caID = 'ca.org3.example.com';
            aff = 'org3.department1';
          } else if (shardno == 3) {
            shardname = 'shard3';
            org = 'org4.example.com';
            connection = 'connection-org4.json';
            id = 'Org4MSP';
            caID = 'ca.org4.example.com';
            aff = 'org4.department1';
          }

          console.log("By random, Selected Shard is ".concat(shardname));
          console.log("Selected OrgMSP is ".concat(id)); // load the network configuration
          // let connectionProfile = yaml.safeLoad(fs.readFileSync('../../test-network/organizations/peerOrganizations/org2.example.com/connection-org2.yaml', 'utf8'));

          connectionProfile = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', org, connection);
          ccp = JSON.parse(fs.readFileSync(connectionProfile, 'utf8'));
          console.log(connectionProfile); // Create a new CA client for interacting with the CA.

          caInfo = ccp.certificateAuthorities[caID];
          caTLSCACerts = caInfo.tlsCACerts.pem;
          ca = new FabricCAServices(caInfo.url, {
            trustedRoots: caTLSCACerts,
            verify: false
          }, caInfo.caName); // Create a new file system based wallet for managing identities.

          walletPath = path.join(process.cwd(), 'wallet');
          _context.next = 17;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet(walletPath));

        case 17:
          wallet = _context.sent;
          console.log("Wallet path: ".concat(walletPath)); // Check to see if we've already enrolled the admin user.

          username = prompt('Username : '); // Check to see if we've already enrolled the user.

          _context.next = 22;
          return regeneratorRuntime.awrap(wallet.get(username));

        case 22:
          userIdentity = _context.sent;

          if (!userIdentity) {
            _context.next = 26;
            break;
          }

          console.log("An identity for the user ".concat(username, " already exists in the wallet"));
          return _context.abrupt("return");

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(ca.enroll({
            enrollmentID: 'user1',
            enrollmentSecret: 'user1pw'
          }));

        case 28:
          enrollment = _context.sent;
          x509Identity = {
            credentials: {
              certificate: enrollment.certificate,
              privateKey: enrollment.key.toBytes()
            },
            mspId: id,
            type: 'X.509'
          };
          _context.next = 32;
          return regeneratorRuntime.awrap(wallet.put(username, x509Identity));

        case 32:
          console.log("Successfully enrolled client user ".concat(username, " and imported it into the wallet"));
          _context.next = 39;
          break;

        case 35:
          _context.prev = 35;
          _context.t0 = _context["catch"](0);
          console.error("Failed to enroll client user \"isabella\": ".concat(_context.t0));
          process.exit(1);

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 35]]);
}

main();