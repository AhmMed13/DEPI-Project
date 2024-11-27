import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Brief = () => {

    const navigate = useNavigate()
    return (
    <div className='brief d-flex'>
        <div className='d-flex flex-column gap-4 align-items-start'>
            <h1 className='text-white text-end '> منصة شغل </h1>
            <p className='w-50'> هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها </p>
            <Button className='px-5 text-nowrap button-about' onClick={()=> navigate('/about')}> عن المنصة </Button>
            <div className="d-flex gap-5">
                <div className="pros">
                    <i class="fa-solid fa-certificate"></i>
                    <span> مفهوم جديد  </span>
                </div>
                <div className="pros">
                    <i class="fa-solid fa-briefcase"></i>
                    <span> حرية للتعامل </span>
                </div>
                <div className="pros">
                    <i class="fa-solid fa-clock"></i>
                    <span> تثمين للوقت </span>
                </div>
                <div className="pros">
                    <i class="fa-solid fa-hand-holding-hand"></i>
                    <span> شمولية فى الخدمات </span>
                </div>
            </div>
        </div>
        <img src={require('../../../assets/bagman.jpeg')} className='bagman' alt="" />
    </div>
    )
}

export default Brief