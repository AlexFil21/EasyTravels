import React, {useEffect, useState}  from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign} from '@expo/vector-icons'
import Color from '../constant/Colors'
import SvgUri from "expo-svg-uri";
import { CheckBox } from 'react-native-elements'

const arr = ['Популярные', 'Сначала дешевые', 'Сначала дорогие', 'По оценкам']
const windowHeight = Dimensions.get('window').height;
let chooseArr = []

const ItemRender = ({item}) => {
    const [ischecked, setIschecked] = useState(false)
    
    if(ischecked) {
        chooseArr.push(item)
    } else {
        chooseArr = chooseArr.filter((e) => e != item)
    }
    
    return (
        <View>
            <CheckBox
                left
                title={item}
                checkedIcon={<SvgUri    width={20} height={20} 
                                        source={require('../img/little/disc.svg')}
                />}
                uncheckedIcon={<SvgUri  width={20} height={20} 
                                        source={require('../img/little/dot.svg')}
                />}
                checkedColor={Color.primary}
                checked={ischecked}
                size={28}
                textStyle={{
                    fontSize: 17,
                    fontFamily: 'avenir-next',
                    letterSpacing: -0.4,
                    color: 'black',
                }}
                onPress={() => setIschecked(!ischecked)}
                containerStyle = {{
                    backgroundColor: 'white',
                    padding: 0,
                    width: '100%',
                    borderWidth: 0,
                    marginLeft: 0,
                    marginBottom: 5
                }}
            />
        </View>
    )
}

const Sort = (props) => {

    return (
        <View>
            <Modal
                 animationIn='slideInUp'
                 animationOut='slideOutDown'
                 isVisible={props.action} 
                 style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <View style={{width: '90%', height: '95%'}}>
                        <View style={styles.closeTab}>
                            <AntDesign name="close" size={20} onPress={() => props.hide()} />
                            <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Сортировка</Text>
                            <View></View>
                        </View>
                        
                        <View style={{justifyContent: 'space-around'}}>
                            <View style={styles.choose}>
                                <FlatList 
                                    data={arr}
                                    renderItem={({item}) => <ItemRender item={item} />}
                                    scrollEnabled={false}
                                />
                            </View>

                            <TouchableOpacity  style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}>
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
        height: (windowHeight * 0.35),
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
      },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
      },
      closeTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 15
    },
    choose: {
       marginBottom: '7%'
    }
});

export default Sort;