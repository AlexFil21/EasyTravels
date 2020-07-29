import React, {useEffect, useState} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign, Feather, EvilIcons} from '@expo/vector-icons'
import PriceSlider from '../component/PriceSlider'
import LengthSlider from '../component/LengthSlider'
import Color from '../constant/Colors'



const HistorySearchFilter = (props) => {
    const [state, setState] = useState({firstCity: '', start: '#828889', end: '#828889', endCity: '', length: [2,7], price: [15000, 32000]})
    const {firstCity, endCity, start, end, length, price} = state
    
    const textStyles = {
        fontSize: 17, 
        marginLeft: 5, 
        fontFamily: 'avenir-next',
        color: '#828889', 
        letterSpacing: -0.4
    }

    const toursLength = (arr) => { 
            setState({
                ...state, 
                length: arr
            })
    }

    const filterPrice = (arr) => {
        setState({
            ...state, 
            price: arr
        })
    }

    const submitFilter = () => {
    const result = {
                    startCity: firstCity,
                    finishCity: endCity,
                    leng: length,
                    pr: price
                    }
    if (firstCity == "" || endCity == '') {
         setState({
             ...state,
             start: (start == '#828889' ? 'red' : start ),
             end: (end == '#828889' ? 'red' : end )
         })
    } else if (firstCity && endCity) {
         props.hideWindow(false)
    }
        console.log(result);
          
        return false
    }

    return (
        <View style={styles.container}>
            <Modal 
                animationIn='slideInUp'
                animationOut='slideOutDown'
                isVisible={props.show} 
                style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.closeTab}>
                        <AntDesign name="close" size={20} onPress={() => props.hideWindow(false)} />
                        <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Фильтр</Text>
                        <View></View>
                    </View>
                    
                    <View style={{width: '100%', justifyContent: 'center', alignItems:'center'}}>
                        
                        <View style={[styles.input, {borderColor: start == 'red' ? 'red' : '#F2F2F7'}]}>
                            <EvilIcons name="location" size={30} color={start}/>
                            <TextInput 
                                value = {firstCity}
                                onChangeText = {text => {
                                    setState({
                                        ...state,
                                        firstCity: text,
                                        start: text ? Color.primary : '#828889'
                                    })
                                }}
                                placeholder="Вылет из"
                                style={[styles.inputTextStyle, {color: firstCity ? 'black' : '#828889'}]}
                                selectionColor={Color.primary}
                            />
                        </View>
                        <View style={[styles.input, {borderColor: end == 'red' ? 'red' : '#F2F2F7'}]}>
                            <EvilIcons name="location" size={30} color={end}/>
                            <TextInput 
                                value = {endCity}
                                onChangeText = {text => {
                                    setState({
                                        ...state,
                                        endCity: text,
                                        end: text ? Color.primary : '#828889'
                                    })
                                }}
                                placeholder="Куда"
                                style={[styles.inputTextStyle, {color: endCity ? 'black' : '#828889'}]}
                                selectionColor={Color.primary}
                            />
                        </View>

                        <View style={styles.slider}>
                            <View style={styles.tourLength}>
                                <View style={{flexDirection: 'row'}}>
                                    <Feather name="clock" size={20} color='#32CD32'/>
                                    <Text style={[textStyles, {color: '#060606', marginLeft: 15}]}>Длительность тура</Text>
                                </View>
                                <View>
                                    <Text>{length[0]}-{length[1]} дней</Text>
                                </View>
                            </View>
                                <LengthSlider leng={toursLength}/>
                        </View>
                        <View style={styles.slider}>
                            <View style={styles.tourLength}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require('../img/48.png')} style={{width: 25, height: 20}}/>
                                    <Text style={[textStyles, {color: '#060606', marginLeft: 10}]}>Цена тура</Text>
                                </View>
                                <View>
                                    <Text>{price[0]}<Image source={require('../img/ukr.png')} style={{width: 10, height: 10}}/>-{price[1]}<Image source={require('../img/ukr.png')} style={{width: 10, height: 10}}/></Text>
                                </View>
                            </View>
                                <PriceSlider lengs={filterPrice}/>
                        </View>

                    </View>

                    <View style={{width: '100%', justifyContent: 'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={submitFilter} style={styles.btn}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>Выбрать</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
      </View>
    )
}


const styles = StyleSheet.create({
    modalContent: {
      height: 500,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    tourLength: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        paddingLeft: 0,
    },
    inputTextStyle: {
        fontFamily: 'avenir-next',
        fontSize: 17,
        letterSpacing: -0.4,
        color: '#828889',
        marginLeft: 10
    },
    input: {
        width: '95%',
        height: 48,
        margin: 8,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F2F2F7',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    slider: {
        width: '95%',
        margin: 8,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F2F2F7'
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0
    },
    closeTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5  
    },
    btn: {
      width: '95%',
      borderRadius: 5,
      padding: 8,
      marginTop: 10,
      backgroundColor: Color.primary,
      justifyContent: 'center', 
      alignItems: 'center'
    }
})

export default HistorySearchFilter