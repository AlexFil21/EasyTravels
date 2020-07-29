import React, {Component} from 'react';
import {View, Button, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import Colors from '../constant/Colors'
import {AntDesign} from '@expo/vector-icons'
import ShowPrice from './ShowPrice'

LocaleConfig.locales['uk'] = {
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Понедiлок','Вiвторок','Середа','Четвер',"П'ятниця",'Cубота','Недiля'],
    dayNamesShort: ['Пн','Вт','Ср','Чт','Пт','Сб','Нд']
  };
  
  LocaleConfig.defaultLocale = 'uk';

export default class MultiCalendar extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Дата вылета',
            headerTintColor: 'black',
            headerBackTitle: 'Назад'
        };
      }

      constructor(props){
          super(props)
          this.state = {
              currentData: new Date().toISOString().slice(0,10),
              finalData: null,
              colors: 'white',
              dateOrPrice: 'date'
          }
          this.changeData = this.changeData.bind(this)
          this.datePriceHandler = this.datePriceHandler.bind(this)
      }


    changeData (e) {
        let date = e.dateString,
            date1 = this.state.currentData,
            date2 = this.state.finalData
        
        if (date2 === null) { 
            if (date1 < date) {
                this.setState({
                   finalData: date
                })
            } else {
                this.setState({
                    currentData: date
                 })
            }    
        } else {
            this.setState({
                currentData: date,
                finalData: null
            })
        }
    }

    datesBetweenLength (fromDate, toDate) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const datesArr = []
    
       function dateDiffInDays (a, b) {
            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

        const   a = new Date(fromDate),
                b = new Date(toDate),
                difference = dateDiffInDays(a, b) 

        for (let i=1; i<difference; i++) {
            const day = new Date(fromDate);
            const nextDay = new Date(day);

            nextDay.setDate(day.getDate() + i);
            datesArr.push(nextDay.toISOString().slice(0,10))
        }
    
        return datesArr
    }

    getAllDatesBetween (fromDate, toDate) {
        const datesForCalendar = {};

        datesForCalendar[fromDate] = {
            quickAction: true,
            first: true,  
        };

        if (toDate) {
        const allDatesBetween = this.datesBetweenLength(fromDate, toDate)
        const periodDates = {}

            periodDates[fromDate] = {
                startingDay: true,
                color: Colors.primary,
                textColor: 'white',
            };

            for(let i=0; i<allDatesBetween.length; i++){
                periodDates[allDatesBetween[i]] = {
                    color: '#90EE90',
                    textColor: 'black'
               }
            }

            periodDates[toDate] = {
                endingDay: true,
                color: Colors.primary,
                textColor: 'white'
            };
            return periodDates;
        }
       
        return datesForCalendar;
    };

    datePriceHandler () {
        if (this.state.dateOrPrice == 'date') {
            return (
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <View style={styles.handler}>
                        <View style={{width: 161, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 7, margin: 1}}>
                            <Text style={{fontFamily: 'avenir-next-medium', fontSize: 14, letterSpacing: -0.1}}>По дате</Text>
                        </View>
                        <TouchableOpacity style={{width: 161, height: 26, justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => this.setState({dateOrPrice: 'price'})}
                        >
                            <Text>По цене</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <View style={styles.handler}>
                    <TouchableOpacity style={{width: 158, height: 26, justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => this.setState({dateOrPrice: 'date'})}                    
                    >
                        <Text>По дате</Text>
                    </TouchableOpacity>
                    <View style={{width: 160, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 7, margin: 1}}>
                        <Text style={{fontFamily: 'avenir-next-medium', fontSize: 14, letterSpacing: -0.1}}>По цене</Text>
                    </View>
                </View>
            </View>
        )
    }

     render() { 
        const {currentData, finalData} = this.state
        
        return (
            <View>
                {this.datePriceHandler()}
                { this.state.dateOrPrice == 'date' ?
                <View style={{height: '85%'}}>
                    <CalendarList
                    current={currentData}
                    onDayPress={this.changeData}
                    markingType={"period"}
                    markedDates={this.getAllDatesBetween(currentData, finalData)}
                    theme={{
                        // calendarBackground: '#F0FFFF',
                        textSectionTitleColor: 'black',
                        dayTextColor: 'black',
                        todayTextColor: 'black',
                        selectedDayTextColor: 'white',
                        monthTextColor: 'black',
                        indicatorColor: 'black',
                        selectedDayBackgroundColor: '#333248',
                        'stylesheet.calendar.header': {
                        week: {
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderBottomWidth: 1, 
                            borderBottomColor: 'lightgrey',
                        },
                        monthText: {
                            fontSize: 15,
                            fontWeight: 'bold',
                        },
                        dayHeader: {
                            color: 'lightgrey',
                            textAlign: 'center',
                        },
                        header: {
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10,
                            margin: 10,
                            alignItems: 'center'
                        }
                        },
                        'stylesheet.day.period': {
                            todayText: {
                                fontWeight: '400',
                            },
                            text: {
                                marginTop: 7,
                                fontSize: 15
                            },
                            wrapper: {
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                marginLeft: -1,
                                borderRadius: 10
                                },
                                firstQuickAction: {
                                    backgroundColor: Colors.primary
                                }
                        }
                    }}
                    />
                </View>
                : <ShowPrice/> }
                
                    <View style={styles.btnHandler}>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => {
                                const result = 'can send'

                                this.props.navigation.navigate('Search', {
                                    firstDay: currentData,
                                    lastDay: finalData,
                                    send: result
                                })
                                }
                            }
                        >
                            <Text style={styles.btnText}>Выбрать</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            ) 
     }
}


const styles = StyleSheet.create({
    btn: {
        width: '90%',
        borderRadius: 5,
        padding: 8,
        margin: 10,
        backgroundColor: Colors.primary,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 15
    },
    btnHandler: {
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    },
    handler: {
        width: 320,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})