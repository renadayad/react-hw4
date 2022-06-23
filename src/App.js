import './App.css';
import { useEffect, useState } from 'react';

const App = () => {


  const [counterName, setCountryName] = useState('');
  const [searchedCountry, setSearchedCountry] = useState('');
  const [temperatureCount, setTemperatureCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [ setForecastCount ] = useState('');
  const [windCount, setWindCount] = useState(0);
  
  useEffect(() => {
    const getDataFromApi = async () => {
      const request = await fetch('https://goweather.herokuapp.com/weather');
      const data = await request.json();
      setTemperatureCount(data.temperature);
      setWindCount(data.wind);
      setDescriptionCount(data.description);
      setForecastCount(data.forecast);
    };
    getDataFromApi();
  }, []);

  const onClick = async (e) => {
    const request = await fetch(
      'https://goweather.herokuapp.com/weather/' + counterName
    );
    const data = await request.json();

    if (request.status !== 200) {
      alert(data.error.message);
      return;
    }
    setSearchedCountry(counterName);
    setTemperatureCount(data.temperature);
    setWindCount(data.wind);
    setDescriptionCount(data.description);
    setForecastCount(data.forecast.value);
    setCountryName('');
  };

  return (
    <div className='container'>
        <>
        <img
            src={"https://media.baamboozle.com/uploads/images/67032/1597541431_42856"}
            width='800rem'
            height='300rem'
            alt='covid19'
            className='rounded mx-auto d-block'
          ></img>
          <h1 className='text-center'> The Weather</h1>
          <div className='input-group  mt-3'>
            <input 
              type='text'
              value={counterName}
              onChange={(e) => setCountryName(e.target.value)}
              className='form-control'
              placeholder='Country name'
            />
            <button
              onClick={onClick}
              className='card'
              type='button'
            >
              take data
            </button>

            <h3 className='text-center mt-3 w-100'>
           The  Country weather {' '}
              <span style={{ color: '#61dafb' }}>{searchedCountry}</span> as follow
              :
            </h3>
            <div className='data mt-3'>
              <div className='card2'>
                <h3 className="text-center">Temperature</h3>
                <h3 className="text-center">{temperatureCount}</h3>
              </div>
              <div className='text-center'>
                <h3 className="card-Wind">Wind</h3>
                <h3 className="text-center">{windCount}</h3>
              </div>
              <div className='text-center'>
                <h4 className="card1-Description">Description</h4>
                <h4 className="text-center">{descriptionCount}</h4>
              </div>
            </div>
          </div>
        </>
    </div>
  );
};

export default App;