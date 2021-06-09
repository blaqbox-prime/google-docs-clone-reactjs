import TextEditor from './TextEditor';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/documents/:id">
          <TextEditor/>
        </Route>
        <Route exact path="/">
          <Redirect to={`/documents/${uuidv4()}`}/>
        </Route>

      </Switch>
      
    
    </Router>
  );
}

export default App;
