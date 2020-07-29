import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity,} from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import SvgUri from "expo-svg-uri";
import {FontAwesome5} from '@expo/vector-icons'


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 41.015137;
const LONGITUDE = 28.979530;
const LATITUDE_DELTA = 0.0952;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            "latitude": 41.0333338169838,
            "longitude": 28.97845329814244,
          },
          key: id++,
          color: 'green',
        },
        {
          coordinate: {
            "latitude": 41.04895925368362,
            "longitude": 28.977048767088682,
          },
          key: id++,
          color: 'green',
        }
      ],
    };
  }

  onMapPress(e) {
    
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        }
      ]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          // onPress={e => this.onMapPress(e)}
          mapType='standard'
          zoomEnabled={true}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
              anchor={{ x: 0.5, y: 0.5 }}
              onPress={() => console.log(marker.coordinate)}
            >
            <View>
                  <FontAwesome5 name="map-marker-alt" size={35} color='#17C164' />
            </View>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default DefaultMarkers;