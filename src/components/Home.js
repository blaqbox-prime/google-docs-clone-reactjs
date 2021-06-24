import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignInForm from "./SignInForm";
import RoundedButton from "./RoundedButton";
import {Link} from 'react-router-dom'
import "./Home.css";
import {useAuth} from "../contexts/AuthContext"
import { faCheckSquare, faCoffee, faFile, faFolder, faPlus, faUser, faUserAlt, faUserAltSlash, faUserAstronaut, faUserCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const {currentUser} = useAuth()
  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
      <div className="home-body">
        {/* Sign In Form */}
        <SignInForm />
        <div className="verical-divider"></div>
        {/* Welcome */}
        <Welcome/>
      </div>
    </Container>
  );
}


export default Home;

export function GetStarted() {

    return (
        <div className="text-center">
            <img src="images/undraw_my_files_swob.png" width="500px" alt="undraw_my_files_swob"/>
            <h2>Start Your Document Collaboration Today.</h2>
        </div>
    )
}

export function Welcome() {

  const logoStyle = {
    width:"30px",
    height:"30px",
    border: "5px solid #0d0d0d",
    margin: "0 10px",
  }

  return (
      <div className="text-center justify-content-center" >
          <img src="images/undraw_Cloud_docs_re_xjht.png" width="400px" alt="undraw_my_files_swob"/>
          <div className="d-flex justify-content-center align-items-center">
          <div className="" style={logoStyle}></div>
          <h2> Blaqbox Cloud Docs.</h2>
          </div>
      </div>
  )
}

