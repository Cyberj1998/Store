import FirtsImage from '../assets/images/promos/bentoPromo-1.jpg'
import SecondImage from '../assets/images/promos/bentoPromo-2.jpg'
import ThirdImage from '../assets/images/promos/bentoPromo-3.jpg'
import FourImage from '../assets/images/promos/bentoPromo-4.jpg'


const BentoGrid = () => {
  const images = [
    { src: FirtsImage, span: "col-span-2 row-span-2" },
    { src: SecondImage, span: "col-span-1 row-span-1" },
    { src: ThirdImage, span: "col-span-1 row-span-1" },
    { src: FourImage, span: "col-span-3 row-span-1" },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 p-4 h-100 w-[90%] rounded-2xl mx-auto">
      {images.map((img, i) => (
        <div key={i} className={`${img.span} overflow-hidden rounded-xl shadow-lg`}>
          <img
            src={img.src}
            alt={`Bento ${i + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;