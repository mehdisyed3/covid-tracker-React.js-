import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent, } from '@material-ui/core';
import { useEffect, useState } from 'react';

import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table'



// watch video 2:18:00

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('World Wide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData]= useState([])



  const menuItems = countries.map((item, i) => <MenuItem value={item.value} key={i} >{item.name}</MenuItem>)

  useEffect(()=>{
    
    fetch("https://disease.sh/v3/covid-19/all")
    .then((res)=>res.json())
    .then((data) =>{

      setCountryInfo(data)
    })

  }
    ,[])

  useEffect(() => {

    const getCountries =  () => {

        fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const dt = data.map(item => ({
            name: item.country,
            value: item.countryInfo.iso2
          }))
          setCountries(dt)
          setTableData(data)
          
        })
    }
    getCountries()
  }, [])

  const onChangeCountry = async (e) => {

    const selectedCountry = e.target.value
    // setCountry(selectedCountry)

    const url = selectedCountry === 'World Wide' ? "https://disease.sh/v3/covid-19/all" 
                                                 : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`

    await fetch(url)
    .then(res => res.json())
    .then(data => {
      setCountry(selectedCountry)
      setCountryInfo(data)
    })

    // console.log(countryInfo)

  }

  
  console.log(tableData)
  return (
    <div className="app">
      <div className='app__left'>

        <div className="app__header">

          <h1>Covid Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country}  onChange={onChangeCountry} >

              <MenuItem value='World Wide' > World Wide </MenuItem>
              {menuItems}

            </Select>
          </FormControl>

        </div>
        <div className='app__stats'>
          <InfoBox title='Coranavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />

      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases By Countries</h3>
          <Table list={tableData} />
        </CardContent>

      </Card>

    </div>

  );
}

export default App;
