import React, {useState}  from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Dimensions} from 'react-native'
import DistanceToTheSea from '../modalWindow/DistanceToTheSea'
import ResortWindow from '../modalWindow/Resort'
import  HotelRates from '../modalWindow/HotelRates'
import Meal from '../modalWindow/Meal'
import Budget from '../modalWindow/Budget'
import Convenience from '../modalWindow/Conveniences'
import Rating from '../modalWindow/Rating'
import Color from '../constant/Colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class MainFilter extends React.Component {
    constructor(props){
        super(props)
        this.state={
            distance: false, distanceValue: 'Любое',
            resort: false,   resortValue: '3 курорта',
            rates: false,    ratesValue: 'Любое',
            meal: false,     mealValue: 'Любое',
            budget: false,   budgetValue: 'Любое',
            conv: false,     convValue: 'Любое',
            rating: false,    ratingValue: 'Любое'
        }
        this.hideWindow = this.hideWindow.bind(this)
        this.filterValueHandler = this.filterValueHandler.bind(this)
        this.filterItems = this.filterItems.bind(this)
        this.cleanAllParam = this.cleanAllParam.bind(this)
    }
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Фильтры',  
            headerTintColor: 'black',
            headerBackTitle: 'Назад',
            headerStyle: {
                shadowColor: 'transparent'
            },
            headerRight: <Button title="Сброс" color={Color.primary} onPress={() => params.handleShow()} />
            };
      }

    componentDidMount () {
        this.props.navigation.setParams({ handleShow: this.cleanAllParam })
    }

    cleanAllParam = () => {
        this.setState({
            distanceValue: 'Любое',
            resortValue: '3 курорта',
            ratesValue: 'Любое',
            mealValue: 'Любое',
            budgetValue: 'Любое',
            convValue: 'Любое',
            ratingValue: 'Любое'
        })
    }

    hideWindow = (value) => {
        this.setState({[value]: false})
    }
    
    filterValueHandler = (item, item2, value) => {
        this.setState({
            [item]: false,
            [item2]: value.join(', ')
        })
    }

    filterItems = (item) => {
        return (
            <TouchableOpacity style={[styles.items, {backgroundColor: item[0]}]} 
                    onPress={() => this.setState({[item[3]]: true})}
            >
                <View style={{width: '80%', height: '80%', justifyContent: 'space-between'}}>
                    <Text style={{fontFamily: 'avenir-next-bold', fontSize: 20, letterSpacing: -0.4, color: 'white'}}>{item[1]}</Text>
                    <Text style={{fontFamily: 'avenir-next-medium', fontSize: 14, letterSpacing: -0.25, color: 'white'}}>{item[2]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
  
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13}}>
                        {this.filterItems(['#2869FF', 'Расстояние до моря', this.state.distanceValue, 'distance'])}
                        {this.filterItems(['#FF5E90', 'Услуги для детей', 'Не важно', 'resort'])}
                    </View>
    
                    <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13}}>
                        {this.filterItems(['#17C164', 'Курорт', this.state.resortValue, 'resort'])}
                        {this.filterItems(['#FFAC30', 'Класс отеля', this.state.ratesValue, 'rates'])}
                    </View>
    
                    <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13}}>
                        {this.filterItems(['#2869FF', 'Питание', this.state.mealValue, 'meal'])}
                        {this.filterItems(['#FF5E90', 'Бюджет', this.state.budgetValue, 'budget'])}
                    </View>
    
                    <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
                        {this.filterItems(['#17C164', 'Удобства', this.state.convValue, 'conv'])}
                        {this.filterItems(['#FFAC30', 'Рейтинг', this.state.ratingValue, 'rating'])}
                    </View>
    
                    <TouchableOpacity style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}>
                        <Text style={{fontFamily: 'avenir-next-medium', fontSize: 16, paddingTop: 11, paddingBottom: 10, color: 'white'}}>Показать отели</Text>
                    </TouchableOpacity>
    
                    <DistanceToTheSea action={this.state.distance} hide={this.hideWindow} handler={this.filterValueHandler}/>
                    <ResortWindow action={this.state.resort} hide={this.hideWindow} handler={this.filterValueHandler}/>
                    <HotelRates action={this.state.rates} hide={this.hideWindow} handler={this.filterValueHandler}/>
                    <Meal action={this.state.meal} hide={this.hideWindow} handler={this.filterValueHandler}/>
                    <Budget action={this.state.budget} hide={this.hideWindow} handler={this.filterValueHandler}/>
                    <Convenience action={this.state.conv} hide={this.hideWindow} handler={this.filterValueHandler}/>
                    <Rating action={this.state.rating} hide={this.hideWindow} handler={this.filterValueHandler}/>
                </View>
            </View>
        )
    }
}



// const MainFilter = (props) => {    
//     const [state, setState] = useState({
//         distance: false, distanceValue: 'Любое',
//         resort: false,   resortValue: '3 курорта',
//         rates: false,    ratesValue: 'Любое',
//         meal: false,     mealValue: 'Любое',
//         budget: false,   budgetValue: 'Любое',
//         conv: false,     convValue: 'Любое',
//         rating: false,    ratingValue: 'Любое'
//     })
//     const {distance, distanceValue, resort, resortValue,rates, ratesValue,meal, mealValue,budget, budgetValue,conv, convValue, rating, ratingValue} = state

    
//     const hideWindow = (value) => {
//         setState({...state, [value]: false})
//     }
    
//     const filterValueHandler = (item, item2, value) => {
//         setState({
//             ...state,
//             [item]: false,
//             [item2]: value.join(', ')
//         })
//     }

//     const filterItems = (item) => {
//         return (
//             <TouchableOpacity style={[styles.items, {backgroundColor: item[0]}]} 
//                     onPress={() => setState({...state, [item[3]]: true})}
//             >
//                 <View style={{width: '80%', height: '80%', justifyContent: 'space-between'}}>
//                     <Text style={{fontFamily: 'avenir-next-bold', fontSize: 20, letterSpacing: -0.4, color: 'white'}}>{item[1]}</Text>
//                     <Text style={{fontFamily: 'avenir-next-medium', fontSize: 14, letterSpacing: -0.25, color: 'white'}}>{item[2]}</Text>
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.main}>
//                 <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13}}>
//                     {filterItems(['#2869FF', 'Расстояние до моря', distanceValue, 'distance'])}
//                     {filterItems(['#FF5E90', 'Услуги для детей', 'Не важно', 'resort'])}
//                 </View>

//                 <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13}}>
//                     {filterItems(['#17C164', 'Курорт', resortValue, 'resort'])}
//                     {filterItems(['#FFAC30', 'Класс отеля', ratesValue, 'rates'])}
//                 </View>

//                 <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13}}>
//                     {filterItems(['#2869FF', 'Питание', mealValue, 'meal'])}
//                     {filterItems(['#FF5E90', 'Бюджет', budgetValue, 'budget'])}
//                 </View>

//                 <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
//                     {filterItems(['#17C164', 'Удобства', convValue, 'conv'])}
//                     {filterItems(['#FFAC30', 'Рейтинг', ratingValue, 'rating'])}
//                 </View>

//                 <TouchableOpacity style={{width: '100%', backgroundColor: '#17C164', borderRadius: 4, alignItems: 'center'}}>
//                     <Text style={{fontFamily: 'avenir-next-medium', fontSize: 16, paddingTop: 11, paddingBottom: 10, color: 'white'}}>Показать отели</Text>
//                 </TouchableOpacity>

//                 <DistanceToTheSea action={distance} hide={hideWindow} handler={filterValueHandler}/>
//                 <ResortWindow action={resort} hide={hideWindow} handler={filterValueHandler}/>
//                 <HotelRates action={rates} hide={hideWindow} handler={filterValueHandler}/>
//                 <Meal action={meal} hide={hideWindow} handler={filterValueHandler}/>
//                 <Budget action={budget} hide={hideWindow} handler={filterValueHandler}/>
//                 <Convenience action={conv} hide={hideWindow} handler={filterValueHandler}/>
//                 <Rating action={rating} hide={hideWindow} handler={filterValueHandler}/>
//             </View>
//         </View>
//     )
// }

// MainFilter.navigationOptions = {
//     title: 'Фильтры',
//     headerTintColor: 'black',
//     headerStyle: {
//         shadowColor: 'transparent'
//     },
//     headerBackTitle: 'Назад',
//     headerRight: <Button title='Сброс' color={Color.primary} onPress={() => cleanAllParam('huiii')} />    
// }

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    main: {
        width: '95%',
        height: '100%',
        marginTop: 15
    },
    items: {
        height: (windowHeight * 0.18),
        width: (windowWidth * 0.45),
        borderRadius: 8,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

// export default MainFilter
