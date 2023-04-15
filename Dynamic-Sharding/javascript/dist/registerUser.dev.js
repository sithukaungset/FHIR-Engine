/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

var _require = require('fabric-network'),
    Wallets = _require.Wallets;

var FabricCAServices = require('fabric-ca-client');

var fs = require('fs');

var path = require('path');

var prompt = require("prompt-sync")({
  sigint: true
});

function main() {
  var ccpPath, ccp, caURL, ca, walletPath, wallet, _username, max, min, shardno, shard, userIdentity, adminIdentity, provider, adminUser, secret, enrollment, x509Identity;

  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // load the network configuration
          ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
          ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8')); // Create a new CA client for interacting with the CA.

          caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
          ca = new FabricCAServices(caURL); // Create a new file system based wallet for managing identities.

          walletPath = path.join(process.cwd(), 'wallet');
          _context.next = 8;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet(walletPath));

        case 8:
          wallet = _context.sent;
          console.log("Wallet path: ".concat(walletPath));
          _context.next = 12;
          return regeneratorRuntime.awrap(prompt('Username : '));

        case 12:
          _username = _context.sent;
          console.log("Username is ".concat(_username));
          max = 3;
          min = 1;
          shardno = Math.floor(Math.random() * (max - min + 1) + min);
          console.log(shardno);

          if (shardno == 1) {
            shard = 'mychannel';
          } else if (shardno == 2) {
            shard = 'channelall';
          } else if (shardno == 3) {
            shard = 'shard3';
          }

          console.log(shard); // Check to see if we've already enrolled the user.

          _context.next = 22;
          return regeneratorRuntime.awrap(wallet.get(_username));

        case 22:
          userIdentity = _context.sent;

          if (!userIdentity) {
            _context.next = 26;
            break;
          }

          console.log("An identity for the user ".concat(_username, " already exists in the wallet"));
          return _context.abrupt("return");

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(wallet.get('admin'));

        case 28:
          adminIdentity = _context.sent;

          if (adminIdentity) {
            _context.next = 33;
            break;
          }

          console.log('An identity for the admin user "admin" does not exist in the wallet');
          console.log('Run the enrollAdmin.js application before retrying');
          return _context.abrupt("return");

        case 33:
          // build a user object for authenticating with the CA
          provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
          _context.next = 36;
          return regeneratorRuntime.awrap(provider.getUserContext(adminIdentity, 'admin'));

        case 36:
          adminUser = _context.sent;
          _context.next = 39;
          return regeneratorRuntime.awrap(ca.register({
            affiliation: 'org1.department1',
            enrollmentID: _username,
            role: 'client'
          }, adminUser));

        case 39:
          secret = _context.sent;
          _context.next = 42;
          return regeneratorRuntime.awrap(ca.enroll({
            enrollmentID: _username,
            enrollmentSecret: secret
          }));

        case 42:
          enrollment = _context.sent;
          x509Identity = {
            credentials: {
              certificate: enrollment.certificate,
              privateKey: enrollment.key.toBytes()
            },
            mspId: 'Org1MSP',
            type: 'X.509'
          };
          _context.next = 46;
          return regeneratorRuntime.awrap(wallet.put(_username, x509Identity));

        case 46:
          console.log("Successfully registered and enrolled admin user ".concat(_username, " and imported it into the wallet"));
          _context.next = 53;
          break;

        case 49:
          _context.prev = 49;
          _context.t0 = _context["catch"](0);
          console.error("Failed to register user ".concat(username, ": ").concat(_context.t0));
          process.exit(1);

        case 53:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 49]]);
}

main();