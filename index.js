const express = require('express');
const app = express();
const crypto = require('crypto');

app.use(express.json());

const username = 'VHJvcHh6b250b3A='
const password = 'VHJvcHh6b250b3A='

let order = [];

app.post('/endp', (req, res) => {
    const auth = req.headers['authorization'];

    if (!auth) {
        return res.status(401).send({ error: 'invalid body' });
    }

    const baseCred = auth.split(' ')[1];
    const credentials = Buffer.from(baseCred, 'base64').toString('ascii');
    const [currentUser, currentPass] = credentials.split(':');

    if (currentUser !== username || password !== currentPass) {
        return res.status(403).send({ error: 'invalid login' });
    }

    const { author, message } = req.body;

    if (typeof author === 'string' && typeof message === 'string') {
        order.length = 0;

        order.push({ author, message });
        order.sort((a, b) => order.indexOf(a) - order.indexOf(b));

        res.status(200).send({ message: 'done' });
    } else {
        res.status(400).send({ error: 'invalid form data' });
    }
})

app.get('/keys', (req, res) => {
    res.send(order);
})
