import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HomeAdBanners = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null; // Don't render if no banners
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full">
      <div className="w-[90%] lg:w-[85%] mx-auto">
        <div className="w-full my-6">
          <Carousel
            autoPlay={true}
            autoPlaySpeed={4000}
            infinite={true}
            arrows={true}
            showDots={true}
            responsive={responsive}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list"
            itemClass="px-2"
          >
            {banners.map((b, i) => (
              <a
                key={i}
                href={b.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full max-w-[1200px] h-[200px] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
                aria-label={b.title || 'Advertisement'}
              >
                <div className="relative w-full h-full">
                  <img
                    src={b.bannerImage}
                    alt={b.title || 'Advertisement'}
                    className="w-[1200px] h-[200px] object-fill transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {b.title && (
                    <div className="absolute bottom-4 left-4 text-white text-sm md:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {b.title}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomeAdBanners;