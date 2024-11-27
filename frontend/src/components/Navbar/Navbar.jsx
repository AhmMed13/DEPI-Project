
import './Navbar.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
    const navigate = useNavigate()

    const [ user, setUser ] = useState({})
    const selected = useSelector(state => state.selectedRoute)

    useEffect(() => {
        if(localStorage.getItem('currentUser')){
            setUser(JSON.parse(localStorage.getItem('currentUser')))
        }
    }, [])


return (
    <Navbar expand="lg" className='p-0' style={{boxShadow: '0 2px 0 0 #eee'}}>
    <Container>
        <span className='nav-top'></span>
        <Navbar.Brand onClick={()=> navigate('/')}>
            <img src ={require("../../assets/brand.png")} alt="" className='ml-4' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{flexGrow: 'unset'}}>
            <Nav >
                <Link to='/' 
                        className={`link rounded ${selected === 'home' && 'text-white bg-[#02385A] font-bold'}`} 
                        >
                            الرئيسية 
                </Link>
                <Link to='/services' 
                        className={`link rounded ${selected === 'services' && 'text-white bg-[#02385A] font-bold'}`} 
                        > 
                            الخدمات 
                </Link>
                <Link to='/providers' 
                        className={`link rounded ${selected === 'providers' && 'text-white bg-[#02385A] font-bold'}`} 
                        > 
                            المشتغلين 
                </Link>
                <Link to='/contact' 
                        className={`link rounded ${selected === 'contact' && 'text-white bg-[#02385A] font-bold'}`} 
                        > 
                            تواصل معنا 
                </Link>
            </Nav>
        </Navbar.Collapse>
        <div className={`d-flex gap-2 mx-1 nav-extra`}>
                <Link to='/chat' className={`${selected === 'chat' && 'bg-[#02385A] text-white'}`}><i className={`fa-regular fa-message `}></i></Link>
            </div>
            {!user.id ? <div className="account d-flex gap-2">
                <Button className='text-nowrap' onClick={()=> navigate('/login')}> تسجيل دخول </Button>
                <div className='w-1 h-7 rounded bg-[#1EAAAD] mt-2'></div>
                <Button className='text-nowrap' onClick={()=> navigate('/register') }> إنشأ حساب </Button>
            </div> 
            : 
            <div className={`d-flex px-2 cursor-pointer align-items-center justify-evenly ${selected === 'profile' && 'bg-[#02385A] text-white'}`} 
                    style={{borderRadius: '30px', border: '1px solid #1EAAAD'}} 
                    onClick={() => navigate(`/profile/${user.id}`)}
                    >
                        <div className='w-25 rounded-circle'>
                            <img src={'http://localhost:4000' + user.image } alt="" className=' m-0' />
                        </div>
                        <div className='sm:d-none text-nowrap'>{ user.name }</div>
            </div> }
    </Container>
    </Navbar>
)}

export default NavBar