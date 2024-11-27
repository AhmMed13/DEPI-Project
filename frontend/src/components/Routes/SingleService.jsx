import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Button, Container } from 'react-bootstrap'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { useSnackbar } from 'notistack'

const SingleService = () => {
    const { id } = useParams()
    const [ service, setService ] = useState({})

    const { enqueueSnackbar } = useSnackbar()

    useEffect(()=>{
        fetch(`http://localhost:4000/api/services/${id}`)
        .then( res => res.json())
        .then( data=> setService(data.data))
    },[id])

    const buyService = async(id) => {    
        const res = await fetch(`http://localhost:4000/api/services/${id}/${JSON.parse(localStorage.getItem('currentUser')).id}`)
      const data = await res.json()
      
      if(data.success){
        enqueueSnackbar(data.data, {variant: 'success'})
    }else {
        enqueueSnackbar(data.data, {variant: 'error'})
    }
      }
return (
    <div>
        <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
        </div>

        <Container className='d-flex my-4 p-3 bg-[#eee] gap-5 text-end'>
            {/* <div className="d-flex flex-col gap-5 justify-center">
                <div>
                    <img src={service.provider.userImage} alt="" />
                </div>
                <h1>{service.provider.username}</h1>
            </div> */}
            <div className="d-flex flex-col">
                <div> عنوان الخدمة:  {service.serviceTitle}</div>
                <div> سعر الخدمة:  {service.servicePrice}</div>
                <div> قسم الخدمة:  {service.serviceCategory}</div>
                <div> تفاصيل الخدمة:   {service.serviceDetails}</div>
            </div>
            <div>
                <Button className='btn-success' onClick={()=>buyService(service._id)}><MdOutlineAddShoppingCart /></Button>
            </div>
        </Container>
        <Footer />
    </div>
)
}

export default SingleService