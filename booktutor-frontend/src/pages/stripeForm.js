import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import BookingTeacher from '../components/bookingTeacher';

const StripeForm = () => {
    const stripePromise = loadStripe('pk_test_51NQ90ZCag1yt68dCZYTbNoKIp1vt0ynZ1NjexmjhkYWuH5AjLQNphRBDbiXdqvhHtPIUbTG8De5mj6Hy9NQGW58U00Iw5jhLk6'); // Replace with your Stripe publishable key

  return (
    <div>
    <Elements stripe={stripePromise}>
     <BookingTeacher  />
    </Elements>
</div>
  )
}

export default StripeForm
