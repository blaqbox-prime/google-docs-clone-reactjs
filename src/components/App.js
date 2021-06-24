import TextEditor from "./TextEditor";
import "./App.css";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Nav from "./Navbar";
import { Container } from "react-bootstrap";

function App() {
  return (
    
      <Router>
        <AuthProvider>
        <Container><Nav/></Container>
        <Switch>
          <Route path="/documents/:id">
            <TextEditor />
          </Route>

        <PrivateRoute exact path="/dashboard" component={Dashboard}/>

          <Route path="/signup" component={SignUp}/>
           
          <Route exact path="/new-document">
            <Redirect to={`/documents/${uuidv4()}`}/>
          </Route>
          <Route exact path="/">
            <Home/>
            {/* <Redirect to="/signup" /> */}
          </Route>
        </Switch>
        </AuthProvider>
      </Router>
    
  );
}

export default App;
