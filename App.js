import React, {Component} from 'react';
import Navigations from './navigations/AppNavigations'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import Slider from './component/ImageSlider'
import NetInfo from '@react-native-community/netinfo'
import ConnectionInfo from './modalWindow/ConnectionStatus'

const fetchFonts = () => {
  return Font.loadAsync({
    'avenir-next': require('./assets/fonts/AvenirNextCyr-Regular.ttf'),
    'avenir-next-medium': require('./assets/fonts/AvenirNextCyr-Demi.ttf'),
    'avenir-next-bold': require('./assets/fonts/AvenirNextCyr-Bold.ttf')
  })
}


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      connection_Status: "",
      fontLoaded: false,
      showRealApp: false
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected == true) {
        this.setState({ connection_Status: "Online" })
      }
      else {
        this.setState({ connection_Status: "Offline" })
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    if (isConnected == true) {
      this.setState({connection_Status: "Online" })
    }
    else {
      this.setState({connection_Status: "Offline" })
    }
  };

  render() {  
    if(!this.state.fontLoaded) {
      return (
        <AppLoading 
            startAsync={fetchFonts}
            onFinish = {() => {
               this.setState({
                 fontLoaded: true
               })
            }}
        />
    )}
    
    if(this.state.connection_Status == "Online"){
      if(this.state.showRealApp){
        return  <Navigations />
      } else {
        return <Slider changeToRealApp={() => this.setState({showRealApp: true})}/>
      }
    } else if(this.state.connection_Status == "Offline") {
      return <ConnectionInfo />
    }
  }
}