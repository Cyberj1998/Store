import { useState, useEffect, useCallback } from 'react';
import Banner from '../assets/images/promos/banner-1.jpg';
import Banner2 from '../assets/images/promos/banner-2.jpg';
import LeftArrow from '../assets/images/left.png';
import RightArrow from '../assets/images/right.png';

const MainBanner = () => {
  const Banners = [Banner, Banner2];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Banners.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [Banners.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + Banners.length) % Banners.length);
  }, [Banners.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % Banners.length);
  }, [Banners.length]);

  return (
    <div className="relative w-[90%] h-70 max-md:h-50 justify-self-center m-5 rounded-2xl overflow-hidden">
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Banners.map((banner, index) => (
          <div key={index} className="w-full shrink-0 flex justify-center items-end overflow-hidden">
            <img
              src={banner}
              alt={`promo-${index}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#2d2d2d29] hover:bg-[#2d2d2d50] flex justify-center items-center cursor-pointer transition-colors z-10"
      >
        <img src={LeftArrow} alt="arrow" className="h-8 w-8" />
      </button>

      {/* Right arrow */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#2d2d2d29] hover:bg-[#2d2d2d50] flex justify-center items-center cursor-pointer transition-colors z-10"
      >
        <img src={RightArrow} alt="arrow" className="h-8 w-8" />
      </button>
    </div>
  );
};

export default MainBanner;