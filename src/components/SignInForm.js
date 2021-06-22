import React, { useRef, useState } from "react"; 
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

 function SignInForm() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [loading,setLoading] = useState(false)
    const { signin } = useAuth();
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
          setLoading(true);
          await signin(emailRef.current.value, passwordRef.current.value)
          history.push("/dashboard")
        } catch (e) {
            setError('Failed to sign in')
        }
    
        setLoading(false)
      }

    return (
        <Container
      className="d-flex align-items-center justify-content-center" style={{ maxWidth: "500px" }}
    >
      <div className="signUpForm w-100" style={{ maxWidth: "500px" }}>

      <div className="w-100 d-flex align-items-center justify-content-center">
      <div className="black-square" style={{minHeight:"100px", minWidth: "100px", border:"15px solid black"}}></div>
      </div>
        <Card style={{ border: "none" }}>
          <Card.Body>
            
            <h2 className="text-center mb-2">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              
              <Button
                className="w-100 mt-2"
                type="submit"
                style={{ backgroundColor: "#0d0d0d" }}
                disabled={loading}
              >
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-1">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
    )
}

export default SignInForm
