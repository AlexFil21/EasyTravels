import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const LengthSlider = (props) => {
    const [multiSliderValue, setMultiSliderValue] = useState([2, 7]);

    useEffect(() => {
        props.leng(multiSliderValue)
    }, [multiSliderValue])

    
    return (
        <View style={{width:'90%', justifyContent: 'center', alignItems:'center'}}>
            {/* <View style={{width:'90%', alignItems: 'flex-end'}}>
                <Text>{multiSliderValue[0]}-{multiSliderValue[1]} дней</Text>
            </View> */}
            <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                min={0}
                max={10}
                step={1}
                onValuesChange={(val) => setMultiSliderValue(val)}
                selectedStyle={{
                    backgroundColor: '#32CD32',
                    width: '100%'
                }}
                markerContainerStyle={{width: 50, height: 50}}
                markerStyle={{width: 23, height: 23}}
            />
        </View>
    )
}

export default LengthSlider