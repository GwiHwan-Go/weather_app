import React from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import Weather from './Weather';
import axios from "axios";
import * as Location from 'expo-location';

const API_KEY = "da3922fb34e310fdaf189514e3320827";
export default class extends React.Component{

    state={
        isLoading : true,
    }
    getWeather = async(latitude,longitude) => {
        const url = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        const {data: {
            main :{ temp },weather}} = await axios.get(url);
        this.setState({
            isLoading:false,
            temp: data.main.temp,
            condition:weather[0].main,});
    }
    getLocation = async() => {
      try {
          await Location.requestForegroundPermissionsAsync();
          const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync();
          this.getWeather(latitude,longitude);
        } 
        catch (error)
        {
          Alert.alert("Can't find you.", "So sad");

      }
      
  }
  componentDidMount(){
      this.getLocation();
  }
  render(){
      const {isLoading, temp, condition} = this.state;
      return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
  }
}

