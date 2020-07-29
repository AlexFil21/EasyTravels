import React, {Component} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
      key: 'somethun',
      title: 'Покупайте туры онлайн пока они не закончились',
      text: 'Бронируйте онлайн, чтобы поймать \nнизкую цену и сэкономить деньги.',
      img: require('../img/f22d58e3079c880a3ad0559a688bb890.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'somethun-dos',
      title: 'Гарантируем честные цены',
      text: 'Наши цены такие же как у туроператора, или ниже! Вы никогд не переплачиваете.',
      img: require('../img/f22d58e3079c880a3ad0559a688bb890.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'somethun1',
      title: 'Поддержка до и после покупки тура.',
      text: 'Всегда на связи по телефону и в мессенджерах. Поддержка персонального менеджера во время путешествия.',
      img: require('../img/f22d58e3079c880a3ad0559a688bb890.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];
export default class Example extends Component {
      renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Ionicons
              name="md-arrow-round-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent'}}
            />
          </View>
        );
      };

      renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Ionicons
              name="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent'}}
            />
          </View>
        );
      };

      renderItem = ({item}) => {
            return (
            <ImageBackground style={styles.backgroundImage} source={item.img}>
                <LinearGradient 
                    colors={['rgba(0, 0, 0, 0)', '0%', '#000', '100%']} 
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                      }}>
                    <TouchableOpacity 
                        style={{justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: 60, marginRight: 30}}
                        onPress={this.props.changeToRealApp}
                    >
                        <Ionicons name="ios-close" color="white" size={40}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20, marginTop: 20}}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
            );
      }
      
      render() {
            return  <AppIntroSlider
                        renderItem={this.renderItem} 
                        slides={slides} 
                        onDone={this.props.changeToRealApp}
                        renderDoneButton={this.renderDoneButton}
                        renderNextButton={this.renderNextButton}
                        activeDotStyle={{marginBottom: 30, backgroundColor: 'rgba(255, 255, 255, .9)'}}
                        dotStyle={{backgroundColor: 'rgba(0, 0, 0, .8)', marginBottom: 30}}
                    />;
      }
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10
    },
    image: {
        width: 320,
        height: 320,
    },   
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
      },
      text: {
        fontFamily: 'avenir-next',
        color: 'white',
        textAlign: 'left',
        fontSize: 17,
        letterSpacing: -0.4,
        marginTop: 10    
    },
      title: {
        fontFamily: 'avenir-next-medium',
        fontSize: 42,
        color: 'white',
        textAlign: 'left',
        marginBottom: 16,
        letterSpacing: 0.4,
        width: 317 
      },
})