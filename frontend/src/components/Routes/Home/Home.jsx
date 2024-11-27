import { useDispatch } from 'react-redux'
import Footer from '../../Footer/Footer'
import NavBar from '../../Navbar/Navbar'
import Brief from './Brief'
import './Home.css'
import WhyUs from './WhyUs'

const Home = () => {

  const dispatch = useDispatch()
  dispatch({type: 'setSelected', payload: 'home'})
  return (
    <div>
      <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
      </div>
      <Brief />
      <WhyUs />
      <Footer />
    </div>
  )
}

export default Home