import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const FastStartScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>THAT YOU</Text>
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

export default FastStartScreen