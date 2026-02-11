import { useState } from 'react';
import CheckoutUserInfo from './CheckoutUserInfo';
import CheckoutShipping from './CheckoutShipping';
import CheckoutReview from './CheckoutReview';

function Checkout({ user, cartItems, onConfirmOrder, onBack, onRemoveItem }) {
    const [step, setStep] = useState(1);
    const [shippingMethod, setShippingMethod] = useState(null);

    return (
        <div className="checkout-container">
            <div className={`checkout-step step-${step}`}>
                {step === 1 && (
                    <CheckoutUserInfo
                        user={user}
                        onNext={() => setStep(2)}
                        onBack={onBack}
                    />
                )}

                {step === 2 && (
                    <CheckoutShipping
                        selected={shippingMethod}
                        onSelect={setShippingMethod}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && (
                    <CheckoutReview
                        cartItems={cartItems}
                        shippingMethod={shippingMethod}
                        onBack={() => setStep(2)}
                        onConfirmOrder={() => onConfirmOrder(shippingMethod)}
                        onRemoveItem={onRemoveItem}
                    />
                )}
            </div>
        </div>
    );
}

export default Checkout;