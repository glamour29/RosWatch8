import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';
import requestHandler from '../../utils/requestHandle';

const RatingStar = ({ isDisable, ratingStar, productId }) => {
  const [rating, setRating] = useState(ratingStar ? ratingStar : 0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (ratingStar) {
      setRating(ratingStar);
    } else {
      setRating(0);
    }
  }, [ratingStar]);
  const handleClickRating = (ratingValue) => {
    setRating(ratingValue);
    handleRating(ratingValue);
  };

  const handleRating = async (ratingValue) => {
    const ratingObject = {
      userID: localStorage.getItem('user_id'),
      productID: productId,
      star: ratingValue,
    };

    try {
      const response = await requestHandler.put('rating/', ratingObject);
      console.log('rating successfully ', response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-row'>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type='radio'
              name='rating'
              className='hidden'
              value={rating}
              onClick={() => {
                handleClickRating(ratingValue);
              }}
              disabled={isDisable}
            />
            <FaStar
              className='transition  cursor-pointer'
              color={ratingValue <= (rating || hover) ? 'gold' : 'gray'}
              onMouseEnter={() => {
                if (!isDisable) {
                  setHover(ratingValue);
                }
              }}
              onMouseLeave={() => setHover(null)}
              size={20}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStar;
