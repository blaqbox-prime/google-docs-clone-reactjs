import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignInForm from "./SignInForm";
import RoundedButton from "./RoundedButton";
import {Link} from 'react-router-dom'
import "./Home.css";
import { faCheckSquare, faCoffee, faPlus } from '@fortawesome/free-solid-svg-icons'

function Home() {
  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
      <div className="home-body">
        {/* Buttons Container */}
        <div
          className="grid-4-btn"
          style={{ width: "300px", height: "300px" }}
        >
            <Link to="/new-document">
            <RoundedButton hint="new" icon={faPlus}/>
            </Link>
            <RoundedButton/>
            <RoundedButton/>
            <RoundedButton/>
        </div>
        <div className="verical-divider"></div>
        {/* Sign In Form */}
        <SignInForm />
      </div>
    </Container>
  );
}

export default Home;
