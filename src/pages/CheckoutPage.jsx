import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/Authcontext'; // Adjust the import path as needed

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  console.log(user);
  console.log(selectedPlan);

  useEffect(() => {
    if (location.state && location.state.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
    } else {
      navigate('/subscription');
    }
  }, [location, navigate]);

 const handleCheckoutSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    // Create URLSearchParams object to send data as URL-encoded form data
    const params = new URLSearchParams();
    params.append('amount', calculateTotalAmount());
    params.append('currency', 'INR');
    params.append('userId', user.id);
    params.append('packageId', selectedPlan.planId);

    // Create an order on your backend
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      // Navigate to Razorpay page with the order details
      navigate('/razorpay', {
        state: {
          selectedPlan: selectedPlan,
          totalAmount: calculateTotalAmount(),
          orderId: data.orderId,
        },
      });
    } else {
      console.error('Failed to create order:', data);
    }
  } catch (error) {
    console.error('Error creating order:', error);
  }

  setIsProcessing(false);
};


  if (!selectedPlan) {
    return <div>Loading...</div>;
  }

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
          <button
            onClick={() => navigate('/subscription')}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Subscription
          </button>
        </div>
      </div>
    );
  }

  const calculateTotalAmount = () => {
    const basePrice = parseInt(selectedPlan.price.replace('₹', '').replace(',', ''));
    const gst = Math.round(basePrice * 0.18);
    return basePrice + gst;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <button
            onClick={() => navigate('/subscription')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedPlan.color || 'bg-gray-200'} flex items-center justify-center`}>
              {/* You can add a static icon or map it based on planId */}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
              <p className="text-sm text-gray-600">{selectedPlan.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{selectedPlan.price}</div>
              <div className="text-sm text-gray-600">{selectedPlan.period}</div>
            </div>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan Cost</span>
                  <span className="font-medium">{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{Math.round(parseInt(selectedPlan.price.replace('₹', '').replace(',', '')) * 0.18)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{calculateTotalAmount()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-green-50 p-4 rounded-lg mt-6">
              <Lock size={16} className="text-green-600" />
              <span className="text-sm text-green-700">
                Your payment information is secure and encrypted
              </span>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate('/subscription')}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} className="inline mr-2" />
                Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Redirecting...
                  </div>
                ) : (
                  `Pay ₹${calculateTotalAmount()}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
