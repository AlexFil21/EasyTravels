import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import {Feather, EvilIcons} from '@expo/vector-icons'
import Sliderdouble from '../component/SliderDouble'
import moment from 'moment'
import ModalWindow from '../component/ModalWindow'
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../constant/Colors'


const SearchScreen = props => {
    const [state, setState] = useState({travelDates:'Дата вылета', dates: '#828889', start: '#828889', firstCity: "Вылет из", endCity: 'Куда', end: '#828889',  tourLeng: [2,7], travelersCount: false, travelersCountColor: '#828889'})
    const { endCity, end,firstCity, start, tourLeng, travelDates, dates, travelersCount, travelersCountColor} = state

    const textStyles = {
        fontSize: 17, 
        marginLeft: 5, 
        fontFamily: 'avenir-next',
        color: '#828889', 
        letterSpacing: -0.1
    }
     
    useEffect(() => {
        const fromDate = props.navigation.getParam('firstDay'),
              toDate = props.navigation.getParam('lastDay'),
              convertFromDate = moment(fromDate).format("DD.MM.YY")
            
        if(props.navigation.getParam('send')) {
            if(toDate == undefined) {
                setState({
                    ...state,
                    travelDates: convertFromDate,
                    dates: (Color.primary)
                })
            } else {
                const convertToDate = moment(toDate).format("DD.MM.YY")
                        result = convertFromDate + "-" + convertToDate
                setState({
                    ...state,
                    travelDates: result,
                    dates: (Color.primary)
                })
            }
        }
             
    }, [props.navigation.getParam('firstDay'), props.navigation.getParam('send'), props.navigation.getParam('lastDay')])
    

    const travelersAmount = (value) => { 
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        setState({
            ...state,
            travelersCount: arrSum(value),
            travelersCountColor: ( arrSum(value) != 0 ? Color.primary : '#828889')
        })
    }

    const toursLength = (arr) => {
       setState({
           ...state,
           tourLeng: arr
       })
    }

    const goFromWC = () => {
        const goFr = props.navigation.getParam('goFrom')
       
        if (goFr) {    
            if(goFr.length > 0) {
                if (firstCity == goFr.join(', ')) {
                    return false
                }
                setState({
                    ...state,
                    firstCity: goFr.join(', '),
                    start: (Color.primary)
                })
            } else if (goFr.length == 0) {
                if(firstCity == "Вылет из") {
                    return false
                }
                setState({
                    ...state,
                    firstCity: "Вылет из",
                    start: '#828889'
                })                    
            }
        }
        return false
    }

    const goToWC = () => {
        const whereGoArr = props.navigation.getParam('goTo')
        
        if (whereGoArr) {
            if(whereGoArr.length > 0) {
                if (endCity == whereGoArr.join(', ')) {
                    return false
                }
                setState({
                    ...state,
                    endCity: whereGoArr.join(', '),
                    end: (Color.primary)
                })
            } else if (whereGoArr.length == 0) {
                if(endCity == 'Куда') {
                    return false
                }
                setState({
                    ...state,
                    endCity: 'Куда',
                    end: '#828889'
                })
            }
        }

        return false
    }
    
    const findTour = () => {
    //    const result = {
    //                     startCity: firstCity,
    //                     finishCity: endCity ,
    //                     trDates: travelDates,
    //                     length: tourLeng,
    //                     travelers: travelersCount
    //                 }
    //     if (firstCity == "Вылет из" || endCity == 'Куда' || travelDates == 'Дата вылета' || travelersCount == false ) {
    //         setState({
    //             ...state,
    //             start: (start == '#828889' ? 'red' : start ),
    //             end: (end == '#828889' ? 'red' : end ),
    //             dates: (dates == '#828889' ? 'red' : dates ),
    //             travelersCountColor: (travelersCountColor == '#828889' ? 'red' : travelersCountColor )
    //         })
    //     }   
        props.navigation.navigate('FoundedTours', {
                        title: tourLeng
        })
        return false
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar barStyle="dark-content" />
        <LinearGradient 
                    colors={['204.81deg', '#DAFFEB', '0%', 'rgba(255, 255, 255, 0)', '109.48%']} 
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                      }}>
        <View style={styles.container}>

         <View style={styles.wrap}>
            <TouchableOpacity style={styles.search}>
                <Text style={[textStyles, {fontSize: 17, color: '#FFFFFF', fontFamily: 'avenir-next-medium'}]}>Поиск туров</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => props.navigation.navigate('History')} >
                <Text style={[textStyles, { fontSize: 17, color: 'black', fontFamily: 'avenir-next-medium'}]}>История поиска</Text>
            </TouchableOpacity>
        </View>
        
            <TouchableOpacity style={[styles.addcountry, {borderWidth: start == 'red' ? 1 : null, borderColor: 'red'}]}
                onPress={() => {
                    props.navigation.navigate("GoFrom")
                }}
            >
                <EvilIcons name="location" size={30} color={start}/>
                <Text style={[textStyles, {color: start == Color. primary ? 'black' : '#828889'}]}>
                        {goFromWC() == false ? firstCity : null}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.addcountry, {borderWidth: end == 'red' ? 1 : null, borderColor: 'red'}]}
                onPress={() => {
                    props.navigation.navigate("GoTo")
                }}
            >
                <EvilIcons name="location" size={30} color={end}/>
                <Text style={[textStyles, {color: end == Color. primary ? 'black' : '#828889'}]}>
                    {goToWC() == false ? endCity : null}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.calendar, { borderWidth: dates == 'red' ? 1 : null, borderColor: 'red'}]} 
                onPress={() => {
                    props.navigation.navigate("Calendar")
                }}
            >
                <Feather name="calendar" size={20} color={dates}/>
                <Text style={[textStyles, {marginLeft: 10, color: dates == Color. primary ? 'black' : '#828889'}]}>
                    {travelDates}
                </Text>
            </TouchableOpacity>

            <View style={styles.slider}>
                <View style={styles.tourLength}>
                    <View style={{flexDirection: 'row'}}>
                        <Feather name="clock" size={20} color='#32CD32'/>
                        <Text style={[textStyles, {color: '#060606', marginLeft: 10}]}>Длительность тура</Text>
                    </View>
                    <View>
                        <Text>{tourLeng[0]}-{tourLeng[1]} дней</Text>
                    </View>
                </View>
                    <Sliderdouble lengs={toursLength}/>
            </View>

            <View style={{width: '90%', marginTop: 10}}>
                <ModalWindow  amount = {travelersAmount} color={travelersCountColor}/>
            </View>
            <TouchableOpacity style={styles.findTour} onPress={() => findTour()}>
                <Text style={styles.findText}>Найти туры</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
        </View>
    )
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '10%',
    },
    text: {
        fontSize: 30
    },
    calendar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 15
    },
    whereStart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
    },
    addcountry: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    tourLength: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        paddingLeft: 0
    },
    slider: {
        width: '90%',
        margin: 10,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 5
    },
    wrap: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20
    },
    search: {
        backgroundColor: '#17C164',
        borderRadius: 15,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 9,
        paddingBottom: 9,
    },
    findTour: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#FFAC30',
        borderRadius: 4,
        marginTop: 20
    }, 
    findText: {
        fontFamily: 'avenir-next-medium',
        fontSize: 20,
        paddingTop: 16,
        paddingBottom: 16,
        letterSpacing: 0.4,
        color: 'white'
    }
})



export default SearchScreen