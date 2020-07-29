import React, {useState}  from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import PriceSlider from '../component/PriceSlider'
import Color from '../constant/Colors'

const windowHeight = Dimensions.get('window').height;
const textStyles = {
    fontSize: 17, 
    marginLeft: 5, 
    fontFamily: 'avenir-next',
    color: '#828889', 
    letterSpacing: -0.4
}


const Budget = (props) => {
    const [price, setPrice] = useState([15000, 32000])
    const PriceHandler = (price) => {
        setPrice(price)
    }
    
    return (
        <View>
            <Modal
                 animationIn='slideInUp'
                 animationOut='slideOutDown'
                 isVisible={props.action} 
                 style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <View style={{width: '90%', height: '95%', marginTop: 15}}>
                        <View style={styles.closeTab}>
                            <AntDesign name="close" size={20} onPress={() => props.hide('budget')} />
                            <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Бюджет</Text>
                            <View></View>
                        </View>
                        
                        <View style={{justifyContent: 'space-around'}}>
                            <View style={styles.choose}>
                                <Text style={{fontFamily: 'avenir-next', fontSize: 17, letterSpacing: -0.4, color: '#84878B', marginBottom: 10}}>Укажите минимальную и максимальную {'\n'}цену за тур</Text>
                                <View style={styles.slider}>
                                    <View style={styles.tourLength}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image source={require('../img/48.png')} style={{width: 25, height: 20}}/>
                                                <Text style={[textStyles, {color: '#060606', marginLeft: 10}]}>Цена тура</Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize: 14, letterSpacing: -0.2, color: '#060606'}}>{price[0]}₴-{price[1]}₴</Text>
                                            </View>
                                    </View>
                                        <PriceSlider lengs={PriceHandler}/>
                                </View>
                                <Text style={{fontFamily: 'avenir-next', fontSize: 13, letterSpacing: -0.1, color: '#828889', marginTop: 10, marginBottom: 15}} >Рекомендованная цена на этом направлении 10 000 ₴</Text>
                            </View>

                            <TouchableOpacity  style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}
                                    onPress={() => props.handler('budget', 'budgetValue', price)}
                            >
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600', paddingTop: 10, paddingBottom: 10}}>Выбрать</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        height: (windowHeight * 0.4),
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
      },
      closeTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 10
    },
    tourLength: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        paddingLeft: 0,
    },
    slider: {
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        padding: 5
    },
});

export default Budget;