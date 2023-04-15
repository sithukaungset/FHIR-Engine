/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

var _require = require('fabric-network'),
    Gateway = _require.Gateway,
    Wallets = _require.Wallets;

var path = require('path');

var fs = require('fs');

var prompt = require('prompt');

function main() {
  var ccpPath, ccp, walletPath, wallet, identity, gateway, network, contract, result;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // load the network configuration
          ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
          ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8')); // Create a new file system based wallet for managing identities.

          walletPath = path.join(process.cwd(), 'wallet');
          _context.next = 6;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet(walletPath));

        case 6:
          wallet = _context.sent;
          console.log("Wallet path: ".concat(walletPath)); // Check to see if we've already enrolled the user.

          _context.next = 10;
          return regeneratorRuntime.awrap(wallet.get('appUser'));

        case 10:
          identity = _context.sent;

          if (identity) {
            _context.next = 15;
            break;
          }

          console.log('An identity for the user "appUser" does not exist in the wallet');
          console.log('Run the registerUser.js application before retrying');
          return _context.abrupt("return");

        case 15:
          // Create a new gateway for connecting to our peer node.
          gateway = new Gateway();
          _context.next = 18;
          return regeneratorRuntime.awrap(gateway.connect(ccp, {
            wallet: wallet,
            identity: 'appUser',
            discovery: {
              enabled: true,
              asLocalhost: true
            }
          }));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(gateway.getNetwork('mychannel'));

        case 20:
          network = _context.sent;
          // Get the contract from the network.
          contract = network.getContract('fabcar'); // Evaluate the specified transaction.
          // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
          // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')

          _context.next = 24;
          return regeneratorRuntime.awrap(contract.evaluateTransaction('queryAllCars'));

        case 24:
          result = _context.sent;
          console.log("Transaction has been evaluated, result is: ".concat(result.toString())); // Disconnect from the gateway.

          _context.next = 28;
          return regeneratorRuntime.awrap(gateway.disconnect());

        case 28:
          _context.next = 34;
          break;

        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](0);
          console.error("Failed to evaluate transaction: ".concat(_context.t0));
          process.exit(1);

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 30]]);
}

main();