import React, {useState} from "react";
import { Alert, Button, Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {Link, useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons'

function Nav() {
    const [error,setError] = useState("");
    const { currentUser, signout } = useAuth();
    const history = useHistory();

    
    async function handleSignOut() {
        setError('')
        try{
            await signout()
            history.push("/")
        }
        catch{
            setError("failed to log out")
        }
    }

  return (
      <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="black-square"
            style={{
              minHeight: "25px",
              minWidth: "25px",
              border: "5px solid black",
              marginRight: "10px",
            }}
          ></div>
          Blaqbox Docs
        </div>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
    <Navbar.Text className="d-flex align-items-center">
      {currentUser &&  currentUser.email}
    
      <Button style={{margin:"0 20px", padding:"0"}} variant="link" onClick={handleSignOut}>Sign Out</Button>
    </Navbar.Text>
  </Navbar.Collapse>
    </Navbar>
    {error && <Alert variant="danger" dismissible>{error} </Alert>}
    </>
  );
}

export default Nav;
