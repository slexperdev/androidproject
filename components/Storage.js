import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = () => {
  const [location, setLocation] = useState('');
  const [identifiers, setIdentifiers] = useState([]);
  const [CurrentImg, setImage] = useState('');
  const [currentIndex, setIndex] = useState(0.0);
  const [pictureNotes, setNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      console.log(keys);
      setIdentifiers(keys);

      if (keys.length > 0) {
        AsyncStorage.getItem(keys[0], (err, res) => {
          setIndex(0);
          let target = JSON.parse(res);
          setImage(target['data']);
          setNotes(target['userNotes']);
          setLocation(target['location']);
        });
      }
    });
  }, []);

  const forward = () => {
    let ind = currentIndex;

    if (ind === identifiers.length - 1) {
      ind = 0;
      setIndex(0);
    } else {
      ind = ind + 1;
      setIndex(currentIndex + 1);
    }

    AsyncStorage.getItem(identifiers[ind], (err, res) => {
      let target = JSON.parse(res);
      setImage(target['data']);
      setNotes(target['userNotes']);
      setLocation(target['location']);
    });
  };

  return (
    <View style={Style.container}>
      {showDetails ? (
        <>
          {identifiers.length > 0 ? (
            <>
              <View>
                <Image
                  style={{width: 300, height: 200}}
                  source={{uri: `data:image/jpg;base64,${CurrentImg}`}}
                />
                <Text style={Style.text}>User Notes: {pictureNotes}</Text>
                <Text style={Style.text}>
                  longitude: {location['longitude']}
                </Text>
                <Text style={Style.text}>latitude: {location['latitude']}</Text>
              </View>

              {/* <Button title="Next" onPress={forward}></Button> */}
            </>
          ) : (
            <Text>No pictures to show</Text>
          )}
        </>
      ) : (
        <TouchableOpacity
          style={Style.btnShow}
          onPress={() => setShowDetails(true)}>
          <Text style={{color: '#ffff', fontWeight: '500'}}>
            Show Saved Data
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffff',
    marginTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
  },
  btnShow: {
    backgroundColor: '#6A82FF',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontWeight: '500',
  },
});
export default Storage;
