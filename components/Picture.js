import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const Picture = ({location}) => {
  const [base64String, setString] = useState('');
  const [customerNotes, setNotes] = useState('');
  const [uri, setUri] = useState('');

  const saveToLocalStorage = async () => {
    const imageJson = {
      data: base64String,
      type: 'jpg',
      location,
      userNotes: customerNotes,
    };

    const storeData = async (value, key) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.log('ERROR :: ', e);
      }
    };

    AsyncStorage.getAllKeys((err, keys) => {
      if (keys.length !== 0) {
        let last = parseInt(keys[keys.length - 1]);
        let currentKey = (last + 1).toString();

        storeData(imageJson, currentKey);
      } else {
        storeData(imageJson, '0');
      }
    });
    Alert.alert('Saved!', 'Image saved successfully');
  };

  const openCamera = () => {
    let option = {};
    option = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    launchCamera(option, response => {
      if (response.error) {
        console.log('ERROR ::  ', response.error);
      } else if (response.didCancel) {
        console.log('Transaction canceled by the user');
      } else {
        setString(response.assets[0].base64);
        setUri(response.assets[0].uri);
      }
    });
  };

  const uploadToInstagram = async () => {
    await Share.shareSingle({
      social: Share.Social.INSTAGRAM,
      url: uri,
      type: 'image/*',
    });
  };

  return (
    <View style={base64String === '' ? Style.container1 : Style.container}>
      {base64String === '' ? (
        <TouchableOpacity style={Style.btnShow} onPress={openCamera}>
          <Text style={{color: '#ffff', fontWeight: '500'}}>Capture Image</Text>
        </TouchableOpacity>
      ) : null}
      {base64String !== '' ? (
        <>
          <TextInput
            style={{
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
              width: '100%',
              padding: 5,
              marginTop: 10,
            }}
            onChangeText={newText => setNotes(newText)}
            defaultValue={customerNotes}
            placeholder="Notes here.."
          />
          <View style={{marginVertical: 20}}>
            <Button
              title="Upload To Instagram"
              onPress={uploadToInstagram}></Button>
          </View>
          <Button
            title="Save To DataBase"
            onPress={saveToLocalStorage}></Button>
        </>
      ) : null}
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    backgroundColor: '#ffff',
    flexDirection: 'column',
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    padding: 10,
  },
  container1: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    padding: 10,
  },
  btnShow: {
    backgroundColor: '#6A82FF',
    padding: 10,
    borderRadius: 10,
  },
});

export default Picture;
