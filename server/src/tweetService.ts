import needle from "needle";
import { RulesResponse } from "./intefaces";
import { rulesURL, streamURL, rules, TOKEN } from "./config";

export async function getRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

export async function setRules() {
    const data = {
        add: rules
    }
    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}



export async function deleteRules(rules: RulesResponse) {
    if (!Array.isArray(rules.data)) {
        return null
    }
    const data = {
        delete: {
            ids: rules.data.map((rule) => rule.id)
        }
    }

    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

// @ts-ignore
export function streamTweets(socket) {
    const stream = needle.get(streamURL, {

        headers: {
            Authorization: `Bearer ${TOKEN}`
        }

    });

    stream.on('data', (data) => {
        try {
            const json = JSON.parse(data);
            socket.emit('tweet', json);
        } catch (error) {}
    });
    return stream;
}