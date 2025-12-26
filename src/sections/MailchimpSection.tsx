import MailchimpSubscribe from "react-mailchimp-subscribe"
import {useState, useEffect} from "react"
import Draggable from 'react-draggable'; // The default

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
      email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });
      console.log(status)
    return (
      <div className="text-center text-[18px]">
        <h2 className="mb-[20px] font-extrabold">Newsletter</h2>
        {status === null && <p>Get 10% off on your first order and stay updated on the latest products...</p>}
        {status === "sending" && <p>sending...</p>}
        {status === "error" && <p>The email you entered is not valid.</p>}
        {status === "success" && (
          <div
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        <p className="mb-[5px] mt-[15px] text-[14px]">email</p>
        <input
          ref={node => (email = node)}
          type="email"
          placeholder="Your email"
          className="mb-[20px] w-full p-[5px] text-center text-[16px] outline outline-2 outline-offset-[-1px] "
        />
        <button onClick={submit} className="mb-[20px] w-full p-[5px] text-[16px] outline outline-2 outline-offset-[-1px]">
          Submit
        </button>
      </div>
    );
  };


export function MailchimpSection() {
    const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
    
    const [closeBox, checkClosed] = useState('true');
     const [closeTemp, setCloseTemp] = useState('false')
    const [storeClose, setStoreClose] = useState('false')

    useEffect(() => {

        setCloseTemp(sessionStorage.getItem('closeTemp'))
        setStoreClose(localStorage.getItem('storeClose'))
        checkClosed('false')
      }, [])

    const clickBox = () => {
        checkClosed('true');
        sessionStorage.setItem('closeTemp', 'true');
      }

     const timedClose = () => {
        setTimeout(() => {checkClosed('true')}, 2000);
        setTimeout(() => {localStorage.setItem('storeClose', 'true')}, 2000) ;
     } 

    return (
        <>
        {storeClose === 'true' ? null :
        <>{closeTemp === 'true' ? null : 
        <>{closeBox === 'true' ? null : 
            <Draggable>
            <div className={`fixed bottom-[20px] left-[20px] z-[20] w-[240px] bg-white p-[30px] font-Eurostile outline outline-2 outline-offset-[-1px] hover:cursor-move`}>
         <button onClick={() => clickBox()} className="absolute right-0 top-0 w-[40px] p-[8px] text-center outline outline-2 outline-offset-[-1px] hover:bg-black hover:text-white hover:outline-black">X</button>
           <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => {subscribe(formData); {status === "success" && timedClose()} }}
            />
          )}
        />
        </div>
        </Draggable>
        }
        </>
        }
        </>
        }
        
        </>
    );
  
}


