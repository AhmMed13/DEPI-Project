

import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';

const ContactUs = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({type: 'setSelected', payload: 'conatct'})
  },[])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/yourFormId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data);
        alert('تم إرسال الرسالة!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        console.error('Error:', data);
        alert('خطأ في إرسال الرسالة.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطأ في إرسال الرسالة.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div style={{ position: 'sticky', top: '0', zIndex: '10', backgroundColor: 'white'}}>
        <NavBar />
      </div>
    <div className="contact-page">
      <div className="contact-info">
        <h2>تواصل معنا</h2>
        <p>نحن نحب أن نسمع منك! سواء كان لديك سؤال حول خدماتنا أو تحتاج إلى مساعدة أو تريد فقط تقديم ملاحظات، فإن فريقنا هنا لمساعدتك.</p>
        <p>
          <i className="fa fa-map-marker"></i> 34 شارع القومية، الزقازيق، مصر
        </p>
        <p>
          <i className="fa fa-phone"></i> +20 (222) 345 6789
        </p>
        <p>
          <i className="fa fa-envelope"></i> info@mywebsite.com
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">الاسم</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <label htmlFor="message">الرسالة</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
          </button>
        </form>
      </div>
      <div className='point'></div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
