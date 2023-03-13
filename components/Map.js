import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';

const Map = ({targetLocation}) => {
  const [showLocation, setShowLocation] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
        marginBottom: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 10,
      }}>
      {showLocation ? (
        <MapView style={Style.map} initialRegion={targetLocation}>
          <Marker
            coordinate={{
              latitude: targetLocation['latitude'],
              longitude: targetLocation['longitude'],
            }}></Marker>
        </MapView>
      ) : (
        <View style={Style.mapButtonView}>
          <TouchableOpacity
            style={Style.btnShow}
            onPress={() => setShowLocation(true)}>
            <Text style={{color: '#ffff', fontWeight: '500'}}>My Location</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 20,
    height: 20,
  },
  btnShow: {
    backgroundColor: '#6A82FF',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 10,
    fontSize: 20,
    color: 'white',
  },
  btn: {
    width: '40%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Map;
