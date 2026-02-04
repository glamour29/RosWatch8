import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import requestHandler from '../../utils/requestHandle';
import CardItem from './CardItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const Top5Product = () => {
  const [top, setTop] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTop5();
  }, []);

  const fetchTop5 = async () => {
    try {
      const response = await requestHandler.get('product/top5');
      const data = await response.data.data;
      setTop(data);
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  const renderCardItems = () => {
    return top.map((item, i) => {
      return (
        <CardItem
          item={item}
          key={i}
        />
      );
    });
  };

  return (
    <div className='mt-4'>
      <p className='text-main-black text-4xl font-bold py-5 border-b-2 border-gray-400'>
        SẢN PHẨM BÁN CHẠY
      </p>
      <Slider
        {...settings}
        className='mt-3'
      >
        {renderCardItems()}
      </Slider>
    </div>
  );
};

export default Top5Product;
