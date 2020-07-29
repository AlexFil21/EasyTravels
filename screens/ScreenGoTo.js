import React, {useState} from 'react'
import {View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, Switch} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import Color from '../constant/Colors'

const dataArr = [{city: 'Киев', viza: 'Онлайн виза'}, {city: "Одесса", viza: 'Без визы'}, {city: 'Винница', viza: 'Без визы'}, {city: 'Чернигов', viza: 'Онлайн виза'}]
const fullArr = [{city: 'Киев', viza: 'Онлайн виза'}, {city: "Одесса", viza: 'Без визы'}, {city: 'Винница', viza: 'Без визы'}, {city: 'Чернигов', viza: 'Онлайн виза'}, 
                {city: 'Киев', viza: 'Онлайн виза'}, {city: "Одесса", viza: 'Без визы'}, {city: 'Винница', viza: 'Без визы'}, {city: 'Чернигов', viza: 'Онлайн виза'}]
let chooseArr = []

const ItemRender = ({item}) => {
    const [ischecked, setIschecked] = useState(false)

    if(ischecked) {
        chooseArr.push(item.city)
    } else {
        chooseArr = chooseArr.filter((e) => e != item.city)
    }

    return (
        <TouchableOpacity style={[styles.itemsRender, {  
                                    flexDirection: ischecked ? 'column' : 'row', 
                                    justifyContent: ischecked ? 'center' : 'space-between',
                                    backgroundColor: ischecked ? Color.primary : null,
                                    paddingTop: ischecked ? 7 : 12, 
                                    paddingBottom: ischecked ? 7 : 12,
                                    marginTop: ischecked ? 5 : 0,
                                    marginBottom: ischecked ? 5 : 0
                                }]}
            onPress={() => setIschecked(!ischecked)}
        >
            <Text style={{
                        fontFamily: 'avenir-next', 
                        fontSize: 17, 
                        letterSpacing: -0.4, 
                        color: ischecked ? 'white' : '#060606'
                    }}
                >{item.city}
            </Text>
            <Text style={{  fontFamily: 'avenir-next', fontSize: 13, letterSpacing: -0.1,
                            color: ischecked ? 'white' : '#828889'
                        }}
                >{item.viza}
            </Text>
        </TouchableOpacity>
    )
}

const ScreenGoTo = (props) => {
    const [state, setState] = useState({filter: null, textValue: false})
    const [value, setValue] = useState(false);
    const {filter, textValue} = state

    const setSearchText = (text) => {
        let searchText = text
        let filterData = fullArr;
            searchText = searchText.trim().toLowerCase();
        filterData = filterData.filter(l => {
            return l.city.toLowerCase().match(searchText);
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
                    placeholder={'Куда Вы хотите \nотправиться?'}
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
                    <Text style={styles.text}>Введите страну, город или курорт</Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 27}}>
                        <Text style={{fontFamily: 'avenir-next', fontSize: 17, letterSpacing: -0.4, color: '#060606'}}>Показать страны без визы</Text>
                        <Switch
                            value={value}
                            onValueChange={v => {
                                setValue(v);
                            }}
                        />
                    </View>
                    <Text style={styles.popularCity}>Популярные направления</Text>
                </View>
            }

            <View>
                <FlatList 
                    data={textValue ? filter : dataArr}
                    renderItem={({item}) => <ItemRender item={item}/>}
                />
            </View>

            <View style={styles.btnChoose} >
                <TouchableOpacity style={styles.btn} onPress={() => {
                        props.navigation.navigate('Search', {
                            goTo: chooseArr
                        })
                }}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>Выбрат</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 10
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
        width: '95%',
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
        marginBottom: 27
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
      },
    itemsRender: {
        alignItems: 'center',
        paddingTop: 12, 
        paddingBottom: 12,
        borderRadius: 10
    }
})

export default ScreenGoTo