import React, { useState, useEffect } from 'react';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { View, Text, FlatList, Image } from 'react-native'
import Header from './Header.js'
import AsyncStorage from '@react-native-community/async-storage';

const Home = (props) => {
    const [info, setInfo] = useState({
        name: "loading",
        temp: "loading",
        humidity: "loading",
        desc: "loading",
        icon: "loading"
    })
    useEffect(() => {
        getWeather()
    }, [])
    let API_KEY // Your Open Weather Map API Key
    const getWeather = async() => {
        let mycity = await AsyncStorage.getItem("newcity")
        if(!mycity) {
            const {city} = props.route.params
            mycity = city
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mycity}&APPID=${API_KEY}&units=metric`)
        .then(data => data.json())
        .then(results => {
            setInfo({
                name: results.name,
                temp: results.main.temp,
                humidity: results.main.humidity,
                desc: results.weather[0].description,
                icon: results.weather[0].icon
            })
        })
        .catch(err => {
            alert(err.message)
        })
    }
    if(props.route.params.city != "london") {
        getWeather()
    }
    return (
        <View style = {{
            flex:1
        }}>
            <Header name = "Weather App" />
            <View style = {{
                alignItems: "center"
            }}>
                <Title style = {{
                    color: "#00aaff",
                    marginTop: 30,
                    fontSize: 30
                }}>
                    {info.name}
                </Title>
                <Image 
                    style = {{
                        width: 120,
                        height: 120
                    }}
                    cource = {{uri: `https://openweathermap.org/img/w/${info.icon}.png`}}
                />
            </View>
            <Card style = {{
                margin: 5,
                padding: 12
            }}>
                <Title style = {{
                    color: "#00aaff"
                }}>
                    Temperature - {info.temp}
                </Title>
            </Card>
            <Card style = {{
                margin: 5,
                padding: 12
            }}>
                <Title style = {{
                    color: "#00aaff"
                }}>
                    Humidity - {info.humidity}
                </Title>
            </Card>
            <Card style = {{
                margin: 5,
                padding: 12
            }}>
                <Title style = {{
                    color: "#00aaff"
                }}>
                    Description - {info.desc}
                </Title>
            </Card>
        </View>

    )
}

export default Home;