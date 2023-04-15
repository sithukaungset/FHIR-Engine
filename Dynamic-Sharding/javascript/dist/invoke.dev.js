/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

var _require = require('fabric-network'),
    Gateway = _require.Gateway,
    Wallets = _require.Wallets;

var fs = require('fs');

var path = require('path');

var prompt = require("prompt-sync")({
  sigint: true
});

function main() {
  var walletPath, wallet, username, identity, shard, shardname, chaincode, org, connection, ccpPath, ccp, gateway, network, contract, carNumber, carBrand, carModel, carColor, carOwner;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // load the network configuration
          // Create a new file system based wallet for managing identities.
          walletPath = path.join(process.cwd(), 'wallet');
          _context.next = 4;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet(walletPath));

        case 4:
          wallet = _context.sent;
          console.log("Wallet path: ".concat(walletPath));
          _context.next = 8;
          return regeneratorRuntime.awrap(prompt('Username : '));

        case 8:
          username = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(wallet.get(username));

        case 11:
          identity = _context.sent;
          console.log(identity.mspId);
          _context.next = 15;
          return regeneratorRuntime.awrap(wallet.get(identity.mspId));

        case 15:
          shard = _context.sent;

          if (shard = 'Org2MSP') {
            shardname = 'mychannel';
            chaincode = 'fabcar';
            org = 'org2.example.com';
            connection = 'connection-org2.json';
          }

          if (shard = 'Org3MSP') {
            shardname = 'channelall';
            chaincode = 'fabcar1';
            org = 'org3.example.com';
            connection = 'connection-org3.json';
          }

          if (shard = 'Org4MSP') {
            shardname = 'shard3';
            chaincode = 'fabcar2';
            org = 'org4.example.com';
            connection = 'connection-org4.json';
          }

          console.log(shardname);
          console.log(chaincode);
          console.log(org);
          console.log(connection);

          if (identity) {
            _context.next = 27;
            break;
          }

          console.log('An identity for the user "appUser" does not exist in the wallet');
          console.log('Run the registerUser.js application before retrying');
          return _context.abrupt("return");

        case 27:
          // Create a new gateway for connecting to our peer node.
          ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', org, connection);
          ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
          gateway = new Gateway();
          _context.next = 32;
          return regeneratorRuntime.awrap(gateway.connect(ccp, {
            wallet: wallet,
            identity: username,
            discovery: {
              enabled: true,
              asLocalhost: true
            }
          }));

        case 32:
          _context.next = 34;
          return regeneratorRuntime.awrap(gateway.getNetwork(shardname));

        case 34:
          network = _context.sent;
          // Get the contract from the network.
          contract = network.getContract(chaincode); // Submit the specified transaction.
          // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
          // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')

          _context.next = 38;
          return regeneratorRuntime.awrap(prompt('Car Number : '));

        case 38:
          carNumber = _context.sent;
          _context.next = 41;
          return regeneratorRuntime.awrap(prompt('Car Brand : '));

        case 41:
          carBrand = _context.sent;
          _context.next = 44;
          return regeneratorRuntime.awrap(prompt('Car Model : '));

        case 44:
          carModel = _context.sent;
          _context.next = 47;
          return regeneratorRuntime.awrap(prompt('Car Color : '));

        case 47:
          carColor = _context.sent;
          _context.next = 50;
          return regeneratorRuntime.awrap(prompt('Car Owner : '));

        case 50:
          carOwner = _context.sent;
          _context.next = 53;
          return regeneratorRuntime.awrap(contract.submitTransaction('createCar', carNumber, carBrand, carModel, carColor, carOwner));

        case 53:
          console.log('Transaction has been submitted'); // Disconnect from the gateway.

          _context.next = 56;
          return regeneratorRuntime.awrap(gateway.disconnect());

        case 56:
          _context.next = 62;
          break;

        case 58:
          _context.prev = 58;
          _context.t0 = _context["catch"](0);
          console.error("Failed to submit transaction: ".concat(_context.t0));
          process.exit(1);

        case 62:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 58]]);
}

main();