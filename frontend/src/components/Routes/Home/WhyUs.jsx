import React from 'react'
import { Container } from 'react-bootstrap';

const WhyUs = () => {
return (
    <Container className='whyus mx-auto py-5'>
        <div className="why-content d-flex gap-4 flex-column">
            <h2 className='text-[#02385A]'> لماذا طلب عرض سعر أفضل؟ </h2>
            <hr className='mx-auto my-0'/>
            <div className="sec1 d-flex justify-content-between">
                <div className="info">
                    <h2 className='text-[#1EAAAD] text-end'> معلومات </h2>
                    <h1 className='text-[#37383B]'> لماذا طلب عرض السعر..؟ </h1>
                    <hr /> <hr className='mx-3'/>
                    <p> أولا : ستطلب ولن تبحث وتوفر عناء البحث </p>
                    <p> ثانيا : ستكشف سعر السوق للخدمة التى تبحث عنها </p>
                    <p> ثالثا : ستتصفح السيرة الذكية للمشتغلين الجاهزين لخدمتك </p>
                    <p> رابعا : ستختار السعر والمشتغل المناسب لك بكل ثقة وراحة بال </p>
                </div>

                <div className="two-items d-flex gap-3 w-50">
                    <div className="item">
                        <i class="fa-solid fa-file-invoice-dollar"></i>
                        <p> اكتشف أسعار السوق </p>
                    </div>
                    <div className="item">
                        <i class="fa-regular fa-clock"></i>
                        <p> اكتشف أسعار السوق </p>
                    </div>
                </div>
            </div>
        </div>
    </Container>
)
}

export default WhyUs;