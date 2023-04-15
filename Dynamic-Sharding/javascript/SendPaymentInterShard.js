/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

async function main(){

    try{
        // Prepare sync transaction for sender
        const prepsend = require('./PrepareSender');
        prepsend.prepareSend;
        
        //Prepare sync transaction for receiver
        const prepreceive = require('./PrepareReceiver');
        prepreceive.prepare;

        const resSend = prepsend.result;
        const resReceive = prepreceive.result;
        
        // if both Prepare sync transaction success 
        if (resSend === 'true' && resReceive === 'true'){
            console.log('Prepare Phase Completed.');
            const comsend = require('./CommitSender.js');
            const comreceive = require('./CommitReceiver.js');

            // Commit sync transaction for sender
            comsend.commitSend;

            // Commit sync transaction for receiver
            comreceive.commit;
            
            const comSend = comsend.result;
            const comReceive = comreceive.result;

            // if both Commit sync transaction success
            if (comSend === 'true' && comReceive === 'true'){
                console.log('Transaction has completed.');
            }
            // if sender failed, rollback receiver commit sync transaction
            else if (comSend === 'false' && comReceive === 'true'){
                const rbReceive = require('./RollbackReceiver.js');
                rbReceive.rollbackReceiver;
            }
            // if receiver failed, rollback sender commit sync transaction
            else if (comSend === 'true' && comReceive === 'false'){
                const rbSend = require('./RollbackSender.js');
                rbSend.rollbackSender;
            }
            // if both failed, abort the whole intershard transaction
            else {
                console.log('Commit Phase aborted.');
            }

        }
        // if one of two or both failed in prepare sync transaction
        else {
            console.log('Prepare Phase aborted.');
        }
    }
    catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
    
        }
    finally {

            // Disconnect from the blockchain network
            console.log('Disconnect from Fabric gateway.');
    
        }
    }

main().then(() => {
    console.log('Transaction Complete');
}).catch((e) => {
    console.log('Transaction Aborted');
    console.log(e);
    process.exit(-1);
});

