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
                patientID: 'Alice27',
                DateTime: '2022-3-5',
                Organization: 'Dongguk Hospital',
                patientName: 'Alice',
                Function: 'Create',
                data: 'Patient EHR'

            },
            {
                patientID: 'Alice27',
                DateTime: '2022-5-2',
                Organization: 'KHPI',
                patientName: 'Alice',
                Function: 'Read',
                data: 'Patient EHR'

            },
            {
                patientID: 'Alice27',
                DateTime: '2022-7-6',
                Organization: 'Dongguk Hospital',
                patientName: 'Alice',
                Function: 'Update',
                data: 'weight'
            }
            ,
            {
                patientID: 'Alice27',
                DateTime: '2022-9-12',
                Organization: 'Dongguk Hospital',
                patientName: 'Alice',
                Function: 'Delete',
                data: 'Patient EHR'
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
        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the car from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }

        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();

    }

    async createEHR(ctx, EHRNumber, patientID, DateTime, Organization,patientName,Function,data) {
        console.info('============= START : Create EHR ===========');

        const EHR = {
            patientID,
            docType: 'EHR',
            DateTime,
            Organization,
            patientName,
            Function,
            data
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

    async updateEHR(ctx, EHRNumber, newweight) {
        console.info('============= START : updateEHR ===========');

        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the account from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        account.weight = newweight;

        await ctx.stub.putState(EHRNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : updateEHR ===========');
    }
    // Query transactions

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

