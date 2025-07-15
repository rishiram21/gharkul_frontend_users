import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/Authcontext'; // Adjust the import path as needed

const RazorpayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing'); // 'processing', 'success', 'failed'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { user } = useContext(AuthContext);

  // Extract selectedPlan from location.state
  const { selectedPlan } = location.state || {};

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

  const displayRazorpay = async (amount, orderId) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      setPaymentStatus('failed');
      return;
    }

    const options = {
      key: 'rzp_live_SzhXfl7yxnVIn1', // Replace with your actual Razorpay key
      amount: amount * 100, // Amount is in paise
      currency: 'INR',
      name: 'Gharkul',
      description: 'Payment for Subscription Plan',
      image: '/logo.png', // Replace with your logo URL
      order_id: orderId, // Use the order ID created by your backend
      handler: function (response) {
        console.log('Payment handler called:', response);
        
        // Immediately close the modal programmatically
        try {
          // Try to close the Razorpay modal
          if (window.Razorpay && window.Razorpay.modal) {
            window.Razorpay.modal.close();
          }
          // Alternative method to close modal
          const razorpayModal = document.querySelector('.razorpay-container');
          if (razorpayModal) {
            razorpayModal.style.display = 'none';
          }
        } catch (error) {
          console.log('Error closing modal:', error);
        }

        // Payment successful - update UI immediately
        setPaymentStatus('success');
        setPaymentDetails({
          paymentId: response.razorpay_payment_id,
          amount: amount,
        });

        // Verify the payment on your backend
        fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: user.id, // Use the user ID from AuthContext
            packageId: selectedPlan.planId, // Use the selectedPlan id
          }),
        })
          .then((verifyResponse) => {
            return verifyResponse.json().then(verifyData => ({
              ok: verifyResponse.ok,
              data: verifyData
            }));
          })
          .then(({ ok, data }) => {
            if (ok) {
              console.log('Payment verification successful:', data);
              // Redirect to profile after a short delay to show success message
              setTimeout(() => {
                navigate('/profile', {
                  state: {
                    paymentSuccess: true,
                    paymentId: response.razorpay_payment_id,
                    amount: amount,
                  },
                });
              }, 2000);
            } else {
              console.error('Payment verification failed:', data);
              // Even if verification fails, still redirect but with error state
              setTimeout(() => {
                navigate('/profile', {
                  state: {
                    paymentSuccess: false,
                    error: 'Payment verification failed',
                  },
                });
              }, 2000);
            }
          })
          .catch((error) => {
            console.error('Error verifying payment:', error);
            // Handle network errors - still redirect with error state
            setTimeout(() => {
              navigate('/profile', {
                state: {
                  paymentSuccess: false,
                  error: 'Network error during verification',
                },
              });
            }, 2000);
          });
      },
      modal: {
        ondismiss: function () {
          // User closed the payment modal without completing payment
          console.log('Payment modal dismissed by user');
          setPaymentStatus('failed');
          setTimeout(() => {
            navigate('/profile');
          }, 1500);
        },
      },
      prefill: {
        name: user?.name || '', // Use optional chaining for safety
        email: user?.email || '', // Use optional chaining for safety
        contact: user?.contact || '', // Use optional chaining for safety
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    
    // Store the payment object reference for manual closing
    window.currentRazorpayInstance = paymentObject;
    
    // Add error handling for Razorpay initialization
    paymentObject.on('payment.failed', function (response) {
      console.error('Payment failed:', response.error);
      
      // Try to close the modal
      try {
        paymentObject.close();
      } catch (error) {
        console.log('Error closing modal on failure:', error);
      }
      
      setPaymentStatus('failed');
      setTimeout(() => {
        navigate('/profile', {
          state: {
            paymentSuccess: false,
            error: response.error.description || 'Payment failed',
          },
        });
      }, 2000);
    });

    paymentObject.open();
  };

  useEffect(() => {
    // Add validation for required data
    if (location.state && location.state.totalAmount && location.state.orderId && selectedPlan) {
      const { totalAmount, orderId } = location.state;
      displayRazorpay(totalAmount, orderId);
    } else {
      // No payment amount, order ID, or selected plan provided, redirect to profile
      console.error('Missing required payment data:', {
        totalAmount: location.state?.totalAmount,
        orderId: location.state?.orderId,
        selectedPlan: selectedPlan
      });
      navigate('/profile');
    }
  }, [location, navigate, selectedPlan]);

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
            <p className="text-sm text-gray-500">Redirecting to profile...</p>
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
            <p className="text-sm text-gray-500">Redirecting to profile...</p>
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