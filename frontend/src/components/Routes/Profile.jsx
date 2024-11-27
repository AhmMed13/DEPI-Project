import { Button, Container } from 'react-bootstrap'
import { FaUserEdit, FaPlus } from "react-icons/fa"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io"
import { PiChatsBold } from "react-icons/pi"
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { TbEdit } from "react-icons/tb"
import { IoTrashBin } from "react-icons/io5"
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'




const Profile = () => {

    const dispatch = useDispatch()
    dispatch({type: 'setSelected', payload: 'profile'})

    const navigate = useNavigate()
    const { id } = useParams()
    const [ user, setUser ] = useState({})
    const [ Services, setServices ] = useState([])
    const [ ismyProfile, setIsMyProfile ] = useState(false)

    
useEffect(() => {
        fetch(`http://localhost:4000/api/users/${id}`)
        .then( res => res.json())
        .then( data => setUser(data.data))
    if(id === JSON.parse(localStorage.getItem('currentUser')).id){
            setIsMyProfile(true)
        }
        if(user.isProvider){
            setServices(user.servicesProvided)
        } else {
            setServices(user.servicesUsed)
        }
}, [id, user])

    const logOut = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                        enqueueSnackbar('Logged out Successfully' , { variant: 'success'})
                        localStorage.removeItem('currentUser')
                        dispatch({type: 'unAautherizeUser'})
                        navigate('/')
                    } else {
                        enqueueSnackbar('SomeThing Went Wrong!!' , { variant: 'error'})
                    }
                })
        }


    const buyService = async(id) => {    
        const res = await fetch(`http://localhost:4000/api/services/${id}/${JSON.parse(localStorage.getItem('currentUser')).id}`)
    const data = await res.json()
    
    if(data.success){
        enqueueSnackbar(data.data, {variant: 'success'})
    }else {
        enqueueSnackbar(data.data, {variant: 'error'})
    }}

    const deleteService = (id)=> {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/api/services/${id}`, {method: 'DELETE'})
                .then( res => res.json())
                .then( data => {if(data.success){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Service has been deleted.",
                        icon: "success"
                    });
                }})
                
            }
        });
    }



    


return (
    <div>
        <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
    </div>
    <div className='w-100 py-2'>
        <div className='container bg-[#eee] py-2 d-flex flex-column gap-4 '>
            <div className='d-flex justify-evenly flex-wrap'>
                <div className='ratio ratio-1x1 w-25 border-[#1EAAAD] sm:w-1/2'>
                    <img src={ "http://localhost:4000" + user.userImage } alt='' className='rounded-circle'/>
                </div> 
                <div style={{textAlign: 'start', width: '400px'}}>
                    <h2 className='text-[#02304d] text-capitalize '> الاسم: { user.username }</h2>
                    <h6 className='text-[#02304d] text-capitalize '> البريد الالكترونى : { user.userEmail }</h6>
                    <h6 className='text-[#02304d] text-capitalize '> الدولة: { user.userCountry || "غير محدد"}</h6>
                    <h6 className='text-[#02304d] text-capitalize '> رقم الهاتف: { user.userPhoneNumber || "غير محدد" }</h6>
                    <h6 className='text-[#02304d] text-capitalize '> الجنس: { user.userGender || "غير محدد" }</h6>
                </div>
                <div className='d-flex flex-column gap-4 p-5'>
                    { ismyProfile? <>
                        <Button> <Link to='/editProfile' className='text-white text-decoration-none'> تعديل الملف الشخصى <FaUserEdit className='d-inline'/></Link></Button>
                        <Button> <Link to='/editImage' className='text-white text-decoration-none'> تعديل الصورة الشخصية <FaUserEdit className='d-inline'/></Link></Button>
                        <Button className=' btn-danger' onClick={logOut}> تسجيل خروج  <IoIosLogOut className='d-inline'/></Button>
                        </>
                        :
                        <Button className='btn-success'> <PiChatsBold /></Button> }
                </div>
            </div>
            <h2 className='text-end px-5'>خدماتى: </h2>
            <Container>
                {ismyProfile && <Button className='mb-3 btn-success' onClick={()=> navigate(`/beProvider/${id}`)}> أضف خدمة <FaPlus className='d-inline'/> </Button>}
            <div className='d-flex gap-3 flex-wrap justify-evenly'>
                { Services && Services.map( (service, i) => (<div key={i} style={{boxShadow: '0 8px 10px #0000001F'}}>
                    <div className='d-flex gap-4 bg-[#02304d] p-2 align-items-center'>
                        <img src={ service.provider.image } alt="" className='rounded-circle w-20 m-0'/>
                        <h4 className='text-white'>{ service.provider.name }</h4>
                    </div>
                    <div>
                        <p className='text-black text-capitalize p-2'>{ service.serviceTitle }</p>
                        <p className='text-black text-capitalize p-2'>{ service.servicePrice }</p>
                        <p className='text-black text-capitalize p-2'>{ service.serviceDetails }</p>
                        <p className='text-black text-capitalize p-2'>{ service.serviceCategory }</p>
                    </div>
                    <hr className='mx-auto mb-0'/>
                    <div className="d-flex justify-around p-3">
                        { ismyProfile? <>
                            <Button className='btn-success' onClick={()=> navigate(`/editService/${service._id}`)}><TbEdit /></Button>
                            <Button className='btn-danger' onClick={()=> deleteService(service._id)}><IoTrashBin /></Button>
                        </>
                        :
                        <>
                            <Button className='btn-success' onClick={()=>buyService(service._id)}><MdOutlineAddShoppingCart /></Button></>}
                    </div>
                </div>)) }
            </div>
            </Container>
        </div>
    </div>
    <Footer />
    </div>
)
}

export default Profile