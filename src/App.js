import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('World Wide')


  const menuItems = countries.map((item, i) => <MenuItem value={item.value} key={i} >{item.name}</MenuItem>)



  useEffect(() => {

    const getCountries = async () => {

      await fetch("https://disease.sh/v3/covid-19/countries")
            .then((res) => res.json())
            .then((data) => {
              const dt = data.map(item => ({
                name: item.country,
                value: item.countryInfo.iso2
              }))

            setCountries(dt)
        })
    }
    getCountries()
  }, [])

  const onChangeCountry = (e)=>{
      
    const selectedCountry = e.target.value
    setCountry(selectedCountry)

  }


  return (
    <div className="app">
      <div className="app__header">

        <h1>Covid Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value={country} onChange={onChangeCountry} >
          <MenuItem value='World wide' > World Wide </MenuItem>
            {menuItems}

          </Select>
        </FormControl>

      </div>
      <div className='info__stats'>

      </div>



      {/* 
        header : Title  + Select input dropdown field 
      */}

      {/* 3 info box components */}

      {/* Graph */}
      {/* Table */}
      {/* Maps */}


    </div>

  );
}

export default App;
