import React, {useEffect, useState} from 'react';
import './App.css';
import { io } from "socket.io-client";
import { Tweet } from "./components/tweetComponent/tweet";

export interface TweetInterface {
    username: string;
    text?: string;
}

const socket = io(String(process.env.REACT_APP_HOST));

socket.on('connect', () => {
    console.log('Connected to server')
});

function App() {
    const [tweetsList, setTweetsList] = useState<TweetInterface[]>([]);

    useEffect(() => {
        socket.on('tweet', (tweet) => {
            setTweetsList([...tweetsList, {username: tweet.includes.users[0].username, text: tweet.data.text}])
        });
    })

    const tweets = tweetsList.map((tweet, idx) =>
        <Tweet key={idx} username={tweet.username} text={tweet.text} />
    )

    return (
        <div className="App">
            <div className="tweets">
                {tweets}
            </div>
        </div>
    );
}

export default App;