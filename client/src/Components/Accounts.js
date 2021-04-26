import { useEffect, useState } from "react"

function Accounts() {
    const [accounts , setAccounts] = useState({});

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
        .then(res => setAccounts(res));
    }, [])

    return (
        <div>
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
                                <td><button>view</button></td>
                                <td>{acc}</td>
                                <td>{accounts[acc].id}</td>
                                <td>{accounts[acc].balance}</td>
                                <td><button>withdraw</button></td>
                                <td><button>deposit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Accounts;