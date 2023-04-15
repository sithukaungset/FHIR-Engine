"use strict";

var yaml = require('js-yaml');

var _require = require('fabric-network'),
    Wallets = _require.Wallets,
    Gateway = _require.Gateway;

var path = require("path");

var fs = require("fs");

var finished;

function main() {
  var ccpPath, ccp, walletPath, wallet, identity, gateway, network, listener, options;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Set up the wallet - just use Org2's wallet (isabella)
          ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
          ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8')); // Create a new gateway for connecting to our peer node.

          walletPath = path.join(process.cwd(), 'wallet');
          _context2.next = 6;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet(walletPath));

        case 6:
          wallet = _context2.sent;
          console.log("Wallet path: ".concat(walletPath));
          _context2.next = 10;
          return regeneratorRuntime.awrap(wallet.get('sithu'));

        case 10:
          identity = _context2.sent;

          if (identity) {
            _context2.next = 15;
            break;
          }

          console.log('An identity for the user "appUser" does not exist in the wallet');
          console.log('Run the registerUser.js application before retrying');
          return _context2.abrupt("return");

        case 15:
          gateway = new Gateway();
          _context2.next = 18;
          return regeneratorRuntime.awrap(gateway.connect(ccp, {
            wallet: wallet,
            identity: 'sithu',
            discovery: {
              enabled: true,
              asLocalhost: true
            }
          }));

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap(gateway.getNetwork('mychannel'));

        case 20:
          network = _context2.sent;
          // Get the contract from the network.
          // connect to the gateway
          // Listen for blocks being added, display relevant contents: in particular, the transaction inputs
          finished = false;

          listener = function listener(event) {
            var i, inputArgs, tx_id, txTime, inputData, j, inputArgPrintable, keyData, l, endorsers, k;
            return regeneratorRuntime.async(function listener$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (event.blockData !== undefined) {
                      for (i in event.blockData.data.data) {
                        if (event.blockData.data.data[i].payload.data.actions !== undefined) {
                          inputArgs = event.blockData.data.data[i].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args; // Print block details

                          console.log('----------');
                          console.log('Block:', parseInt(event.blockData.header.number), 'transaction', i); // Show ID and timestamp of the transaction

                          tx_id = event.blockData.data.data[i].payload.header.channel_header.tx_id;
                          txTime = new Date(event.blockData.data.data[i].payload.header.channel_header.timestamp).toUTCString(); // Show ID, date and time of transaction

                          console.log('Transaction ID:', tx_id);
                          console.log('Timestamp:', txTime); // Show transaction inputs (formatted, as may contain binary data)

                          inputData = 'Inputs: ';

                          for (j = 0; j < inputArgs.length; j++) {
                            inputArgPrintable = inputArgs[j].toString().replace(/[^\x20-\x7E]+/g, '');
                            inputData = inputData.concat(inputArgPrintable, ' ');
                          }

                          console.log(inputData); // Show the proposed writes to the world state

                          keyData = 'Keys updated: ';

                          for (l in event.blockData.data.data[i].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes) {
                            // add a ' ' space between multiple keys in 'concat'
                            keyData = keyData.concat(event.blockData.data.data[i].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes[l].key, ' ');
                          }

                          console.log(keyData); // Show which organizations endorsed

                          endorsers = 'Endorsers: ';

                          for (k in event.blockData.data.data[i].payload.data.actions[0].payload.action.endorsements) {
                            endorsers = endorsers.concat(event.blockData.data.data[i].payload.data.actions[0].payload.action.endorsements[k].endorser.msp, ' ');
                          }

                          console.log(endorsers); // Was the transaction valid or not?
                          // (Invalid transactions are still logged on the blockchain but don't affect the world state)

                          if (event.blockData.metadata.metadata[2][i] !== 0) {
                            console.log('INVALID TRANSACTION');
                          }
                        }
                      }
                    }

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          options = {
            type: 'full',
            startBlock: 1
          };
          _context2.next = 26;
          return regeneratorRuntime.awrap(network.addBlockListener(listener, options));

        case 26:
          if (finished) {
            _context2.next = 31;
            break;
          }

          _context2.next = 29;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return setTimeout(resolve, 5000);
          }));

        case 29:
          _context2.next = 26;
          break;

        case 31:
          gateway.disconnect();
          _context2.next = 38;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](0);
          console.error('Error: ', _context2.t0);
          process.exit(1);

        case 38:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 34]]);
}

void main();