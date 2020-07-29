import React, {useEffect, useState}  from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import Color from '../constant/Colors'
import { CheckBox } from 'react-native-elements'

const arr = ['Киев', 'Одесса', 'Днепр', 'Винница', 'Одесса1', 'Днепр1', 'Винница1', 'Киев', 'Одесса', 'Днепр', 'Винница', 'Одесса1', 'Днепр1', 'Винница1']
const windowHeight = Dimensions.get('window').height;


const ResortWindow = (props) => {
    const [state, setState] = useState({allResorts: false})
    const {allResorts} = state
    let choosesResorts = []

    const ItemRender = ({item}) => {    
        const [ischecked, setIschecked] = useState(false)

        if(allResorts && ischecked) {
            setIschecked(false)
        }
       
        if(ischecked) {
            choosesResorts.push(item)
        } else {
            choosesResorts = choosesResorts.filter((e) => e != item)
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
                            <AntDesign name="close" size={20} onPress={() => props.hide('resort')} />
                            <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Курорты</Text>
                            <TouchableOpacity onPress={() => setState({allResorts: true}) }>
                                <Text style={{fontWeight: '600', fontSize: 16, color: 'red'}}>Сбросить</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{justifyContent: 'space-around'}}>
                            <View style={styles.choose}>
                                <View style={{ marginBottom: 10}}>
                                    <CheckBox
                                        left
                                        title='Все курорты'
                                        checkedIcon={<FontAwesome name="check-square" size={28} color={Color.primary} />}
                                        checked={allResorts}
                                        size={28}
                                        textStyle={{
                                            fontSize: 17,
                                            fontFamily: 'avenir-next',
                                            letterSpacing: -0.4,
                                            color: 'black',
                                        }}
                                        onPress={() => setState({allResorts: !allResorts})}
                                        containerStyle = {{
                                            backgroundColor: 'white',
                                            padding: 0,
                                            width: '100%',
                                            borderWidth: 0,
                                            marginLeft: 0,
                                        }}
                                    />
                                </View>
                                <Text style={{fontFamily: 'avenir-next', fontSize: 17, letterSpacing: -0.4, color: '#84878B', marginBottom: 10}}>Популярные направления</Text>
                                <FlatList 
                                    data={arr}
                                    renderItem={({item}) => <ItemRender item={item} />}
                                />
                            </View>

                            <TouchableOpacity  style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}
                                     onPress={() => props.handler('resort', 'resortValue', choosesResorts)}
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
        height: (windowHeight * 0.8),
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
        height: '85%',
        marginBottom: 7
    }
});

export default ResortWindow;