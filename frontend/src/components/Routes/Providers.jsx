import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { PiChatsBold } from 'react-icons/pi'
import { useDispatch } from 'react-redux'

const Providers = () => {

  const dispatch = useDispatch()
  dispatch({type: 'setSelected', payload: 'providers'})

  const [ providers, setProviders ] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    fetch(`http://localhost:4000/api/users/providers/${JSON.parse(localStorage.getItem('currentUser')).id}`)
    .then( res => res.json() )
    .then( data => {setProviders(data.data)})
  },[])
  
  return (
    <div>
      <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
      </div>
    <Container>
    <div className='m-4 d-flex justify-evenly'>
    { providers.length > 0? 
    providers.map(provider => (
      <div key={provider._id}> 
        <div className='d-flex align-items-center gap-5 bg-[#02304d] text-white p-2 cursor-pointer' onClick={() => navigate(`/profile/${provider._id}`)}>
          <div className='w-25'> 
            <img src={provider.userImage} alt='' style={{objectFit: 'cover', margin: '0'}}/>
          </div>
          <h3 className='text-nowrap'>{provider.username}</h3>
          <PiChatsBold style={{fontSize: '30px'}} />
        </div>
        <div className='p-2 flex flex-col gap-2'>
          {provider.servicesProvided.map(service => (
          <div key={service._id} className='cursor-pointer p-2' style={{boxShadow: '0 8px 10px #0000001F'}}>
            <Link to={`/singleService/${service._id}`} >{service.serviceTitle}</Link>
          </div>
      ))}
        </div>
      </div>
    ))
    :
    <div>
      <h1>No Providers Found</h1>
      <Link to='/beProvider'> كن واحدا الآن </Link>
      </div>}
    </div>
    </Container>
      <Footer />
    </div>
  )
}

export default Providers