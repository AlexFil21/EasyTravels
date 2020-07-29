import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import {EvilIcons} from '@expo/vector-icons'
import Color from '../constant/Colors'
import * as Progress from 'react-native-progress';
import SvgUri from "expo-svg-uri";
import FoundedItems from '../component/FoundedItems'
import Sort from '../modalWindow/Sort'
import Modal from 'react-native-modal';


const FoundedToursScreen = (props) => {
    const [state, setState] = useState({visible: false})
    const {visible} = state
    const [prog, setProgress] = useState(0.3);
    const [prog2, setProg2] = useState(0.4)
    const [sortVisible, setSortVisible] = useState(false)
    const windowWidth = Dimensions.get('window').width;

    const item = [
    {
        img: 'https://imagecdn3.luxnet.ua/tv24/resources/photos/news/640x426_DIR/201709/869558_1884844.jpg',
        rate: 3,
        hotel: 'Justiniano Deluxe Resort',
        price: '42300',
        country: "Аланья, Турция"
    },
    {
        img: 'https://imagecdn3.luxnet.ua/tv24/resources/photos/news/640x399_DIR/201709/869558_1884843.jpg?201709212016',
        rate: 5,
        hotel: 'Deluxe Resort',
        price: '22300',
        country: "Аланья, Турция"
    }
]


    useEffect(() => {
        if (prog < 1) {
            setTimeout(() => {
                setProgress(prog + 0.1)
            }, 1000)
        }
        if (prog > 0.6 && prog2 < 1) {
            setTimeout(() => {
                setProg2(prog2 + 0.1)
            }, 1000)
        }
    }, [prog, prog2])
    
    const firstShow = () => {
        return (
            <View style={{justifyContent: 'center', alignItems:'center', height: '80%'}}>
                <SvgUri 
                    width={120} height={120} 
                    style={{marginBottom: 27}}
                    source={require('../img/icon/031.svg')}
                />
                <Progress.Bar 
                    progress={prog} 
                    width={200}
                    height={3}
                    borderColor={Color.primary}
                    color={Color.primary}
                />
                <Text style={[styles.text, {marginTop: 27}]}>Пару секундочек!</Text>
                <Text style={styles.text}>Мы ищем лучшие туры</Text>
            </View>
        )
    } 
    
    const secondShow = () => {
        return (
            <View>
                <Progress.Bar 
                    progress={prog2} 
                    width={(windowWidth * 0.93)}
                    height={3}
                    borderColor={Color.primary}
                    color={Color.primary}
                />
                <Text style={[styles.text, {marginTop: 10,  textAlign: 'center', fontSize: 14}]}>Секундочку! Мы ищем лучшие туры</Text>
            </View>
        )
    }

    const hideWindow = (value) => {
        setSortVisible(false)
    }

    const sortAndFilter = () => {
        return (
            <View style={styles.sortFilter}>
                <TouchableOpacity style={[styles.sortAndFilter, {borderTopLeftRadius: 16, borderBottomLeftRadius: 16}]}
                                onPress={() => setSortVisible(true) }
                >
                    <SvgUri 
                        width={20} height={20} 
                        source={require('../img/little/align-left.svg')}
                    />
                    <Text style={{fontFamily: 'avenir-next-medium', fontSize: 13, color: 'white', padding: 10, letterSpacing: 0.3}}>СОРТИРОВКА</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sortAndFilter, {width: '47.5%', borderTopRightRadius: 16, borderBottomRightRadius: 16}]}
                                onPress={() => props.navigation.navigate('MainFilterPanel')}
                >
                    <SvgUri 
                        width={20} height={20} 
                        source={require('../img/little/sliders.svg')}
                        color="white"
                        style={{transform: [{ rotate: '90deg'}]}}
                    />
                    <Text style={{fontFamily: 'avenir-next-medium', fontSize: 13, color: 'white', padding: 10, letterSpacing: 0.3}}>ФИЛЬТРЫ</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (prog2 > 0.9 && prog2 < 1) {
        setTimeout(() => setState({visible: true}), 500)
            
    }

    return (
        <View style={styles.container}>
            <View style={styles.country}>
                <Text style={{fontFamily: 'avenir-next-bold', fontSize: 34, letterSpacing: 0.4, color: 'black'}}>Турция</Text> 
                <Text style={{fontFamily: 'avenir-next', fontSize: 15, letterSpacing: -0.1, color: '#828889', marginTop: 12, marginBottom: 12}}>2 adults 1 children</Text> 
            </View>
         
            {prog < 0.7 ? firstShow() : null}
            {prog > 0.7 && prog2 < 0.9 ? secondShow() : null}
            {prog > 0.7 ?
                <View style={styles.list}>
                    <FlatList 
                        data={item}
                        renderItem={({item}) =>  <FoundedItems items={item}/>}
                        keyExtractor={item => item.price}
                    />
                </View>
            : null}

            <View style={{width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', left: 10, bottom: 30 }}>
                {sortAndFilter()}
            </View>
            <View>
                <Modal 
                    animationIn='slideInDown'
                    animationOut='slideOutUp'
                    isVisible={visible}
                    style={styles.modal}
                    backdropOpacity={0}
                    onBackdropPress={() => setState({visible: false})}
                    >
                    <View style={{height: '14%', backgroundColor: Color.primary, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 15}}>
                        <View style={{width: 40, height: 40, borderRadius: '50%', borderWidth: 5, borderColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, color: 'white', fontFamily: 'avenir-next-bold'}}>1</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily: 'avenir-next-medium', fontSize: 20, letterSpacing: -0.4, color: 'white'}}>
                                Крок перший: Обери готель {"\n"} для вiдпочинку
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View>
                
            <Sort action={sortVisible} hide={hideWindow} />
        </View>
    )
}


FoundedToursScreen.navigationOptions = navData => {
    return {
        title: navData.navigation.getParam('title'),
        headerTintColor: 'black',
        headerStyle: {
            shadowColor: 'transparent'
        },
        headerBackTitle: 'Назад',
        headerRight: <EvilIcons name="location" size={34} color='grey' onPress={() => navData.navigation.navigate('Map')}/>    
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 15
    },
    country: {
        width: '100%'
    },
    text: {
        fontFamily: 'avenir-next',
        fontSize: 17,
        letterSpacing: -0.4,
        color: '#828889'
    },
    sortFilter: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16
    },
    sortAndFilter: {
        width: '52%',
        backgroundColor: Color.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        width: '97%',
        marginTop: 15
    },
    modal: {
        justifyContent: 'flex-start',
        margin: 0,
        
    }
})
export default FoundedToursScreen