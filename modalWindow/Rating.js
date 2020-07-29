import React, {useState}  from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import Color from '../constant/Colors'
import { CheckBox } from 'react-native-elements'

const arr = ['Не важно', 'Превосходно', 'Очень хорошо', 'Хорошо', 'Удовлетворительно']
const windowHeight = Dimensions.get('window').height;


const Rating = (props) => {
    let choosesResorts = []

    const ItemRender = ({item}) => {    
        const [ischecked, setIschecked] = useState(false)

        if(ischecked) {
            choosesResorts.push(item)
        } else {
            choosesResorts = choosesResorts.filter((e) => e != item)
        }
        
        if(item == 'Превосходно') {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <CheckBox
                        left
                        title={'Превосходно'}
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
                    <View style={{width: 56, height: 24, backgroundColor: '#17C164', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 17, fontFamily: 'avenir-next-medium', letterSpacing: -0.4}}>4,5+</Text>
                    </View>
                </View>
            )
        }
        else if(item == 'Очень хорошо') {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                    <View style={{ width: 56, height: 24, backgroundColor: '#FFAC30', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 17, fontFamily: 'avenir-next-medium', letterSpacing: -0.4}}>4+</Text>
                    </View>
                </View>
            )
        }
        else if(item == 'Хорошо') {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                    <View style={{width: 56, height: 24, backgroundColor: '#FF5E90', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 17, fontFamily: 'avenir-next-medium', letterSpacing: -0.4}}>3,5+</Text>
                    </View>
                </View>
            )
        }
        else if(item == 'Удовлетворительно') {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                    <View style={{width: 56, height: 24, backgroundColor: '#FF4264', borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 17, fontFamily: 'avenir-next-medium', letterSpacing: -0.4}}>3+</Text>
                    </View>
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
                            <AntDesign name="close" size={20} onPress={() => props.hide('rating')} />
                            <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Рейтинг</Text>
                            <View></View>
                        </View>
                        
                        <View style={{justifyContent: 'space-around'}}>
                            <View style={styles.choose}>
                                <Text style={{fontFamily: 'avenir-next', fontSize: 17, letterSpacing: -0.4, color: '#84878B', marginBottom: 10}}>Выберите тур по оценке людей, которые там уже отдыхали</Text>
                                <FlatList 
                                    data={arr}
                                    renderItem={({item}) => <ItemRender item={item} />}
                                    
                                />
                            </View>

                            <TouchableOpacity  style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}
                                onPress={() => props.handler('rating', 'ratingValue', choosesResorts)}
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
        height: (windowHeight * 0.5),
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
        marginBottom: 15
    },
    choose: {
        marginBottom: '7%'
    }
});

export default Rating;