'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';

export default function PaypalCheckout() {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Helper to go to next step
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // Shared styles
  const buttonStyle = {
    base: "px-6 py-3 rounded-lg font-medium transition-all",
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    secondary: "bg-white border border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600",
    disabled: "bg-gray-200 text-gray-500 cursor-not-allowed"
  };

  // const cardStyle = {
  //   base: "p-6 rounded-xl border cursor-pointer transition-all",
  //   selected: "border-2 border-emerald-500 bg-emerald-50",
  //   unselected: "border-gray-200 hover:border-gray-300 bg-white"
  // };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Step 1: Currency Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Select Currency</h3>
          
          <select 
            value={currency} 
            onChange={e => setCurrency(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="USD">USD</option>
            <option value="KES">Kenya Shillings (KES)</option>
          </select>

          <div className="flex justify-end">
            <button 
              onClick={nextStep} 
              disabled={!currency}
              className={`${buttonStyle.base} ${buttonStyle.primary} ${!currency ? buttonStyle.disabled : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Amount Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Choose Donation Amount</h3>
          
          {/* Preset Amount Options */}
          <div className="grid grid-cols-2 gap-4">
            {currency === 'USD' ? (
              <>
                <AmountCard 
                  value="10" 
                  label="Start Small" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="blue"
                />
                <AmountCard 
                  value="25" 
                  label="Basic Help" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="blue"
                />
                <AmountCard 
                  value="50" 
                  label="Major Impact" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="pink"
                />
                <AmountCard 
                  value="100" 
                  label="Champion" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="blue"
                />
              </>
            ) : (
              <>
                <AmountCard 
                  value="500" 
                  label="Start Small" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="blue"
                />
                <AmountCard 
                  value="2000" 
                  label="Basic Help" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="blue"
                />
                <AmountCard 
                  value="5000" 
                  label="Major Impact" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="pink"
                />
                <AmountCard 
                  value="10000" 
                  label="Champion" 
                  amount={amount} 
                  setAmount={setAmount}
                  color="blue"
                />
              </>
            )}
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Or enter a custom amount:</p>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 py-2 bg-gray-100 text-emerald-600 font-medium">
                {currency === 'USD' ? '$' : 'KES'}
              </span>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 p-2 border-none focus:ring-0"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button 
              onClick={prevStep}
              className={`${buttonStyle.base} ${buttonStyle.secondary}`}
            >
              Back
            </button>
            <button 
              onClick={nextStep} 
              disabled={!amount || parseFloat(amount) <= 0}
              className={`${buttonStyle.base} ${buttonStyle.primary} ${!amount ? buttonStyle.disabled : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Select Payment Method</h3>
          
          {/* Payment Method Grid */}
          <div className="grid grid-cols-2 gap-4">
            <PaymentMethodCard 
              method="paypal" 
              label="PayPal" 
              description="Pay using your PayPal account" 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              color="blue"
            />
            <PaymentMethodCard 
              method="mpesa" 
              label="M-Pesa" 
              description="Pay using M-Pesa mobile money" 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              color="blue"
            />
            <PaymentMethodCard 
              method="card" 
              label="Credit/Debit Card" 
              description="Pay using your card" 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              color="indigo"
            />
            <PaymentMethodCard 
              method="bank" 
              label="Bank Transfer" 
              description="Pay from your bank account" 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              color="blue"
            />
          </div>

          {/* Donation Summary */}
          {paymentMethod && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-3">Donation Summary</h4>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">{currency === 'USD' ? '$' : 'Ksh '}{amount}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-emerald-600">{currency === 'USD' ? '$' : 'Ksh '}{amount}</span>
              </div>
            </div>
          )}

          {/* Security Message */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🔒</span>
            <span>Your payment information is securely processed</span>
          </div>

          <div className="flex justify-between gap-4">
            <button 
              onClick={prevStep}
              className={`${buttonStyle.base} ${buttonStyle.secondary} flex-1`}
            >
              Back
            </button>
            <button 
              onClick={nextStep} 
              disabled={!paymentMethod}
              className={`${buttonStyle.base} ${buttonStyle.primary} flex-1 ${!paymentMethod ? buttonStyle.disabled : ''}`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Payment Processing */}
      {step === 4 && paymentMethod === 'paypal' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Pay with PayPal</h3>
          
          <PayPalScriptProvider
            options={{
              'clientId': 'AZJSs77mtw0U8Xg7m2vJPhvYSW9Z5P8JoLWpqKb00MH9cN67YyPiGfZUa0mXAPqrFhpE3X_NJRMtdJvW',
              currency: currency,
            }}
          >
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: 'CAPTURE',
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                        currency_code: currency,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  return actions.order.capture().then((details) => {
                    alert(`Transaction completed by ${details.payer?.name?.given_name ?? 'Unknown User'}`);
                  });
                } else {
                  return Promise.resolve();
                }
              }}
              
              
            />
          </PayPalScriptProvider>

          <button 
            onClick={prevStep}
            className={`${buttonStyle.base} ${buttonStyle.secondary} w-full`}
          >
            Back
          </button>
        </div>
      )}

      {step === 4 && paymentMethod !== 'paypal' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">
            Pay with {paymentMethod === 'mpesa' ? 'M-Pesa' : 
                    paymentMethod === 'card' ? 'Credit/Debit Card' : 
                    paymentMethod === 'bank' ? 'Bank Transfer' : paymentMethod}
          </h3>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              {paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} integration coming soon.
            </p>
            <button 
              onClick={prevStep}
              className={`${buttonStyle.base} ${buttonStyle.primary}`}
            >
              Back to Payment Methods
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// Reusable Amount Card Component
type AmountCardProps = {
  value: string;
  label: string;
  amount: string;
  setAmount: (value: string) => void;
  color: 'blue' | 'pink'; // Add more colors here if needed
};

function AmountCard({
  value,
  label,
  amount,
  setAmount,
  color,
}: AmountCardProps) {
  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    pink: { border: 'border-pink-500', bg: 'bg-pink-50', text: 'text-pink-600' },
    // Add more colors if needed
  };

  return (
    <div
      onClick={() => setAmount(value)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
        amount === value
          ? `${colorMap[color].border} ${colorMap[color].bg}`
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div
        className={`text-lg font-bold ${
          amount === value ? colorMap[color].text : 'text-gray-800'
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

// Reusable Payment Method Card Component
type PaymentMethodCardProps = {
  method: 'paypal' | 'mpesa' | 'card' | 'bank';
  label: string;
  description: string;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  color: 'blue' | 'emerald' | 'indigo' | 'purple';
};

function PaymentMethodCard({
  method,
  label,
  description,
  paymentMethod,
  setPaymentMethod,
  color,
}: PaymentMethodCardProps) {
  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    indigo: { border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-600' },
  };

  return (
    <div
      onClick={() => setPaymentMethod(method)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        paymentMethod === method
          ? `${colorMap[color].border} ${colorMap[color].bg}`
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${colorMap[color].bg} flex items-center justify-center`}
        >
          <span className={`text-lg font-bold ${colorMap[color].text}`}>
            {method === 'paypal'
              ? 'P'
              : method === 'mpesa'
              ? 'M'
              : method === 'card'
              ? '💳'
              : method === 'bank'
              ? '🏦'
              : ''}
          </span>
        </div>
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
    </div>
  );
}
