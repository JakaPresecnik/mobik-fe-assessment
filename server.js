const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// used as a placeholder for the data to be received from database
let accounts = {
    current: {
        id: 40013,
        name: "current",
        limit: -100000.00,
        minDeposit: 0.01,
        accountOpened: new Date(2021, 4, 01, 10, 00, 00),
        transactions: [
            {date: new Date(2021, 4, 1, 10, 00, 00), amount: 0.00},
            {date: new Date(2021, 4, 22, 10, 00, 00), amount: 50000.00},
            {date: new Date(2021, 4, 23, 10, 00, 00), amount: -20000.00}
        ]
    },
    savings: {
        id: 30078,
        name: "savings",
        limit: 1000.00,
        minDeposit: 1000.00,
        accountOpened: new Date(2021, 4, 01, 10, 00, 00),
        transactions: [
            {date: new Date(2021, 4, 1, 10, 00, 00), amount: 0.00},
            {date: new Date(2021, 4, 23, 10, 00, 00), amount: 9000.00},
            {date: new Date(2021, 4, 23, 10, 00, 00), amount: 20000.00}
        ]
    }
}

app.use(express.static(path.join(__dirname, 'client/build')));

const port = 5000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/getaccountsdata', (req, res) => {
    try {
        res.send(accounts);
    }catch (err) {
        console.log('Error:', err);
    }
});

app.post('/api/withdraw', (req, res) => {
    const {amount, account} = req.body;
    console.log('withdraw: ', req.body)
    try {
        accounts[account].transactions.push({
            date: new Date(),
            amount: -amount,
        })
    }catch(err) {
        console.log(err);
    }
})
// I could just do it in one path, but It will take time as I would need to re-write the already written functions
app.post('/api/deposit', (req, res) => {
    const {amount, account} = req.body;
    console.log('deposit: ', req.body)
    try {
        accounts[account].transactions.push({
            date: new Date(),
            amount: Number(amount)
        })
    }catch(err) {
        console.log(err);
    }
})