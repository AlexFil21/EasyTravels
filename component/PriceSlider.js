import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const PriceSlider = (props) => {
    const [multiSliderValue, setMultiSliderValue] = useState([15000, 32000]);

    useEffect(() => {
        props.lengs(multiSliderValue)
    }, [multiSliderValue])

    
    return (
        <View style={{width:'90%', justifyContent: 'center', alignItems:'center'}}>
            <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                min={0}
                max={multiSliderValue[1]}
                step={10}
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

export default PriceSlider