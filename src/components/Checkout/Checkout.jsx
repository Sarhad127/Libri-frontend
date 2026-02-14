import { useState } from 'react';
import CheckoutUserInfo from './CheckoutUserInfo';
import CheckoutShipping from './CheckoutShipping';
import CheckoutReview from './CheckoutReview';
import OrderSummary from './OrderSummary';
import {fetchUserProfile} from "../../services/api.js";

function Checkout({ user, cartItems, onConfirmOrder, onBack, onRemoveItem }) {
    const [step, setStep] = useState(1);
    const [shippingMethod, setShippingMethod] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const handleConfirmOrder = async () => {
        try {
            const token = user.token;
            const fullUser = await fetchUserProfile(token);
            const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setOrderDetails({ items: cartItems, shippingMethod, subtotal, user: fullUser });
            await onConfirmOrder(shippingMethod);
            cartItems.forEach(item => onRemoveItem?.(item.id));
            setStep(4);
        } catch (err) {
            console.error(err);
            alert(`Failed to place order: ${err.message}`);
        }
    };

    const handleBackToHome = () => {
        setOrderDetails(null);
        onBack();
    };

    return (
        <div className="checkout-container">
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
                    onConfirmOrder={handleConfirmOrder}
                    onRemoveItem={onRemoveItem}
                />
            )}

            {step === 4 && orderDetails && (
                <OrderSummary
                    order={orderDetails}
                    onBackToHome={handleBackToHome}
                />
            )}
        </div>
    );
}

export default Checkout;