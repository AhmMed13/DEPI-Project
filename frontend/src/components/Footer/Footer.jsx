import { Container } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
return (
    <div className='footer py-5' style={{backgroundColor: '#02385A', position: 'relative'}}>
        <span></span>
        <Container className="mx-auto d-flex justify-content-between ">
                <div className='d-flex justify-content-starrt w-25'>
                    <img src={require('../../assets/brand.png')} alt="" />
                </div>
            <div className=" py-2">
                <p> معلومات عن شغل </p>
                <p> الأسئلة الشائعة </p>
                <p> ضمان حقوقك </p>
                <p> شروط الاستخدام </p>
            </div>
            <div className="footer-links">
                <div className="links-title">
                    روابط
                </div>
                <div className="links-content">
                <p> الشركاء </p>
                <p> المقالات </p>
                <p> مركز المساعدة </p>
                </div>
            </div>
            <div className="footer-links">
                <div className="links-title">
                    صفحات
                </div>
                <div className="links-content">
                <p> تسجيل جديد </p>
                <p> قدم كشريك </p>
                <p> تصفح كل الفئات </p>
                <p> اتصل بنا </p>
                </div>
            </div>
            <div className="footer-links">
                <div className="links-title">
                    حمل تطبيق شغل
                </div>
                <div className="links-content">
                    <img src={require('../../assets/app_store.png')} alt="" /> <br />
                    <img src={require('../../assets/google_play.png')} alt="" />
                </div>
            </div>
            <div className="footer-links">
                <div className="links-title">
                    تابعنا
                </div>
                <div className="links-content">
                <i className="fa-brands fa-snapchat"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-facebook"></i>
                </div>
            </div>
        </Container>
        <div className="copy-right text-white" lang='en' dir='ltr'>
            Copyright <sup>&copy;</sup> 2024 All rights are perserved | DEPI.
        </div>
    </div>
)
}

export default Footer