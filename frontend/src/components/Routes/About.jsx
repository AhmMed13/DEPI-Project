import React from 'react'
import Footer from '../Footer/Footer'
import NavBar from '../Navbar/Navbar'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

const About = () => {

    const dispatch = useDispatch()
    dispatch({type: 'setSelected', payload: ''})
return (
    <div>
        <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
        </div>
        <Container>

        </Container>
        <Footer />
    </div>
)
}

export default About