import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent, } from '@material-ui/core';
import { useEffect, useState } from 'react';

import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css";
import {prettyPrintStat} from './util'



// watch video 4:20:00

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('World Wide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData]= useState([])
  const [casesType, setCasesType] = useState("cases")
  const [mapCountries, setMapCountries] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 40.80746, lng: 20.4796 })
  const [mapZoom, setMapZoom] = useState(2)



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
          const sorted = data.sort(function(a,b){return b.cases - a.cases })
          setTableData(sorted)
          setMapCountries(data)
          
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

      selectedCountry === "World Wide" ? 
                                      setMapCenter([40.80746, 20.4796]) :
                                      setMapCenter([data.countryInfo.lat, data.countryInfo.long])

      setMapZoom(4)
    
      // console.log("@@@@",data.countryInfo)
      // console.log(mapCenter)

    })



  }
  return (
    <div className="app">
      <div className='app__left'>

        <div className="app__header">

          <h1 className='heading'>Covid Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country}  onChange={onChangeCountry} >

              <MenuItem value='World Wide' > World Wide </MenuItem>
              {menuItems}

            </Select>
          </FormControl>

        </div>
        <div className='app__stats'>
          <InfoBox onClick={()=>setCasesType('cases')} title='Coranavirus Cases' active={casesType === "cases"} cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} />
          <InfoBox onClick={()=>setCasesType('recovered')} title='Recovered' active={casesType === 'recovered'} cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} />
          <InfoBox onClick={()=>setCasesType('deaths')} title='Deaths' active={casesType === "deaths"} cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} />
        </div>

        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      </div>
      <Card className='app__right'>
        <CardContent>
          <h3 className="heading" >Live Cases By Countries</h3>
          <Table list={tableData} />
        </CardContent>

        <LineGraph casesType={casesType} />
      </Card>
      

    </div>

  );
}

export default App;
