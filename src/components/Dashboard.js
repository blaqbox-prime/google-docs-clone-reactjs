import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import RoundedButton from "./RoundedButton";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GetStarted } from "./Home";
import "./document.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faTrash,
  faPlus,
  faUser,
  faUserAlt,
  faUserAltSlash,
  faUserAstronaut,
  faUserCircle,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();

  // get Documents on mount
  useEffect(() => {
    fetch(`https://blaqbox-docs.herokuapp.com/${currentUser.email}/documents`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocuments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

return (
  <Container
  className="d-flex align-items-center justify-content-center"
  style={{ minHeight: "100vh" }}
  >
      <div className="home-body">
        {showModal === true && <JoinCollab/>}
        {/* Buttons Container */}
        <div className="grid-4-btn" style={{ width: "300px", height: "300px" }}>
          <Link to="/new-document">
            <RoundedButton hint="new" icon={faPlus} />
          </Link>
          <RoundedButton hint="join doc" icon={faUserFriends}  onClick={() => {console.log(showModal); setShowModal(true);}}/>
          <RoundedButton hint="my files" icon={faFolder} />
          <RoundedButton hint="account" icon={faUser} />
        </div>
        <div className="verical-divider"></div>
        {/* List of docs */}
        {(currentUser && documents.length == 0) && <GetStarted />}
        {(currentUser && documents.length != 0) && <Documents docs={documents} currentUser={currentUser}/> }
      </div>
    </Container>
  );
}

export function Documents({ docs, currentUser }) {

  const deleteDocument = (doc) =>{
    fetch(`https://blaqbox-docs.herokuapp.com/${doc._id}/delete`,{
      method: 'DELETE',
    }).then(res => res.json()).then(data => console.log(data)).catch(error => console.error(error));
  }

  return (
    <div className="Documents">
      {docs.map((doc) => {
        return (
          <div className="d-flex align-items-center" key={doc._id}>
            <Link className="d-flex align- items-center" className="doc__link" to={`/documents/${doc._id}`}>
           <div className="doc d-flex align-items-center">
           <p className="doc__id">{doc._id}</p>
            <p className="doc__creator">{doc.creator == currentUser.email ? 'me' : doc.creator}</p>
           </div>
            </Link>
            <FontAwesomeIcon className="doc__dlt_icon" icon={faTrash} onClick={() => deleteDocument(doc)}/>
          </div>
        );
      })}
    </div>
  );
}

        function JoinCollab(){
        
          const [joinId, setjoinId] = useState('1679b81a-5c75-4a7b-8994-9a2a401b6122');
        
         return (
           <div className="joinCollabModal">
             <h2 className="joinCollab__title">Join Document</h2>
             <input type="text" className="joining_id"  value={joinId}/>
             {joinId.length == 36 && (<Link to={`/documents/${joinId}`}>
                <Button>Join Now</Button>
             </Link>)}
           </div>
         );
        }
