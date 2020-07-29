import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'


// const getTours = async () => {
//   return await fetch(
//     'https://api.ittour.com.ua/module/params', 
//     { 
//         method: 'GET',
//         headers: { 
//         'Content-Type': 'application/json',
//         'Token': '2f608a809b3a64a8d2ffa3911062d417',
//     }
//     }).then((response) => response.json())
//     .then((responseJson) => {
//         console.log(responseJson);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
// }


const MyTravelsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ARE</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 30
    }
})

export default MyTravelsScreen