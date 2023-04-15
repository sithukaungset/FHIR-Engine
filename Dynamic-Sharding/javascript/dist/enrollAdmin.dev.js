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

var path = require('path');

function main() {
  var ccpPath, ccp, caInfo, caTLSCACerts, ca, walletPath, wallet, identity, enrollment, x509Identity;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // load the network configuration
          ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
          ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8')); // Create a new CA client for interacting with the CA.

          caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
          caTLSCACerts = caInfo.tlsCACerts.pem;
          ca = new FabricCAServices(caInfo.url, {
            trustedRoots: caTLSCACerts,
            verify: false
          }, caInfo.caName); // Create a new file system based wallet for managing identities.

          walletPath = path.join(process.cwd(), 'wallet');
          _context.next = 9;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet(walletPath));

        case 9:
          wallet = _context.sent;
          console.log("Wallet path: ".concat(walletPath)); // Check to see if we've already enrolled the admin user.

          _context.next = 13;
          return regeneratorRuntime.awrap(wallet.get('admin'));

        case 13:
          identity = _context.sent;

          if (!identity) {
            _context.next = 17;
            break;
          }

          console.log('An identity for the admin user "admin" already exists in the wallet');
          return _context.abrupt("return");

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(ca.enroll({
            enrollmentID: 'admin',
            enrollmentSecret: 'adminpw'
          }));

        case 19:
          enrollment = _context.sent;
          x509Identity = {
            credentials: {
              certificate: enrollment.certificate,
              privateKey: enrollment.key.toBytes()
            },
            mspId: 'Org1MSP',
            type: 'X.509'
          };
          _context.next = 23;
          return regeneratorRuntime.awrap(wallet.put('admin', x509Identity));

        case 23:
          console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.error("Failed to enroll admin user \"admin\": ".concat(_context.t0));
          process.exit(1);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
}

main();