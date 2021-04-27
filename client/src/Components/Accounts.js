import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
import {deposit, withdraw} from './depositWithdraw';

function Accounts() {
    const [accounts , setAccounts] = useState({});
    const [balance, setBalance] = useState({})
    const [loaded, setLoaded] = useState(false)

    const retrieveAccountsData = async () => {
        const res = await fetch('/api/getaccountsdata');
        try {
            const data = await res.json();
            return data;
        }catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        retrieveAccountsData()
        .then(res => {
            setAccounts(res)
            // used this instead of more correct option I use to use, because there was a bug and I can't waste time trying to fix it.
            let placeholderBalance = {}
            Object.keys(res).forEach(acc => {
                let balanceCalc = 0;
                
                res[acc].transactions.forEach(tr => {
                    balanceCalc += tr.amount
                })
                placeholderBalance[acc] = balanceCalc;
            })
            setBalance(placeholderBalance);
        });
        setLoaded(true);
        
    }, []);

    return !loaded ? 'loading' : (
        <div className="content">
            <h1>Accounts</h1>

            <table>
                <caption>Summary</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Type</th>
                        <th>ID</th>
                        <th>Balance</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(accounts).map(acc => (
                            <tr key={acc}>
                                <td>
                                    <NavLink to={{pathname: '/transactionhistory', accountData: accounts[acc]}}>
                                        <button>view</button>
                                    </NavLink>
                                </td>
                                <td>{acc}</td>
                                <td>{accounts[acc].id}</td>
                                <td>{balance[acc]}</td>
                                <td><button onClick={e => withdraw(acc, balance[acc], accounts[acc].limit)}>withdraw</button></td>
                                <td><button onClick={e => deposit(acc, accounts[acc].minDeposit)}>deposit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Accounts;