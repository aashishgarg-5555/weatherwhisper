import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io';
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind} from 'react-icons/bs';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';

const APIkey = 'b2acf092bd982574b78d40815f1a25be';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Delhi');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e)=> {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if(inputValue!=='')
    {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    if(input.value === '')
    {
      setAnimate(true);
      setTimeout(()=> {
        setAnimate(false);
      },500);
    }
    
    input.value='';

    e.preventDefault();
  };

  useEffect(()=> {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setTimeout(() => {
        setLoading(false);
        setData(res.data);
      }, 1500);
    });
  },[location]);

  if(!data)
  {
    return (
      <div>
        <div>
          <ImSpinner8 className='text-4xl animate-spin'></ImSpinner8>
        </div>
      </div>
    );
  }

  const date = new Date();

  let icon;
  switch(data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy/>
      break;

    case 'Snow':
      icon = <IoMdSnow/>
      break;

    case 'Rainy':
      icon = <IoMdRainy/>
      break;

    case 'Thunderstorm':
      icon = <IoMdThunderstorm/>
      break;

    case 'Clear':
      icon = <IoMdSunny/>
      break;
    
    case 'Haze':
      icon = <BsCloudHaze2Fill/>
      break;

    case 'Drizzle':
      icon = <BsCloudDrizzleFill/>
      break;
  }

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {/* {form} */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input onChange={(e)=> handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[20px] font-light pl-16 h-full' type='text' placeholder='Search by city or country'></input>
          <button onClick={(e)=> handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdb] w-20 h-12 rounded-full flex justify-center items-center transition'>
            <IoMdSearch className='text-2xl text-white'/>
          </button>
        </div>
      </form>
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        { loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <ImSpinner8 className='text-white text-5xl animate-spin'/>
            </div>
          ) : (
          <div>
          {/* {card top} */}
          <div className='flex items-center gap-x-5'>
            <div className='text-[87px]'>{icon}</div>
            <div>
              {/* {country name} */}
              <div className='text-2xl font-semibold'>
                {data.name}, {data.sys.country}
              </div>
              {/* {date} */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* {card body} */}
          <div className='my-20'>
            <div className='flex justify-center items-center'>
              {/* {temp} */}
              <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
              {/* {celsius icon} */}
              <div className='text-4xl'> <TbTemperatureCelsius/></div>
            </div>
            {/* {weather des} */}
            <div className='capitalize text-center text-[25px]'>
              {data.weather[0].description}
            </div>
          </div>
          {/* {card bottom} */}
          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
            <div className='flex justify-between'>
            {/* {visi} */}
              <div className='flex items-center gap-x-2 hover:scale-125 hover:transition-all hover:ease-in-out hover:delay-50 hover:cursor-pointer'>
                  {/* {icon} */}
                <div className='text-[20px]'>
                  <BsEye/>
                </div>
                <div>
                  Visibility{' '}
                  <span className='ml-2'>{data.visibility / 1000} km</span>
                </div>
              </div>
              {/* {feels} */}
              <div className='flex items-center gap-x-2 hover:scale-125 hover:transition-all hover:ease-in-out hover:delay-50 hover:cursor-pointer'>
                {/* {icon} */}
                <div className='text-[20px]'>
                  <BsThermometer/>
                </div>
                <div className='flex'>
                  Feels Like
                  <div className='flex ml-2'>
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius/>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
            {/* {humi} */}
              <div className='flex items-center gap-x-2 hover:scale-125 hover:transition-all hover:ease-in-out hover:delay-50 hover:cursor-pointer'>
                  {/* {icon} */}
                <div className='text-[20px]'>
                  <BsWater/>
                </div>
                <div>
                  Humidity
                  <span className='ml-2'>{data.main.humidity} %</span>
                </div>
              </div>
              {/* {wind} */}
              <div className='flex items-center gap-x-2 hover:scale-125 hover:transition-all hover:ease-in-out hover:delay-50 hover:cursor-pointer'>
                {/* {icon} */}
                <div className='text-[20px]'>
                  <BsWind/>
                </div>
                <div>Wind
                  <span className='ml-2'>{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;