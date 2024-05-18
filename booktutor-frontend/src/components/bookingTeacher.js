import React, { useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';

const BookingTeacher = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [paymentInformation, setPaymentInformation] = useState({
        username: "",
        number: "",
        expiryDate: "",
        cvc: "",
        addressOne: "",
        addressTwo: "",
      })  
    const [confirmBookingToggle, setConfirmBookingToggle] = useState(false);

    const handleSubmit = async (values) => {
        // e.preventDefault();
    
    
        if (!stripe || !elements) {
          return;
        }
        // // Validate cardholder's name on the client side
        // if (cardholderName.trim() === '') {
        //   console.error('Cardholder name is required.');
        //   return;
        // }
    
        // Create a payment method with the collected card details
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: "umaramjad",
          },
        });
    
        if (error) {
          console.error("error payment", error);
          setConfirmBookingToggle(false);
          toast.error("Payment is not proceed something went wrong....")
        } else {
          // Handle the payment method (send it to your server for payment processing);
          setConfirmBookingToggle(true);
        //   const mainData = {
        //     firstName: personalInformation?.firstName ? personalInformation?.firstName : "",
        //     lastName: personalInformation?.lastName ? personalInformation?.lastName : "",
        //     email: personalInformation?.email ? personalInformation?.email : "",
        //     username: values?.username ? values?.username : "",
        //     phoneNumber: personalInformation?.phoneNumber ? personalInformation?.phoneNumber : "",
        //     communication: personalInformation?.communication === "email" ? 1 : personalInformation?.communication === "text" ? 2 : personalInformation?.communication === "both" ? 3 : "",
        //     city: locationState?.city ? locationState?.city : "",
        //     zipCode: locationState?.zip_code ? locationState?.zip_code : "",
        //     state: locationState?.state ? locationState?.state : "",
        //     country: locationState?.country ? locationState?.country : "",
        //     address1: values?.addressOne ? values?.addressOne : "",
        //     address2: values?.addressTwo ? values?.addressTwo : "",
        //     transactionId: paymentMethod?.id ? paymentMethod?.id : "",
        //     price: orderSummaryPrice,
        //     quantity: cartItems?.length,
        //     isShippingSame: isShipping ? true : false,
        //     // userId: user ? user?.id : "837fc957-61a9-449c-91ee-22592cd824c3",
        //     status: 1,
        //     shippingAddress: {
        //       name: locationState?.name,
        //       latitude: locationState?.lat,
        //       longitude: locationState?.lng
        //     },
        //     booking_items: cartItems ? cartItems : []
        //   }
    
        //   const billingData = {
        //     name: `${billingAddressOne},${biilingCity},${biilingState},${biilingZipCode}`,
        //     address1 : billingAddressOne,
        //     city: biilingCity,
        //     state: biilingState,
        //     zipCode: biilingZipCode,
        //     latitude: locationState?.lat,
        //     longitude: locationState?.lng
        //   }
    
        //   if(!isShipping) {
        //     mainData.billingAddress = billingData;
        //   }
        //   else {
        //      delete mainData.billingAddress
        //   }
    
        //   if (user) {
        //     mainData.userId = user?.id;
        //   } else {
        //     delete mainData.userId;
        //   }
    
          console.log('Payment successful! PaymentMethod:', paymentMethod);
          toast.success("Payment Successfully....")
          setTimeout(() => {
            setConfirmBookingToggle(false)
          }, 1000);
         
          // dispatch(clearCartItems());
    
        }
      };

  return (
    <>
    <ToastContainer/>
    <Formik
    initialValues={paymentInformation}
    validationSchema={Yup.object({
      username: Yup.string()
        // .min(6, 'Username must be at least 6 characters')
        // .max(30, 'Username must not exceed 30 characters')
        .required('Cardholder name is required'),
      // number: Yup.string()
      //   .required('Credit card number is required'),
      // expiryDate: Yup.string()
      //   .required('Expiry Date is required'),
      // cvc: Yup.number()
      // .required("CVC number is required")
      // .typeError("CVC must be a number"),
      // addressOne: Yup.string()
      //   .required('Address One is required'),
    })}
    onSubmit={async (values) => {
      await setPaymentInformation(values);
      setTimeout(() => {
        handleSubmit(values);
      }, 100);

    }}
  >
    {({ handleChange, handleBlur, values, errors, setFieldError }) => (

      <div
        className="step-field-box position-relative"
        // sx={{ width: { xs: "100%", md: "60%" } }}
      >
        <Form className="d-flex flex-column gap-3  guest-checkout">
          <div className="d-flex flex-column gap-3 payment-info">
            {/* <h1>Please provide your payment details</h1>
            <h2>Choose your payment method</h2>
            <div className="d-flex gap-2">
              <div className="d-flex justify-content-between align-items-center credit-card w-100">
                <p className="mb-0">Credit Card</p>
                <div className="d-flex gap-2">
                  <img src={Visa} alt="" />
                  <img src={MasterCard} alt="" />
                  <img src={UnionPay} alt="" />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center credit-card w-100">
                <p className="mb-0">PayPal</p>
                <div className="d-flex gap-2">
                  <img src={PayPal} alt="" />
                </div>
              </div>
            </div> */}
            <h5 className="mb-0 fw-bold mt-3">Enter your card information</h5>
            <div className="d-flex flex-column gap-2">
              {/* <div className="d-flex gap-2 align-items-center"> */}
                <div className="d-flex flex-column gap-1 w-100">
                  <label htmlFor="">Cardholder name <span style={{ color: "red" }}>*</span> </label>
                  <input type="text" className='p-2 card-input' placeholder='Cardholder name' name='username' value={values?.username} onChange={handleChange} />
                  <ErrorMessage name="username" component="p" className="error-message-formik" />
                </div>
                <div className="d-flex flex-column gap-1 w-100">
                  <label htmlFor="">Credit card number <span style={{ color: "red" }}>*</span></label>
                  <CardNumberElement className="card-number-element" options={{ style: { base: { fontSize: '16px' , border:"1px solid lightgray" } } }} />
                  {/* <input type="text" placeholder='Credit card number' name='number' value={values?.number} onChange={handleChange} /> */}
                  {/* <ErrorMessage name="number" component="p" className="error-message-formik"  /> */}
                </div>

              {/* </div> */}

              <div className="d-flex gap-2 align-items-center">
                <div className="d-flex flex-column gap-1 w-100">
                  <label htmlFor="">Exp date (MM/YY) <span style={{ color: "red" }}>*</span> </label>
                  <CardExpiryElement className="card-number-element" options={{ style: { base: { fontSize: '16px', border: "2px solid red" } } }} />

                  {/* <input type="text" placeholder='Exp date (MM/YYYY)' name='expiryDate' value={values?.expiryDate} onChange={handleChange} /> */}
                  {/* <ErrorMessage name="expiryDate" component="p" className="error-message-formik"  /> */}
                </div>
                <div className="d-flex flex-column gap-1 w-100">
                  <label htmlFor="">CVC <span style={{ color: "red" }}>*</span></label>
                  <CardCvcElement className="card-number-element" options={{ style: { base: { fontSize: '16px' } } }} />
                  {/* <input type="text" placeholder='CVC' name='cvc' value={values?.cvc} onChange={handleChange} /> */}
                  {/* <ErrorMessage name="cvc" component="p" className="error-message-formik"  /> */}
                </div>
              </div>

              <div className="confirm-booking w-100 mt-5" >
                <button type="submit" disabled={confirmBookingToggle && true} className='px-3 btn btn-primary p-2 w-100 fs-4'>{confirmBookingToggle ? <PulseLoader color='gray' /> : "Confirm Booking"}</button>
              </div>
            </div>

          </div>

        </Form>
      </div>
    )}
  </Formik>
    </>
 
  )
}

export default BookingTeacher
