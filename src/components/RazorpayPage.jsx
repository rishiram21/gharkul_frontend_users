import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

const RazorpayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing'); // 'processing', 'success', 'failed'
  const [paymentDetails, setPaymentDetails] = useState(null);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      setPaymentStatus('failed');
      return;
    }

    const options = {
      key: 'rzp_test_6iRE2VEfQ2p7qE', // Replace with your actual Razorpay key
      amount: amount * 100, // Amount is in paise (i.e., 1 INR = 100 paise)
      currency: 'INR',
      name: 'Gharkul',
      description: 'Payment for Subscription Plan',
      image: 'https://example.com/your_logo', // Replace with your logo URL
      handler: function (response) {
        // Payment successful
        setPaymentStatus('success');
        setPaymentDetails({
          paymentId: response.razorpay_payment_id,
          amount: amount
        });
        
        // Redirect to homepage after a short delay to show success message
        setTimeout(() => {
          navigate('/', { 
            state: { 
              paymentSuccess: true, 
              paymentId: response.razorpay_payment_id,
              amount: amount
            } 
          });
        }, 2000);
      },
      modal: {
        ondismiss: function() {
          // User closed the payment modal without completing payment
          setPaymentStatus('failed');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    
    // Handle payment failure
    paymentObject.on('payment.failed', function (response) {
      setPaymentStatus('failed');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    });

    paymentObject.open();
  };

  useEffect(() => {
    if (location.state && location.state.totalAmount) {
      const { totalAmount } = location.state;
      displayRazorpay(totalAmount);
    } else {
      // No payment amount provided, redirect to home
      navigate('/');
    }
  }, [location, navigate]);

  const renderContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we initialize your payment...</p>
            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <Lock className="w-4 h-4 mr-2" />
              Secured by Razorpay
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
            {paymentDetails && (
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-700">
                  <strong>Payment ID:</strong> {paymentDetails.paymentId}
                </p>
                <p className="text-sm text-green-700">
                  <strong>Amount:</strong> ₹{paymentDetails.amount}
                </p>
              </div>
            )}
            <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          </div>
        );

      case 'failed':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-4">
              Your payment could not be processed. Please try again.
            </p>
            <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-screen">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RazorpayPage;