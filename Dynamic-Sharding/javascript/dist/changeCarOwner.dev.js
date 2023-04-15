/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

var _require = require('console'),
    timeEnd = _require.timeEnd,
    time = _require.time;

var _require2 = require('fabric-network'),
    Gateway = _require2.Gateway,
    Wallets = _require2.Wallets;

var fs = require('fs');

var path = require('path');

var prompt = require("prompt-sync")({
  sigint: true
});

function main() {
  var walletPath, wallet, username, identity, shard, shardname, chaincode, ccpPath, ccp, gateway, network, contract, carNumber, carBrand, carModel, carColor, carOwner, newOwnerid, ccpPath1, ccp1, gateway1, shname, cc, newnetwork, newcontract;
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
          shard = identity.mspId;
          console.log(shard);

          if (!(shard === 'Org2MSP')) {
            _context.next = 20;
            break;
          }

          shardname = 'mychannel';
          chaincode = 'fabcar';
          _context.next = 32;
          break;

        case 20:
          if (!(shard === 'Org3MSP')) {
            _context.next = 25;
            break;
          }

          shardname = 'channelall';
          chaincode = 'fabcar1';
          _context.next = 32;
          break;

        case 25:
          if (!(shard === 'Org4MSP')) {
            _context.next = 30;
            break;
          }

          shardname = 'shard3';
          chaincode = 'fabcar2';
          _context.next = 32;
          break;

        case 30:
          console.log('Error');
          return _context.abrupt("return");

        case 32:
          console.log(shardname);
          console.log(chaincode);

          if (identity) {
            _context.next = 37;
            break;
          }

          console.log("An identity for the user ".concat(username, " does not exist in the wallet"));
          return _context.abrupt("return");

        case 37:
          // Create a new gateway for connecting to our peer node.
          ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
          ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
          gateway = new Gateway();
          _context.next = 42;
          return regeneratorRuntime.awrap(gateway.connect(ccp, {
            wallet: wallet,
            identity: username,
            discovery: {
              enabled: true,
              asLocalhost: true
            }
          }));

        case 42:
          _context.next = 44;
          return regeneratorRuntime.awrap(gateway.getNetwork(shardname));

        case 44:
          network = _context.sent;
          // Get the contract from the network.
          contract = network.getContract(chaincode); // Submit the specified transaction.
          // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
          // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')

          _context.next = 48;
          return regeneratorRuntime.awrap(prompt('Car Number : '));

        case 48:
          carNumber = _context.sent;
          _context.next = 51;
          return regeneratorRuntime.awrap(prompt('Car Brand : '));

        case 51:
          carBrand = _context.sent;
          _context.next = 54;
          return regeneratorRuntime.awrap(prompt('Car Model : '));

        case 54:
          carModel = _context.sent;
          _context.next = 57;
          return regeneratorRuntime.awrap(prompt('Car Color : '));

        case 57:
          carColor = _context.sent;
          _context.next = 60;
          return regeneratorRuntime.awrap(prompt('Car New Owner : '));

        case 60:
          carOwner = _context.sent;
          _context.next = 63;
          return regeneratorRuntime.awrap(wallet.get(carOwner));

        case 63:
          newOwnerid = _context.sent;
          console.log(newOwnerid.mspId);

          if (newOwnerid) {
            _context.next = 68;
            break;
          }

          console.log("An identity for the user ".concat(carOwner, " does not exist in the wallet"));
          return _context.abrupt("return");

        case 68:
          console.time("TimeTaken");
          console.time("TimeTaken1");
          ccpPath1 = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
          ccp1 = JSON.parse(fs.readFileSync(ccpPath1, 'utf8'));
          gateway1 = new Gateway();
          _context.next = 75;
          return regeneratorRuntime.awrap(gateway1.connect(ccp, {
            wallet: wallet,
            identity: carOwner,
            discovery: {
              enabled: true,
              asLocalhost: true
            }
          }));

        case 75:
          if (!(newOwnerid.mspId === identity.mspId)) {
            _context.next = 79;
            break;
          }

          process.exit(1);
          _context.next = 96;
          break;

        case 79:
          if (!(newOwnerid.mspId === 'Org2MSP')) {
            _context.next = 84;
            break;
          }

          shname = 'mychannel';
          cc = 'fabcar';
          _context.next = 96;
          break;

        case 84:
          if (!(newOwnerid.mspId === 'Org3MSP')) {
            _context.next = 89;
            break;
          }

          shname = 'channelall';
          cc = 'fabcar1';
          _context.next = 96;
          break;

        case 89:
          if (!(newOwnerid.mspId === 'Org4MSP')) {
            _context.next = 94;
            break;
          }

          shname = 'shard3';
          cc = 'fabcar2';
          _context.next = 96;
          break;

        case 94:
          console.log('error');
          return _context.abrupt("return");

        case 96:
          console.log(shname);
          console.log(cc);
          _context.next = 100;
          return regeneratorRuntime.awrap(gateway1.getNetwork(shname));

        case 100:
          newnetwork = _context.sent;
          newcontract = newnetwork.getContract(cc);
          _context.next = 104;
          return regeneratorRuntime.awrap(contract.submitTransaction('changeCarOwner', carNumber, carOwner));

        case 104:
          console.log('Transaction has been submitted for the sender shard');
          _context.next = 107;
          return regeneratorRuntime.awrap(gateway.disconnect());

        case 107:
          console.timeEnd("TimeTaken1");
          _context.next = 110;
          return regeneratorRuntime.awrap(newcontract.submitTransaction('createCar', carNumber, carBrand, carModel, carColor, carOwner));

        case 110:
          console.log('Transaction has been submitted for the receiver shard'); // Disconnect from the gateway.

          _context.next = 113;
          return regeneratorRuntime.awrap(gateway1.disconnect());

        case 113:
          console.timeEnd("TimeTaken");
          _context.next = 120;
          break;

        case 116:
          _context.prev = 116;
          _context.t0 = _context["catch"](0);
          console.error("Failed to submit transaction: ".concat(_context.t0));
          process.exit(1);

        case 120:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 116]]);
}

main();