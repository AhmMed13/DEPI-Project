import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const EditProfile = () => {
    const { id } = JSON.parse(localStorage.getItem('currentUser'))
    const [ user, setUser ] = useState({})

    
    
    useEffect(() => {
    fetch(`http://localhost:4000/api/users/${id}`)
    .then( res => res.json())
    .then( data => setUser(data.data))
    
}, [id])

const [ username, setUsername ] = useState(user?.username)
const [ userConfirmPassword, setUserConfirmPassword ] = useState('')
const [ userNewPassword, setUserNewPassword ] = useState('')
const [ userCountry, setUserCountry ] = useState(user?.userCountry)
const [ userPhoneNumber, setUserPhoneNumber ] = useState(user?.userPhoneNumber)
const [ userGender, setUserGender ] = useState(user?.userGender)





    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    
    const handleSubmit = async (e) => {
        e.preventDefault();



        const res = await fetch(`http://localhost:4000/api/users/user/${id}`, {
            method: 'PUT',
            body: {username, userConfirmPassword, userNewPassword, userCountry, userPhoneNumber, userGender} 
        });

        const data = await res.json();
        if (data.success) {
            enqueueSnackbar('Profile updated successfully', { variant: 'success' });
            localStorage.setItem('currentUser', JSON.stringify({id: user._id, name: user.username, email: user.userEmail, image: user.userImage}))
            navigate('/');
        } else {
            enqueueSnackbar('Failed to update profile', { variant: 'error' });
        }
    };




    return (
        <div className='white-ground'>
            <div className='container regiter'>
                <form className='d-flex flex-column gap-2 w-50 mx-auto rounded p-3 sign-form mt-28' onSubmit={handleSubmit}>
                    <img src={require("../../assets/brand.png")} alt="" className='mx-auto' />
                    <label htmlFor="username"> اسم المستخدم </label>
                    <input type="text" id='username' defaultValue={username} onChange={(e) => setUsername(e.target.value)} />

                    <div className='d-flex gap-2'>
                        <div className='d-flex flex-column w-50'>
                            <label htmlFor="password"> كلمة المرور الحالية </label>
                            <input type="password" id='password'  onChange={(e) => setUserConfirmPassword(e.target.value)} />
                        </div>
                        <div className='d-flex flex-column w-50'>
                            <label htmlFor="newpassword"> كلمة المرور الجديدة </label>
                            <input type="password" id='newpassword' onChange={(e) => setUserNewPassword(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className='d-flex flex-wrap justify-evenly'>
                        <div>
                            <label htmlFor="country"> الدولة </label><br />
                            <input type="text" id='country' defaultValue={userCountry} onChange={(e) => setUserCountry(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="phonenumber"> رقم الهاتف </label><br />
                            <input type="text" id='phonenumber' value={userPhoneNumber} onChange={(e) => setUserPhoneNumber(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="gender"> الجنس </label><br />
                            <input type="text" id='gender' value={userGender} onChange={(e) => setUserGender(e.target.value)} />
                        </div>
                    </div>
                    
                    
                    <hr className='mx-auto'/>
                    <button type="submit" className='submit hover:bg-[#1EAAAD] hover:text-white p-2 rounded'> تحديث الملف الشخصي </button>
                </form>
            </div>
        </div>
)
}

export default EditProfile;