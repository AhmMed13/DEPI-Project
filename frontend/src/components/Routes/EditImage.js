import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormData from "form-data"
const EditImage = () => {
    const { id } = JSON.parse(localStorage.getItem('currentUser'))
    const [ user, setUser ] = useState({})

useEffect(() => {
    fetch(`http://localhost:4000/api/upload/${id}`)
    .then( res => res.json())
    .then( data => setUser(data.data))
}, [id])


const [profileImage, setProfileImage] = useState(null); // File state for image




    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to handle file upload
        const formData = new FormData();


        // Append the image file if selected
        if (profileImage) {
            formData.append('Images', profileImage);
        } else {
          enqueueSnackbar('please upload an image', { variant: 'error' })
        }

        const res = await fetch(`http://localhost:4000/api/upload/${id}`, {
            method: 'PUT',
            body: formData // Send FormData instead of JSON
        });
        console.log(profileImage.name)
        const data = await res.json();
        if (data.success) {
            enqueueSnackbar('Profile updated successfully', { variant: 'success' });
            localStorage.setItem('currentUser', JSON.stringify({id: user._id, name: user.username, email: user.userEmail, image: profileImage?.name}))
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
                    <label htmlFor='image'> الصورة الشخصية </label>
                    <input type='file' id='image' onChange={(e) => setProfileImage(e.target.files[0])} />
                    
                    <hr className='mx-auto'/>
                    <button type="submit" className='submit hover:bg-[#1EAAAD] hover:text-white p-2 rounded'> تحديث الصورة الشخصية </button>
                </form>
            </div>
        </div>
)
}

export default EditImage;