import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Map from './components/Map';
import Storage from './components/Storage';
import Picture from './components/Picture';
import Video from './components/Video';
import {Dimensions} from 'react-native';

const App = () => {
  const [mylocation, setmyLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

  const [menuReq, setMenuReq] = useState(false);
  const [next, setNext] = useState(false);

  const getNecessaryPermissions = () => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ])
      .then(response => {
        console.log(response);
        getUserLocation();
      })
      .catch(error => {
        console.log('FATAL :: ', error);
      });
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(location => {
      const loc = location.coords;

      setmyLocation({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.005,
      });
    });
  };

  useEffect(() => {
    getNecessaryPermissions();
  }, []);

  const InitialScreen = () => {
    return (
      <View style={Style.container}>
        <TouchableOpacity
          style={Style.btnClickTo}
          onPress={() => setNext(true)}>
          <Text style={Style.btnText}>Click to Start</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HomeScreen = () => {
    return (
      <View style={Style.main}>
        {!menuReq ? (
          <View style={Style.upperBox}>
            <Map targetLocation={mylocation} />
          </View>
        ) : (
          <View style={Style.upperBox}>
            <Picture location={mylocation} />
          </View>
        )}

        <TouchableOpacity
          style={Style.btnShow}
          onPress={() => {
            setMenuReq(!menuReq);
          }}>
          {!menuReq ? (
            <Text style={Style.centerText}>More Options</Text>
          ) : (
            <Text style={Style.centerText}>Go Back</Text>
          )}
        </TouchableOpacity>

        {!menuReq ? (
          <View style={Style.lowerBox}>
            <Storage />
          </View>
        ) : (
          <View style={Style.lowerBox}>
            <Video />
          </View>
        )}
      </View>
    );
  };

  return <>{next ? <HomeScreen /> : <InitialScreen />}</>;
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7E9',
  },
  btnClickTo: {
    backgroundColor: '#6A82FF',
    width: 200,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  btnText: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  upperBox: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.2,
  },
  mapButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  lowerBox: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.2,
  },

  main: {
    ...StyleSheet.absoluteFillObject,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#E5E7E9',
  },
  centerText: {
    color: 'white',
    fontWeight: '500',
  },

  head: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    color: 'black',
    fontSize: 20,
    width: 300,
  },
  btnWrap: {
    backgroundColor: 'white',
    width: 150,
    height: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnShow: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
