/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class VideoStreaming extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const videos = [
            {
                id: '01',
                video_list_id: '001',
                resolution_id: '02',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_audio4.m4s',
                chunk_number: '4',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '02',
                video_list_id: '001',
                resolution_id: '02',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_4.m4s',
                chunk_number: '5',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de69g', 
            },
            {
                id: '03',
                video_list_id: '001',
                resolution_id: '02',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_audio3.m4s',
                chunk_number: '6',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '04',
                video_list_id: '001',
                resolution_id: '01',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_3.m4s',
                chunk_number: '7',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '05',
                video_list_id: '001',
                resolution_id: '03',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_audio2.m4s',
                chunk_number: '8',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '06',
                video_list_id: '001',
                resolution_id: '03',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_2.m4s',
                chunk_number: '9',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '07',
                video_list_id: '001',
                resolution_id: '02',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_audio1.m4s',
                chunk_number: '10',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '08',
                video_list_id: '001',
                resolution_id: '01',
                file_name: 'bbb_30fps_1920x1080_800k1625034699406_1.m4s',
                chunk_number: '11',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '09',
                video_list_id: '002',
                resolution_id: '02',
                file_name: 'bbb_30fps_1920x1080_800k1625034699407_audio5.m4s',
                chunk_number: '12',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
            {
                id: '10',
                video_list_id: '002',
                resolution_id: '01',
                file_name: 'bbb_30fps_1920x1080_800k1625034699407_5.m4s',
                chunk_number: '13',
                date: '2021-07-14',
                file_size: '25',
                hash_value: '16113a0d24251de6', 
            },
        ];

        for (let i = 0; i < videos.length; i++) {
            videos[i].docType = 'video';
            await ctx.stub.putState('VIDEO' + i, Buffer.from(JSON.stringify(videos[i])),null,2);
            console.info('Added <--> ', videos[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryVideo(ctx, videoNumber) {
        const videoAsBytes = await ctx.stub.getState(videoNumber); // get the car from chaincode state
        if (!videoAsBytes || videoAsBytes.length === 0) {
            throw new Error(`${videoNumber} does not exist`);
        }
        console.log(videoAsBytes.toString());
        return videoAsBytes.toString();
    }

    async createVideo(ctx, videoNumber, id, video_list_id, resolution_id, file_name, chunk_number, date, file_size, hash_value) {
        console.info('============= START : Inserting video chunk ===========');

        const video = {
            id,
            video_list_id, 
            resolution_id, 
            file_name, 
            chunk_number, 
            date, 
            file_size, 
            hash_value,
        };

        await ctx.stub.putState(videoNumber, Buffer.from(JSON.stringify(video)));
        console.info('============= END : Inserting video chunk ===========');
    }

    async queryAllVideos(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeChunkNumber(ctx, videoNumber, newchunk_number) {
        console.info('============= START : change Chunk Number ===========');

        const videoAsBytes = await ctx.stub.getState(videoNumber); // get the video chunk from chaincode state
        if (!videoAsBytes || videoAsBytes.length === 0) {
            throw new Error(`${videoNumber} does not exist`);
        }
        const video = JSON.parse(videoAsBytes.toString());
        video.chunk_number = newchunk_number;

        await ctx.stub.putState(videoNumber, Buffer.from(JSON.stringify(video)));
        console.info('============= END : change Chunk Number ===========');
    }

}

module.exports = VideoStreaming;
