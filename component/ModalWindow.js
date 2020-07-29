import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import Color from '../constant/Colors'

export default class ModalWindow extends Component {
  state = {
    visibleModal: false,
    peopleWhoWillTravel: {
        oldMan: 1,
        childrens: 0,
        baby: 0
    },
    travelersCount: 'Количество туристов'
  };

  counter (value, action, typeOfPerson) {
        if (action === 'dicrease') {
            this.setState({
                peopleWhoWillTravel: {
                       ...this.state.peopleWhoWillTravel,
                       [typeOfPerson]: value - 1 
                      }
            });
        } else if (action === 'increase') {
            this.setState({
                peopleWhoWillTravel: {
                       ...this.state.peopleWhoWillTravel,
                       [typeOfPerson]: value + 1 
                      }
            });
        }
  }

  peopleAmount (arr) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontWeight: '500', fontSize: 14}}>{arr[0]}</Text>
                <Text style={{color: '#808080', marginTop: 3, fontSize: 12 }}>{arr[1]}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '30%'}}>
                <AntDesign 
                    name="minuscircle" 
                    size={26} 
                    color={Color.primary} 
                    style={{opacity: (arr[2] > 0 ? 1 : 0.3)}}
                    onPress={ arr[2] === 0 ? null : () => this.counter(arr[2], 'dicrease', arr[3])}
                />
                <Text style={{fontSize: 20}}>{arr[2]}</Text>
                <AntDesign 
                    name="pluscircle" 
                    size={26}  
                    color={Color.primary}
                    onPress={() => this.counter(arr[2], 'increase', arr[3])}
                />
            </View>
        </View>
    )
  }


  travelersHandler () {
    const touristGtoup1 = this.state.peopleWhoWillTravel.oldMan
    const touristGtoup2 = this.state.peopleWhoWillTravel.childrens
    const touristGtoup3 = this.state.peopleWhoWillTravel.baby
    let result = (touristGtoup1 > 0 ? touristGtoup1 + " взрослых " : '') + (touristGtoup2 > 0 ? touristGtoup2 + ' детей ': '') + (touristGtoup3 > 0 ? touristGtoup3 + ' младенцев ': '')

    if(!result) {
        result = "Выберите количество туристов"
    } 

    this.props.amount([touristGtoup1, touristGtoup2, touristGtoup3])

    this.setState({
        travelersCount: result,
        visibleModal: false 
    })
  }

  render() {  
    const textStyles = {
        fontSize: 17, 
        marginLeft: 10, 
        fontFamily: 'avenir-next', 
        fontWeight: '500', 
        color: '#828889', 
        letterSpacing: -0.1
    }

    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ visibleModal: true })} >
            <View style={[styles.addcountry, {
                                borderWidth: this.props.color == 'red' ? 1 : null,
                                borderColor: 'red'
            }]}>
                <SimpleLineIcons name="people" size={23} color={this.props.color}/>
                <Text style={[textStyles, {color: this.props.color == Color. primary ? 'black' : '#828889'}]}>
                    {this.state.travelersCount}
                </Text>
            </View>
        </TouchableOpacity>

        <Modal 
            animationIn='slideInUp'
            animationOut='slideOutDown'
            isVisible={this.state.visibleModal} 
            style={styles.bottomModal}
        >
            <View style={styles.modalContent}>
                <View style={styles.closeTab}>
                    <AntDesign name="close" size={20} onPress={() => this.setState({ visibleModal: false })} />
                    <Text style={{ fontFamily: 'avenir-next-medium', fontSize: 16}}>Кто едет</Text>
                    <Text style={{color: Color.primary, fontSize: 16, fontFamily: 'avenir-next-medium', }} 
                          onPress={() => this.travelersHandler()}>
                        Готово
                    </Text>
                </View>
                
                <View style={{margin: 10}}>
                    {this.peopleAmount(['Взрослые', 'Старше 15 лет', this.state.peopleWhoWillTravel.oldMan, 'oldMan'])}
                    {this.peopleAmount(['Дети', 'От 2 до 15 лет', this.state.peopleWhoWillTravel.childrens, 'childrens'])}
                    {this.peopleAmount(['Младенцы', 'До 2 лет', this.state.peopleWhoWillTravel.baby, 'baby'])}
                </View>

                <TouchableOpacity onPress={() => this.travelersHandler()} style={styles.btn}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>Выбрать</Text>
                </TouchableOpacity>
            </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.primary,
    padding: 12,
    margin: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    height: 300,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  closeTab: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5  
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
  addcountry: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15
}
});