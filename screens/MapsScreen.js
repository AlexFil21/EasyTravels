import React from 'react';
import {Text, View, TouchableOpacity, ImageBackground, Image} from 'react-native'
import Location from '../component/Location'
import {Ionicons, FontAwesome, MaterialIcons} from '@expo/vector-icons'


export default class MapsScreen extends React.Component {
    static navigationOptions = {
        header: null
    }   

    constructor(props) {
        super(props)
        this.state = {}
        this.rates = this.rates.bind(this)
    }

    rates = (value) => {
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


    render () {
        return (
            <View style={{flex: 1}}>
                <Location />

                <TouchableOpacity style={{position: 'absolute', top: 40, left: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Ionicons name="ios-arrow-back" size={30} color="#17C164"/>
                    <Text style={{color: '#17C164', fontFamily: 'avenir-next', letterSpacing: -0.4, marginLeft: 5, fontSize: 18}}>Назад</Text>
                </TouchableOpacity>

                <View style={{position: 'absolute', width: '100%', top: '12%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ width: '90%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', borderRadius: 8, padding: 8}}>
                        <View style={{justifyContent: 'center'}}>
                            <Image style={{height: 100, width: 100, borderRadius: 14}}
                                    source={{uri: 'https://syndlab.com/files/view/5db9b150252346nbDR1gKP3OYNuwBhXsHJerdToc5I0SMLfk7qlv951730.jpeg' }}
                            /> 
                        </View>
                        <View style={{height: '95%', width: '50%', justifyContent: 'space-between'}}> 
                            {this.rates(4)}
                            <Text style={{fontFamily: 'avenir-next-bold', fontSize: 16, letterSpacing: -0.4, marginBottom: 8, marginTop: 8}}>Название курорта  </Text>
                            <Text style={{fontFamily: 'avenir-next', fontSize: 15, letterSpacing: -0.24, color: '#828889'}}>от 20 000 ₴</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => {}}>
                            <MaterialIcons name='navigate-next' size={30} color='#828889' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )  
    }
}



