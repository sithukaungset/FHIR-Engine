/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class EHR extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const EHRs = [
            {
                AccountID: 'sithu27',
                DateTime: '2022-6-28',
                Organization: 'INLab',
                patientName: 'Sithu',
                Function: 'Create',
                data: 'Patient EHR',
                PHRhash: 'rQZRVpG4phj1aSuke5yDtzV3Q0z2FnDseAPjRDrQLRHoLd6Xt1Vgqzu7s',
                checkingBalance: 10000000,
                phonenumber: '010-6386-7320',

            },
            {
                AccountID: 'tony99',
                DateTime: '2022-6-28',
                Organization: 'INLab',
                patientName: 'Tony',
                Function: 'Create',
                data: 'Patient EHR',
                PHRhash: 'rQZRVpG4phj1aSuke5yDtzV3Q0z2FnDseAPjRDrQLRHoLd6Xt1Vgqzu7s',
                checkingBalance: 10000000,
                phonenumber: '010-6386-7320',
            },
            {
                AccountID: 'Alice27',
                DateTime: '2022-6-28',
                Organization: 'Dongguk Hospital',
                patientName: 'Alice',
                Function: 'Create',
                data: 'weight',
                PHRhash: 'rQZRVpG4phj1aSuke5yDtzV3Q0z2FnDseAPjRDrQLRHoLd6Xt1Vgqzu7s',
                checkingBalance: 10000000,
                phonenumber: '010-6386-7320',


            }
            ,
            {
                AccountID: 'Bob12',
                DateTime: '2022-6-28',
                Organization: 'Dongguk Hospital',
                patientName: 'Alice',
                Function: 'Create',
                data: 'Patient EHR',
                PHRhash: 'rQZRVpG4phj1aSuke5yDtzV3Q0z2FnDseAPjRDrQLRHoLd6Xt1Vgqzu7s',
                checkingBalance: 10000000,
                phonenumber: '010-6386-7320',

            }

        ];

        for (let i = 0; i < EHRs.length; i++) {
            EHRs[i].docType = 'EHR';
            await ctx.stub.putState('EHR' + i, Buffer.from(JSON.stringify(EHRs[i])));
            console.info('Added <--> ', EHRs[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryEHR(ctx, EHRNumber) {    
        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the EHR from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }

        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();

    }
    
    async createEHR(ctx, EHRNumber, AccountID, DateTime, Organization,patientName,Function,data,PHRhash,checkingBalance,phonenumber) {
        console.info('============= START : Create EHR ===========');

        const EHR = {
            AccountID,
            docType: 'EHR',
            DateTime,
            Organization,
            patientName,
            Function,
            data,
            PHRhash,
            checkingBalance,
            phonenumber,
        };

        await ctx.stub.putState(EHRNumber, Buffer.from(JSON.stringify(EHR)));
        console.info('============= END : Create EHR ===========');

    }
   
    async deleteEHR(ctx, EHRNumber) {

        await ctx.stub.deleteEHR(EHRNumber); // get the car from chaincode state
 
    }


    async deleteEHRs(ctx, EHRs) {
        const deleteEHRs = JSON.parse(EHRs);
        console.log(`All EHRs ${deleteEHRs}`);

        for (let EHRNumber of deleteEHRs) {
            console.log(`Deleting EHRs ${EHRNumber} from world state`)
            await ctx.stub.deleteState(EHRNumber);
        }
    }

    async queryEHRsByRangeWithPagination(ctx, startKey, batchSize) {
        let { iterator, metadata} = await ctx.stub.getStateByRangeWithPagination(startKey, undefined, parseInt(batchSize,10));

        let EHRResults = [];
        let results = await iterator.next();
        let iterate = results.value ? true: false;
        while (iterate) {
            if (results.value && results.value.value.toString()) {
                const Key = results.value.key;
                EHRResults.push(Key);
            }
            if (results.done) {
                iterate = false;
                await iterator.close();
                console.log('End of data.');
                console.info(EHRResults);
            } else {
                results = await iterator.next();
            }
        }
        return JSON.stringify(EHRResults);
    }

    async queryAllEHRs(ctx) {
        const startKey = 'EHR0';
        const endKey = 'EHR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async updateEHR(ctx, EHRNumber, newpatientName, newphonenumber) {
        console.info('============= START : updateEHR ===========');

        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the account from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        account.patientName = newpatientName;
        account.phonenumber = newphonenumber;

        await ctx.stub.putState(EHRNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : updateEHR ==========='); 
    }

    async chargeAccount(ctx,EHRNumber, chargeamount) {
        console.info('============= START : updateEHR ===========');

        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the account from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        
        const accBal = parseInt(account.checkingBalance) + parseInt(chargeamount); 
        account.checkingBalance = accBal;

        await ctx.stub.putState(EHRNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : updateEHR ===========');
    }



    // Request PHR data from owner
    async requestEHR(ctx,EHRNumber, doctor, maxtoken, reqdata  ) {
        console.info('============= START : requestEHR ===========');

        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the account from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        account.data = reqdata;
        

        await ctx.stub.putState(EHRNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : requestEHR ===========');
    }
    // Response PHR data from owner
    async responseEHR(ctx, EHRNumber, doctor, token, responsedata) {
        console.info('============= START : responseEHR ===========');

        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the request
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        account.data = responsedata;

        await ctx.stub.putState(EHRNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : responseEHR ===========');
    }




    // Invoke payment transactions
    async sendPayment(ctx, sourceAccount, destAccount, amount){
        console.info('============= START : sendPayment ===========');
        const accountAsBytes = await ctx.stub.getState(sourceAccount);
        const accAsBytes = await ctx.stub.getState(destAccount);
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${sourceAccount} does not exist`);
        }
        if (!accAsBytes || accAsBytes.length === 0) {
            throw new Error(`${destAccount} does not exist`);
        }
        const sourceacc = JSON.parse(accountAsBytes.toString());
        const destacc = JSON.parse(accAsBytes.toString());
        // Source Account balance and transfer
        const sourceBal = parseInt(sourceacc.checkingBalance) - amount;
        sourceacc.checkingBalance = sourceBal ;
        //sourceacc.ownership = '';
        
        // Destination Account balance and transfer
        const destBal = parseInt(destacc.checkingBalance) + parseInt(amount); 
        destacc.checkingBalance = destBal;
        //destacc.ownership = 'Nike Jordan' ;
   

        await ctx.stub.putState(sourceAccount, Buffer.from(JSON.stringify(sourceacc)));
        await ctx.stub.putState(destAccount, Buffer.from(JSON.stringify(destacc)));
        console.info("============= END : sendPayment ===========");
    }
    /**
     * Query history of a commercial paper
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
    */
     async queryHistory(ctx, issuer, paperNumber) {

        // Get a key to be used for History query

        let query = new QueryUtils(ctx, 'org.papernet.paper');
        let results = await query.getAssetHistory(issuer, paperNumber); // (cpKey);
        return results;

    }


}

module.exports = EHR;


