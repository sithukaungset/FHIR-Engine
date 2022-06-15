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
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'Bob99',
                checkingBalance: 5500000,
                patientName: 'Bob',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'Mary18',
                checkingBalance: 999000,
                patientName: 'Mary',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'Tony06',
                checkingBalance: 1000000,
                patientName: 'Tony',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'blackknight',
                checkingBalance: 1000000,
                patientName: 'Batman',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'purple',
                checkingBalance: 1000000,
                patientName: 'Michel',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'white',
                checkingBalance: 1000000,               
                patientName: 'Aarav',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'violet',
                checkingBalance: 1000000,
                patientName: 'Pari',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'indigo',
                checkingBalance: 1000000,
                patientName: 'Valeria',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
            {
                patientID: 'brown',
                checkingBalance: 1000000,
                patientName: 'Shotaro',
                resourceType: 'Patient',
                Organization: 'Dongguk Univ Hospital'

            },
        ];

        for (let i = 0; i < EHRs.length; i++) {
            EHRs[i].docType = 'EHR';
            await ctx.stub.putState('EHR' + i, Buffer.from(JSON.stringify(EHRs[i])));
            console.info('Added <--> ', EHRs[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryEHR(ctx, EHRNumber ) {    
        const accountAsBytes = await ctx.stub.getState(EHRNumber); // get the car from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${EHRNumber} does not exist`);
        }
        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();

    }

    async createEHR(ctx, EHRNumber, patientID, checkingBalance, patientName,resourceType,Organization) {
        console.info('============= START : Create EHR ===========');

        const EHR = {
            patientID,
            docType: 'EHR',
            checkingBalance,
            patientName,
            resourceType,
            Organization
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

    async changeAccountOwner(ctx, accountNumber, newcustomName) {
        console.info('============= START : changeCarOwner ===========');

        const accountAsBytes = await ctx.stub.getState(accountNumber); // get the account from chaincode state
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${accountNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        account.owner = newcustomName;

        await ctx.stub.putState(accountNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : changeAccountOwnerName ===========');
    }
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
        const sourceBal = parseInt(sourceacc.checkingBalance) - amount;
        sourceacc.checkingBalance = sourceBal ;
        const destBal = parseInt(destacc.checkingBalance) + parseInt(amount); 
        destacc.checkingBalance = destBal;
   

        await ctx.stub.putState(sourceAccount, Buffer.from(JSON.stringify(sourceacc)));
        await ctx.stub.putState(destAccount, Buffer.from(JSON.stringify(destacc)));
        console.info("============= END : sendPayment ===========");
    }


}

module.exports = EHR;

