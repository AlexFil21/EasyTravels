import React, {useState} from 'react'
import {View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { CheckBox } from 'react-native-elements'
import Color from '../constant/Colors'

const dataArr = ['Киев', "Одесса", 'Винница', 'Чернигов']
const fullArr = ['Киев', "Одесса", 'Винница', 'Чернигов', 'Киев', "Одесса", 'Винница', 'Чернигов', 'Киев', "Одесса", 'Винница', 'Чернигов']
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
                checkedColor={Color.primary}
                checked={ischecked}
                size={28}
                textStyle={{
                    fontSize: 18,
                    fontFamily: 'avenir-next',
                    letterSpacing: 0.4,
                    color: 'black'
                }}
                onPress={() => setIschecked(!ischecked)}
                containerStyle = {{
                    backgroundColor: 'white',
                    paddingLeft: 0,
                    width: '100%',
                    marginLeft: 0,
                    borderWidth: 0,
                    margin:0
                }}
            />
        </View>
    )
}

const ScreenGoFrom = (props) => {
    const [state, setState] = useState({filter: null, textValue: false})
    const {filter, textValue} = state

    const setSearchText = (text) => {
        let searchText = text
        let filterData = fullArr;
            searchText = searchText.trim().toLowerCase();
        filterData = filterData.filter(l => {
            return l.toLowerCase().match(searchText);
        });
        
        if(text.length == 0) {
            setState({
                textValue: false
            })
        } else {
            setState({
                filter: filterData,
                textValue: text
            })
        }

    }

    return (
        
        <View style={styles.container}>
            <View style={[styles.inputText, {
                        borderBottomColor: textValue ? Color.primary : null,
                        borderBottomWidth: textValue ? 1 : null
                    }]}>
            { textValue === false ?
                <TextInput 
                    value = {textValue}
                    onChangeText = {text => setSearchText(text)}
                    placeholder={'Укажите Ваш город \nвылета'}
                    style={styles.input}
                    multiline = {textValue ? false : true}
                    selectionColor={Color.primary}
                />
                : null
            }
            { textValue ? 
                   <TextInput 
                        value = {textValue}
                        onChangeText = {text => setSearchText(text)}
                        style={styles.input}
                        selectionColor={Color.primary}
                        autoFocus={true}
                    />
                : null
            }
            { textValue ? <Ionicons name="ios-close" size={34} onPress={() => setState({textValue: false})}/> : null }
            </View>

            { textValue ? null : 
                <View>
                    <Text style={styles.text}>Вы можете указывать два и более городов</Text>
                    <Text style={styles.popularCity}>Популярные города</Text>
                </View>
            }

            <View>
                <FlatList 
                    data={textValue ? filter : dataArr}
                    renderItem={({item}) => <ItemRender item={item}/>}
                />
            </View>

            <View style={styles.btnChoose}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    
                        props.navigation.navigate('Search', {
                            goFrom: chooseArr
                        })
                }}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>Выбрать</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20
    },
    input: {
        width: "90%",
        paddingBottom: 5,
        fontSize: 28,
        paddingLeft: 0,
        justifyContent: 'center',
        fontFamily: 'avenir-next-medium',
    },
    inputText: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 30,
        marginBottom: 20
    },
    text: {
        fontFamily: 'avenir-next',
        letterSpacing: 0.5,
        color: '#828889',
        fontSize: 13,
        marginBottom: 30
    },
    popularCity: {
        fontFamily: 'avenir-next-medium',
        letterSpacing: -0.1,
        color: '#828889',
        fontSize: 14,
        lineHeight: 18,
        textTransform: 'uppercase'
    },
    btnChoose: {
        width: '100%',
        marginLeft: -10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: '100%',
        borderRadius: 5,
        padding: 8,
        marginTop: 15,
        backgroundColor: Color.primary,
        justifyContent: 'center', 
        alignItems: 'center'
      }
})

export default ScreenGoFrom