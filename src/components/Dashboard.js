import React from 'react'
import {Container} from 'react-bootstrap'
import RoundedButton from "./RoundedButton"
import {Link} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import {GetStarted} from './Home'
import {  faFolder, faPlus, faUser, faUserAlt, faUserAltSlash, faUserAstronaut, faUserCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons'



export default function Dashboard() {
    const {currentUser} = useAuth()
    return (
        <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
             <div className="home-body">
        {/* Buttons Container */}
        <div
          className="grid-4-btn"
          style={{ width: "300px", height: "300px" }}
        >
            <Link to="/new-document">
            <RoundedButton hint="new" icon={faPlus}/>
            </Link>
            <RoundedButton hint="add writer" icon={faUserFriends}/>
            <RoundedButton hint="my files" icon={faFolder}/>
            <RoundedButton hint="account" icon={faUser}/>
        </div>
        <div className="verical-divider"></div>
        {/* Sign In Form */}
        {currentUser && <GetStarted/>}
      </div>
        </Container>
    )
}
