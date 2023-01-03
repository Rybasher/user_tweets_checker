import express from 'express';
import * as http from "http";
import cors from 'cors';
import { getRules, setRules, deleteRules, streamTweets } from "./tweetService";
import { PORT } from './config'

const app = express();
app.use(cors());
app.options('*', cors());

const socketIo = require('socket.io');
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', async () => {
    console.log('Client connected...')
    try {
        const currentRules = await getRules();
        console.log(currentRules);
        await deleteRules(currentRules)
        await setRules();
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    const filteredStream = streamTweets(io)

    let timeout = 0
    filteredStream.on('timeout', () => {
        // Reconnect on error
        console.warn('A connection error occurred. Reconnecting…')
        setTimeout(() => {
            timeout++
            streamTweets(io)
        }, 2 ** timeout)
        streamTweets(io)
    })
})

server.listen(PORT, () => console.log(`Listening on  port ${PORT}`));