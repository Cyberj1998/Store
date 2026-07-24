import LocationIcon from '../assets/images/location.svg'
import ContactIcon from '../assets/images/contact.svg'

const Footer = () => {
  return (
    <div className='bg-[#4a4e65] h-70 w-full p-2 flex justify-start items-start flex-col'>
      <div className='flex justify-center items-center flex-row'>
        <h3 className='uppercase text-white font-semibold text-[20px] max-md:text-[15px]'>Direccion</h3>
        <img 
          src={LocationIcon} 
          alt="location" 
          className='h-7 w-7 m-2'
        />
      </div>
      <p className='text-[#bfbfbf] font-sans text-[15px] max-md:text-[12px]'>1ra del oeste entre carretera central y primera del sur</p>
      <div className='flex justify-center items-center flex-row'>
        <h1 className='uppercase text-white font-semibold text-[20px] max-md:text-[15px]'>contacto</h1>
        <img 
          src={ContactIcon} 
          alt="contact" 
          className='h-6 w-6 m-2'
        />
      </div>
      <p className='text-[#bfbfbf] font-sans text-[15px] max-md:text-[12px]'>+53 50219524</p>
    </div>
  )
}

export default Footer
