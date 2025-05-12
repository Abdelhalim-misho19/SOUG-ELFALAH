import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';

const Categorys = () => {
  const { categorys, serviceCategories } = useSelector((state) => state.home);

  // Combine product and service categories with a type identifier
  const allCategories = [
    ...categorys.map((c) => ({ ...c, type: 'product' })),
    ...serviceCategories.map((c) => ({ ...c, type: 'service' })),
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mdtablet: { breakpoint: { max: 991, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
    smmobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
    xsmobile: { breakpoint: { max: 440, min: 0 }, items: 1 },
  };

  return (
    <div className="w-[90%] mx-auto py-10">
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-700 font-extrabold pb-6">
        <h2 className="relative">
          Top Categories
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[3px] bg-[#059473] rounded-full"></span>
        </h2>
      </div>

      {allCategories.length > 0 ? (
        <Carousel
          autoPlay={true}
          infinite={true}
          arrows={true}
          responsive={responsive}
          transitionDuration={500}
          className="py-4"
        >
          {allCategories.map((item, i) => (
            <Link
              key={i}
              to={item.type === 'product' ? `/products?category=${item.name}` : `/services?category=${item.name}`}
              className="h-[200px] border block mx-2 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-full relative p-3 bg-gradient-to-t from-black/60 to-transparent">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${
                      item.type === 'product' ? 'bg-[#059473]' : 'bg-[#ff6f61]'
                    }`}
                  >
                    {item.type === 'product' ? 'Product' : 'Service'}
                  </span>
                </div>
                <div className="absolute bottom-4 w-full left-0 flex justify-center items-center">
                  <span className="py-2 px-6 bg-[#059473] text-white font-semibold rounded-full shadow-md">
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default Categorys;