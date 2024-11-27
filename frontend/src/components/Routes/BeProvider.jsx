import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const BeProvider = () => {

    const [ serviceTitle, setServiceTitle ] = useState('')
    const [ serviceDetails, setServiceDetails ] = useState('')
    const [ servicePrice, setServicePrice ] = useState('')
    const [ serviceCategory, setServiceCategory ] = useState('')
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar()

    const { id } = useParams()

    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:4000/api/services/${id}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  
                serviceTitle,      
                serviceDetails,   
                servicePrice,
                serviceCategory
                                })
        })
        const data = await res.json()
        if(data.success){
            enqueueSnackbar(data.data, {variant: 'success'})
            navigate('/')
        } else {
            enqueueSnackbar(data.data, {variant: 'error'})
        }
    }

return(
    <div className='white-ground'>
        <div className='container regiter'>
            <form method='post' action='' className='d-flex flex-column gap-2 w-50 mx-auto rounded p-3 sign-form mt-36'>
                <img src ={require("../../assets/brand.png")} alt="" className='mx-auto' />
                <label htmlFor="username"> اسم الخدمة </label>
                <input  type="text"
                        id='username' 
                        value={serviceTitle} 
                        onInput={(e) => {
                            setServiceTitle(e.target.value)
                }} 
                />
                <label htmlFor="userEmail"> تفاصيل الخدمة </label>
                <input  type="text" 
                        id='userEmail' 
                        value={serviceDetails} 
                        onInput={(e) => {
                            setServiceDetails(e.target.value)
                }} 
                />
                <label htmlFor="password"> سعر الخدمة </label>
                <input  type="number" 
                        id='password' 
                        value={servicePrice} onInput={(e) => {
                            setServicePrice(e.target.value)
                }} 
                />
                <label htmlFor="password"> نوع الخدمة </label>
                <input  type="text" 
                        id='password' 
                        value={serviceCategory} onInput={(e) => {
                            setServiceCategory(e.target.value)
                }} 
                />
                <hr className='mx-auto'/>
                <button  type="submit" 
                        className='submit hover:bg-[#1EAAAD] hover:text-white p-2 rounded' 
                        onClick={(e) =>{
                            e.preventDefault()
                            handleSubmit()
                            }}> إضافة الخدمة </button>
                <Link to={'/'} style={{textDecoration: 'none'}}> لاحقا </Link>
            </form>
        </div>
    </div>
)
}

export default BeProvider