import React from 'react';
import Slider from 'react-slick';

const similarProducts = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://luxurywatchbuyer.com/wp-content/uploads/2015/04/banner-2.png',
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://i.pinimg.com/736x/26/a6/bf/26a6bf5b167a360f2ef0dbed1f3773c0.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://www.shopavenue.co.za/wp-content/uploads/2018/08/banner-1024x390.jpg',
  },
];

const settings = {
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2500,
  cssEase: 'linear',
};

const Carousel = () => {
  return (
    <div className='rounded-md'>
      <Slider {...settings}>
        {similarProducts.map((item, index) => {
          return (
            <img
              key={index}
              className='w-[1244px] h-[450px] rounded-lg'
              src={item.image}
              alt={item.name}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
