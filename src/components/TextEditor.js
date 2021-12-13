import React, {useCallback, useEffect, useState} from 'react'
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import {io} from "socket.io-client";
import {useParams} from 'react-router-dom';

const TOOLBAR_OPTIONS = [
    [{header: [1,2,3,4,5,6,false]}],
    [{font:[]}],
    [{ list: 'ordered'}, { list: 'bullet' }],
    ["bold","italic","underline"],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub'}, { script: 'super' }],
    [{align: []}],
    ["image","blockquote","code-block"],
    ["clean"],
]

export default function TextEditor() {

    const {id: docId} = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    //create quill instance
   const wrapperRef = useCallback((wrapper) => {
       //check if wrapper exists
       if(wrapper == null) return;
       //cleanup
       wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
       const q = new Quill(editor,{theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS}});
       q.disable();
       q.setText("Loading Document....");
       setQuill(q);
       
    }, [])

    //Setup socket connection
    useEffect(() => {
        const s = io("https://blaqbox-docs.herokuapp.com/");
        setSocket(s);
        //cleanup
        return () => {
            s.disconnect();
        }
    }, [])

    //Send Quill changes
    useEffect(() => {
        if(socket == null || quill == null) return;
        const handler = (delta, oldDelta, source) => {
            if(source !== "user") return;
            socket.emit('send-changes',delta);
        }

        quill.on('text-change', handler)
        return () => {
            quill.off('text-change', handler)
        }
    }, [socket,quill])

    //Recieve Quill changes
    useEffect(() => {
        if(socket == null || quill == null) return;

        const handler = (delta) => {
            quill.updateContents(delta);
        }

        socket.on('recieve-changes', handler)
        return () => {
            socket.off('recieve-changes', handler)
        }
    }, [socket,quill])
    
    //Load Document
   useEffect(() => {
    if(socket ==  null || quill == null) return;

    socket.once("load-document", doc => {
        quill.setContents(doc);
        quill.enable();
    })

    //send doc id to the server
    socket.emit('get-document',docId);

   },[socket, quill, docId]); 

   const SAVE_INTERVAL_MS = 2000;

   useEffect(()=>{
    if(socket == null || quill == null) return;

    const interval = setInterval(()=>{
        socket.emit('save-document', quill.getContents());
    },SAVE_INTERVAL_MS)

    return () => {
        clearInterval(interval);
    }

   },[socket,quill])

    //Rendered Component
    return (
        <div className="container" ref={wrapperRef}>
            Text Thing
        </div>
    )
}
