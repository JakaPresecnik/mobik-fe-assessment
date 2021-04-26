const express = require('express');
const path = require('path');
const app = express();

// used as a placeholder for the data to be received from database
let accounts = {
    "current": {
        id: 40013,
        balance: 253000.00,
        accountOpened: new Date(2021, 4, 01, 10, 00, 00),
        transactions: [
            {date: new Date(2021, 4, 23, 10, 00, 00), amount: -20000.00}
        ]
    },
    "savings": {
        id: 30078,
        balance: 36000.00,
        accountOpened: new Date(2021, 4, 01, 10, 00, 00),
        transactions: [
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
})