import { IoIosSend } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { Container, InputGroup } from 'react-bootstrap'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Chat = () => {
    
    const dispatch = useDispatch()
    const [ conversations, setConversations ] = useState([])
    const [ message, setMessage ] = useState('')
    const { selectedConversation, messages } = useSelector(state => state)
    const { id } = JSON.parse(localStorage.getItem('currentUser'))
    
    useEffect(()=>{
        dispatch({type: 'setSelected', payload: 'chat'})
        fetch(`http://localhost:4000/api/users/conversatios/${id}`)
        .then(res=>res.json())
        .then(data=> setConversations(data.data))
    }, [])

    const fetchMessages = async (recieverId) => {
        const res = await fetch(`http://localhost:4000/api/messages/${id}/${recieverId}`)
        const data = await res.json()
        dispatch({type: 'setMessages', payload: data})
    }

    const sendMessage = async (message) => {
        const res = await fetch(`http://localhost:4000/api/messages/send/${id}/${selectedConversation._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message})
        })
        const data = await res.json()
        setMessage('')
        fetchMessages(selectedConversation._id)
    }
    return (
    <>
    <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
    </div>
    <div>
        <Container className='d-flex py-4' style={{height: '500px'}}>
            <div className="chats w-25 d-flex flex-column gap-3 p-2 bg-[#02304d]" style={{overflow: 'auto', borderRadius: '0 20px 20px 0'}}>
                { conversations? conversations.map( (conversation) => (
                    <div key={conversation._id} className={`d-flex cursor-pointer rounded-lg ${selectedConversation && selectedConversation._id === conversation._id && 'bg-sky-500'} `} style={{borderBottom: '2px solid #1EAAAD'}} 
                    onClick={()=> {
                    dispatch({type: 'setSelectedConversation', payload: conversation})
                    fetchMessages(conversation._id)
                    }}>
                        <div className='w-25'>
                            <img src={'http://localhost:4000' + conversation.userImage} alt="" className='rounded-circle ratio ratio-1*1 w-full'/>
                        </div>
                        <div className='px-3 text-white w-75 text-end'>
                            <h5>{ conversation.username }</h5>
                        </div>
                    </div>
                )): <h1>NO Conversations For Now</h1> }
            </div>
            <div className='w-75 pt-3 flex justify-between flex-col' style={{backgroundImage: 'linear-gradient(to right, rgb(41, 177, 190), rgb(107, 121, 185))', borderRadius: '20px 0 0 20px'}}>
                { selectedConversation? 
                <>
                <div className="p-4 flex align-items-center justify-center gap-5 h-11" style={{borderBottom: '3px solid #02304d'}}>
                    <div>
                        <img src={'http://localhost:4000' + selectedConversation.userImage} alt="" />
                    </div>
                    <h1 className='p-0'>{selectedConversation.username}</h1>
                </div>

                <div className="overflow-auto">
                    {messages? messages.map(message => (
                        <div key={message._id} className={`w-100 chat chat-${message.senderId===id?'end':'start'}`}>
                            <div className={`chat-bubble chat-bubble-${message.senderId===id?'info':'accent'}`}>{message.message}</div>
                        </div>
                    ))
                :
                <>
                <h1>no messages for this chat.</h1></>}
                </div>

                <div>
                <InputGroup>
            <Button variant="outline-secondary" id="button-addon2" className="rounded bg-black" onClick={() => sendMessage(message)}>
                <IoIosSend />
            </Button>
            <Form.Control
            placeholder="أكتب رسالة..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            className="rounded"
            value={message}
            onInput={(e)=>{
                setMessage(e.target.value)
            }}
            />
            </InputGroup>
                </div> 
                </>
                :
                <div>
                    <h1> Select a conversation</h1></div>}
                </div>
        </Container>
    <Footer />
    </div>
    </>
)
}

export default Chat