import { Route, Switch } from 'react-router';
import './App.css';
import Accounts from './Components/Accounts';
import TransactionHistory from './Components/TransactionHistory';
import './styles.sass';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Accounts}/>
        <Route path='/transactionhistory' component={TransactionHistory} />
      </Switch>
    </div>
  );
}

export default App;
