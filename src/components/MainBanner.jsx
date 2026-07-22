import Banner from '../assets/images/promos/banner-1.jpg'
import Banner2 from '../assets/images/promos/banner-2.jpg'

const MainBanner = () => {

  const Banners = [Banner, Banner2]

  return (
    <div className='h-70 flex w-[90%] justify-self-center max-md:w-[90%] m-5 rounded-2xl'>
      <img 
        src={Banners[0]}
        alt="promo" 
        className='h-full w-full rounded-2xl'
      />
    </div>
  )
}



export default MainBanner
