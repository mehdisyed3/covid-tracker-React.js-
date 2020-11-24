import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent, } from '@material-ui/core';
import { useEffect, useState } from 'react';

import InfoBox from './InfoBox';
import Map from './Map'


// watch video 2:04:00

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('World Wide')
  const [countryInfo, setCountryInfo] = useState({})


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

  const onChangeCountry = async (e) => {

    const selectedCountry = e.target.value
    setCountry(selectedCountry)

    const url = selectedCountry === 'World wide' ? "https://disease.sh/v3/covid-19/all" 
                                                 : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`

    await fetch(url)
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data)
    })

  }


  return (
    <div className="app">
      <div className='app__left'>

        <div className="app__header">

          <h1>Covid Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country}  onChange={onChangeCountry} >

              <MenuItem value='World wide' > World Wide </MenuItem>
              {menuItems}

            </Select>
          </FormControl>

        </div>
        <div className='app__stats'>
          <InfoBox title='Coranavirus Cases' cases={2134} total={234} />
          <InfoBox title='Recovered' cases={1234} total={431234} />
          <InfoBox title='Deaths' cases={3412} total={45132} />
        </div>

        <Map />

      </div>
      <Card className='app__right'>
        <CardContent>
          Hello
        </CardContent>

      </Card>

    </div>

  );
}

export default App;
