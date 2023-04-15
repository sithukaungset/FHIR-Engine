/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const prepsend = require('./PrepareSender');
const prepreceive = require('./PrepareReceiver');
const comsend = require('./CommitSender.js');
const comreceive = require('./CommitReceiver.js');
console.time("TimeTaken");
prepsend.prepareSend;
prepreceive.prepare;


comsend.commitSend;
comreceive.commit;
console.timeEnd("TimeTaken");

/*
const confirm = require('./Commit.js');

console.log('Commit success' + confirm.commit);
console.log('Happy');
*/
