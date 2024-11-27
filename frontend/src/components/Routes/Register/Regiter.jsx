import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import './Regiter.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';


const Regiter = () => {

    const [ username, setUsername ] = useState('')
    const [ userEmail, setUserEmail ] = useState('')
    const [ userPassword, setUserPassword ] = useState('')
    const [ isProvider, setIsProvider ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async () => {

        const res = await fetch('http://localhost:4000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  
                                    userEmail,      
                                    userPassword,   
                                    username
                                })
        })
        const data = await res.json()        
        if(data.success){
            enqueueSnackbar(data.data, {variant: 'success'})
            localStorage.setItem('currentUser', JSON.stringify(data.body))
            dispatch({type: 'autherizeUser', payload: data.body})
            if(isProvider){
                navigate(`/beProvider/${data.body._id}`)
            }else {
                navigate(`/`)
            }
        }else {
            enqueueSnackbar(data.data, {variant: 'error'})
        }
}


    return (
    <div className='white-ground'>
        <div className='container regiter'>
            <form method='post' action='' className='d-flex flex-column gap-2 w-50 mx-auto rounded p-3 sign-form mt-36'>
                <img src ={require("../../../assets/brand.png")} alt="" className='mx-auto' />
                <label htmlFor="username"> اسم المستخدم </label>
                <input  type="text"
                        id='username' 
                        value={username} 
                        onInput={(e) => {
                            setUsername(e.target.value)
                }} 
                />
                <label htmlFor="userEmail"> البريد الالكترونى </label>
                <input  type="text" 
                        id='userEmail' 
                        value={userEmail} 
                        onInput={(e) => {
                            setUserEmail(e.target.value)
                }} 
                />
                <label htmlFor="password"> كلمة المرور </label>
                <input  type="password" 
                        id='password' 
                        value={userPassword} onInput={(e) => {
                            setUserPassword(e.target.value)
                }} 
                />
                <div>
                    <label htmlFor='providing'  className='mx-3'> هل تريد تقديم خدماتك للمستخدمين؟ </label>
                    <input type='checkbox' name='providing' checked={isProvider} onChange={ (e) => {
                        setIsProvider(e.target.checked)
                    }} />
                </div>
                <hr className='mx-auto'/>
                <button  type="submit" 
                        className='submit hover:bg-[#1EAAAD] hover:text-white p-2 rounded' 
                        onClick={(e) =>{
                            e.preventDefault()
                            handleSubmit()
                            }}> أنشأ حسابك </button>
                <div style={{fontSize: '13px'}}> لديك حساب بالفعل؟  <Link to={'/login'} style={{textDecoration: 'none'}}> سجل الآن </Link> </div>
            </form>
        </div>
    </div>
    )
}

export default Regiter