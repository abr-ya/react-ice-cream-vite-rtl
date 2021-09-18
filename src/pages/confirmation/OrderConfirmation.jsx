import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../../components/AlertBanner/AlertBanner';

const SERVER = 'https://api-ice-cream.herokuapp.com';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST
      .post(`${SERVER}/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  const handleClick = () => {
    resetOrder(); // clear the order details
    setOrderPhase('inProgress'); // send back to order page
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>{`Your order number is ${orderNumber}`}</p>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  }
  return <div>Loading</div>;
};

export default OrderConfirmation;
