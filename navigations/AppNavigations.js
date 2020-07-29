import React from 'react'
import {Text, Button} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator, HeaderTitle} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons'

import HistoryScreen from '../screens/SearchHistoryScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SearchScreen from '../screens/SearchScreen'
import FastStartScreen from '../screens/FastStartScreen'
import MyTravelsScreen from '../screens/MyTravelsScreen'
import SupportScreen from '../screens/SupportScreen'
import MultiCalendar from "../component/MultiCalendar";
import ScreenGoFrom from '../screens/ScreenGoFrom'
import ScreenGoTo from '../screens/ScreenGoTo'
import FoundedToursScreen from '../screens/FoundedToursScreen'
import MainFilter from '../sortFilterPanel/MainFilter'
import MapsScreen from '../screens/MapsScreen'



const Test = createStackNavigator({
      Search: {
        screen: SearchScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      History: {
        screen: HistoryScreen
      },
      Calendar: {
          screen: MultiCalendar,
          navigationOptions: {
            headerStyle: {
              shadowColor: 'transparent'
            }
          }
      },
      GoFrom: {
        screen: ScreenGoFrom,
        navigationOptions: {
          headerTitle: 'Поиск',
          headerBackTitle: 'Назад',
          headerTintColor: 'black',
          headerStyle: {
            shadowColor: 'transparent'
          }
        }
      },
      GoTo: {
        screen: ScreenGoTo,
        navigationOptions: {
          headerTitle: 'Поиск',
          headerBackTitle: 'Назад',
          headerTintColor: 'black',
          headerStyle: {
            shadowColor: 'transparent'
          }
        }
      },
      FoundedTours: {
          screen: FoundedToursScreen
      },
      MainFilterPanel: {
        screen: MainFilter,
      },
      Map: {
        screen: MapsScreen,
      }
      
},
{
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
        if (navigation.state.routes[navigation.state.index].routeName === 'Calendar') {
           tabBarVisible = false;
        } else if (navigation.state.routes[navigation.state.index].routeName === 'MainFilterPanel') {
          tabBarVisible = false;
        } else if (navigation.state.routes[navigation.state.index].routeName === 'Map') {
          tabBarVisible = false;
        }
        return {
           tabBarVisible
        }}
})

const tabConfigScreen = {
  MyTravels: { 
    screen: MyTravelsScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <FontAwesome name='map-o' size={20} color={tintColor}/>
      },
      tabBarColor: 'white',
      tabBarLabel: ({tintColor}) => {
        return <Text style={{ fontSize: 10, color: tintColor}}> Мои туры </Text>
      }
    }
},
  FastStart: { 
    screen: FastStartScreen,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => {
            return <Feather name='navigation' size={24} color={tintColor}/>
        },
        tabBarColor: 'white',
        tabBarLabel: ({tintColor}) => {
          return <Text style={{ fontSize: 10, color: tintColor }}>Быстрый старт</Text>
      }
    }
},
  Search: { 
    screen: Test,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => {
            return <Ionicons name='ios-search' size={27} color={tintColor}/>
        },
        tabBarColor: 'white',
        tabBarLabel: ({tintColor}) => {
          return <Text style={{ fontSize: 10, color: tintColor }}> Поиск </Text>
        }
    }
},
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => {
            return <Ionicons name='ios-person' size={27} color={tintColor}/>
        },
        tabBarColor: 'white',
        tabBarLabel: ({tintColor}) => {
          return <Text style={{ fontSize: 10, color: tintColor }}> Профиль </Text>
      }
        
    }
},
  Support: { 
    screen: SupportScreen,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => {
            return <Ionicons name='ios-information-circle-outline' size={27} color={tintColor}/>
        },
        tabBarColor: 'white',
        tabBarLabel: ({tintColor}) => {
          return <Text style={{ fontSize: 10, color: tintColor }}> Помощь </Text>
      }
    }
}
}

const TabNavigator = createBottomTabNavigator(
  tabConfigScreen,
{
  tabBarOptions: {
    activeTintColor: 'green', 
    inactiveTintColor: 'grey',
    tabStyle: {paddingBottom: 5}
  },
  initialRouteName: 'Search'
})


export default createAppContainer(TabNavigator)