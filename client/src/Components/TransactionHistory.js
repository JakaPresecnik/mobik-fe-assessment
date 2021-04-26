import { Link } from 'react-router-dom';

function TransactionHistory ({location}) {
    let {id, name, transactions, accountOpened} = location.accountData;
    // It is not saved in the state as it doesn't need to be. When it is built the values don't change
    let balance = 0;

    return (
        <div>
            <h1>Transaction History</h1>
            <table>
                <caption>
                    <span>{name}</span>
                    <span>{id}</span>
                </caption>
                <thead>
                    <tr>
                        <th>balance</th>
                        <th>amount</th>
                        <th>type</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tran => {
                        balance += tran.amount
                        return (
                            <tr key={tran.date + '' + tran.amount}>
                                <td>{balance}</td>
                                <td>{tran.amount}</td>
                                <td>{tran.amount < 0 ? 'Withdraw' : tran.amount > 0 ? "Deposit" : "Other"}</td>
                                <td>{`${new Date(tran.date).getFullYear()}-${new Date(tran.date).getMonth()}-${new Date(tran.date).getDate()}`}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to='/'><button>Back</button></Link>
        </div>
    )
}

export default TransactionHistory;