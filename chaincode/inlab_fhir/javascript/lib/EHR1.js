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
                checkingBalance: 5000,
                patientName: 'Alice',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'


            },
            {
                patientID: 'Bob99',
                checkingBalance: 5500000,
                patientName: 'Bob',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'Mary18',
                checkingBalance: 999000,
                patientName: 'Mary',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'Tony06',
                checkingBalance: 1000000,
                patientName: 'Tony',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'blackknight',
                checkingBalance: 1000000,
                patientName: 'Batman',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'purple',
                checkingBalance: 1000000,
                patientName: 'Michel',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'white',
                checkingBalance: 1000000,               
                patientName: 'Aarav',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'violet',
                checkingBalance: 1000000,
                patientName: 'Pari',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'indigo',
                checkingBalance: 1000000,
                patientName: 'Valeria',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
            {
                patientID: 'brown',
                checkingBalance: 1000000,
                patientName: 'Shotaro',
                resourceType: 'Patient',
                weight:'55 kg',
                Organization: 'Dongguk Univ Hospital',
                createDateTime: '2022-3-5',
                lastDataReadTime: '2022-3-5'

            },
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

    async createEHR(ctx, EHRNumber, patientID, checkingBalance, patientName,resourceType,weight,Organization,createDateTime,lastDataReadTime) {
        console.info('============= START : Create EHR ===========');

        const EHR = {
            patientID,
            docType: 'EHR',
            checkingBalance,
            patientName,
            resourceType,
            weight,
            Organization,
            createDateTime,
            lastDataReadTime
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

