import React, {useEffect, useState}  from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import Color from '../constant/Colors'
import { CheckBox } from 'react-native-elements'

const arr = ['Любое', 'UAI-Ультра все включено', 'AI-Все включено', 'BB-Завтрак', 'FB-Завтрак, обед, ужин', 'HB-Завтрак, ужин', 'RO-без питания']
const windowHeight = Dimensions.get('window').height;


const Meal = (props) => {
    const [clean, setClean] = useState(false)
    let choosesResorts = []

    const ItemRender = ({item}) => {    
        const [ischecked, setIschecked] = useState(false)

        if (clean) {
            if(ischecked){
                choosesResorts = choosesResorts.filter((e) => e != item)
                setIschecked(false)
            } 
            else if(choosesResorts.length == 0) {
                setClean(false)
            }
        } 


        if(ischecked) {
            choosesResorts.push(item)
        } else {
            choosesResorts = choosesResorts.filter((e) => e != item)
        }

        if (item.charAt(0) >= 1 && item.charAt(0) <= 5) {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <CheckBox
                        left
                        title={item}
                        checkedIcon={<FontAwesome name="check-square" size={28} color={Color.primary} />}
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
                            width: '60%',
                            borderWidth: 0,
                            marginLeft: 0,
                            marginBottom: 5
                        }}
                    />
                    {Stars(item.charAt(0))}
                </View>
            )
        }
 
        return (
            <View>
                <CheckBox
                    left
                    title={item}
                    checkedIcon={<FontAwesome name="check-square" size={28} color={Color.primary} />}
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
                            <AntDesign name="close" size={20} onPress={() => props.hide('meal')} />
                            <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Питание</Text>
                            <TouchableOpacity onPress={() => setClean(true) }>
                                <Text style={{fontWeight: '600', fontSize: 16, color: 'red'}}>Сбросить</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{justifyContent: 'space-around'}}>
                            <View style={styles.choose}>
                                <Text style={{fontFamily: 'avenir-next', fontSize: 17, letterSpacing: -0.4, color: '#84878B', marginBottom: 10}}>Выберите типы питания, которые {'\n'}Вас интересуют</Text>
                                <FlatList 
                                    data={arr}
                                    renderItem={({item}) => <ItemRender item={item} />}
                                    scrollEnabled={false}
                                />
                            </View>

                            <TouchableOpacity  style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}
                                onPress={() => props.handler('meal', 'mealValue', choosesResorts)}
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
        height: (windowHeight * 0.55),
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
    choose: {
        height: '81%',
    }
});

export default Meal;