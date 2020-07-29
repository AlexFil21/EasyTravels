import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, TextInput} from 'react-native'
import Color from '../constant/Colors'
import HistorySearchFilter from '../modalWindow/HistorySearchFilter'


export default class HistoryScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            show: false
        }
        this.showWindow = this.showWindow.bind(this)
    }
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'История поиска',  
            headerTintColor: 'black',
            headerBackTitle: 'Назад',
            headerRight: <Button title="фильтр" color={Color.primary} onPress={() => params.handleShow(true)} />
            };
      }

    componentDidMount () {
        this.props.navigation.setParams({ handleShow: this.showWindow })
    }

    showWindow (value) {
        this.setState({show: value})
    }

    render () {
        return (
            <View style={styles.container}>
                <HistorySearchFilter hideWindow={this.showWindow} show={this.state.show}/>
            </View>
        )
    }
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
