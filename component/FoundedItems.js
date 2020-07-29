import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'


const FoundedItems = (props) => {

    const rates = (value) => {
        let arr = ['#E0E0E0','#E0E0E0','#E0E0E0','#E0E0E0','#E0E0E0']

        for (let index = 0; index < value; index++) {
            arr[index] = '#FFAC30'
        }

        arr = arr.map((item)=> {
            return <FontAwesome name='star' size={24} color={item} />
        })

        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                {arr}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{height: 184}}>
                <ImageBackground source={{uri: props.items.img }} 
                                style={{width: '100%', height: '100%' }}
                                imageStyle={{ borderRadius: 14 }}
                >
                </ImageBackground>
            </View>
            <View>
                <View style={{marginTop: 11, marginBottom: 7}}>
                    {rates(props.items.rate)}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text}>{props.items.hotel}</Text>
                    <Text style={styles.text}>{props.items.price}₴</Text>
                </View>
                <Text style={{fontFamily: 'avenir-next', fontSize: 15, letterSpacing: -0.1}}>{props.items.country}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 25,
    },
    text: {
        fontFamily: 'avenir-next-medium',
        fontSize: 18,
        letterSpacing: -0.4,
        color: '#060606'
    }
})

export default FoundedItems
