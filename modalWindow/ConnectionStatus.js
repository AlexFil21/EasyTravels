import React  from 'react';
import { View, Text, StyleSheet, Button, Linking,TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {Feather} from '@expo/vector-icons'
import Color from '../constant/Colors'

const ConnectionInfo = () => {
    return (
        <View>
            <Modal
                 animationIn='slideInUp'
                 animationOut='slideOutDown'
                 isVisible={true} 
                 style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <Feather name="wifi-off" size={65} color="red" />
                    <Text style={{textAlign: 'center', fontFamily: 'avenir-next', fontSize: 20, letterSpacing: 0.3}}>Отсутствует соединение {"\n"} с интернетом, проверьте {"\n"} подключеня к сети</Text>
                    <TouchableOpacity style={{width:'95%', justifyContent: 'center', alignItems: 'center', backgroundColor: (Color.primary), paddingTop: 8, paddingBottom: 8}}>
                        <Text style={{ color: 'white', fontSize: 18}}>Попробовать еще раз</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={{width:'95%', justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#17C164', paddingTop: 6, paddingBottom: 6, marginBottom: 15}}
                            onPress={() => Linking.openURL('app-settings:')}>
                        <Text style={{color: (Color.primary), fontSize: 16}}>Перейти в настройки сети</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        height: 330,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
      },
});

export default ConnectionInfo;