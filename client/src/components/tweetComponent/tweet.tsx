import React from "react";

export interface TweetInterface {
    username: string;
    text?: string;
}

export const Tweet = (props: TweetInterface): JSX.Element => {
    return (
        <div className="tweet">
            <h3 className="username">{props.username}</h3>
            <p className="text">{props.text}</p>
        </div>

    );
};