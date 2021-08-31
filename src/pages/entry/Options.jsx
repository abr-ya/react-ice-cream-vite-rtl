import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../components/AlertBanner/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

const SERVER = 'https://api-ice-cream.herokuapp.com';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(`${SERVER}/${optionType}`, { cancelToken: cancelTokenSource.token })
      .then((response) => setItems(response.data))
      .catch(() => setError(true));

    return () => {
      cancelTokenSource.cancel();
    };
  }, [optionType]);

  if (error) {
    // @ts-ignore
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
    />
  ));

  return (
    <div>
      <h2>{title}</h2>
      <p>{`${formatCurrency(pricePerItem[optionType])} each`}</p>
      <p>{`${title} total: ${orderDetails.totals[optionType]}`}</p>
      <Row>{optionItems}</Row>
    </div>
  );
};

export default Options;
