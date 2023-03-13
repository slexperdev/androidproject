import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

const Video = () => {
  const [customerNotes, setNotes] = useState('');
  const [uri, setUri] = useState('');

  const openCamera = () => {
    let option = {};
    option = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 30,
      storageOptions: {
        skipBackup: true,
        path: 'video',
      },
    };

    launchCamera(option, response => {
      if (response.error) {
        console.log('ERROR ::  ', response.error);
      } else if (response.didCancel) {
        console.log('Transaction canceled by the user');
      } else {
        setUri(response.assets[0].uri);
      }
    });
  };

  const uploadToInstagram = async () => {
    await Share.shareSingle({
      social: Share.Social.INSTAGRAM,
      url: uri,
      type: 'video/*',
    });
  };

  return (
    <View style={Style.container}>
      {uri === '' ? (
        <TouchableOpacity style={Style.btnShow} onPress={openCamera}>
          <Text style={{color: '#ffff', fontWeight: '500'}}>Capture Video</Text>
        </TouchableOpacity>
      ) : null}
      {uri !== '' ? (
        <View>
          <Button
            title="Upload To Instagram"
            onPress={uploadToInstagram}></Button>

          <View>
            <TextInput
              onChangeText={newText => setNotes(newText)}
              defaultValue={customerNotes}
            />
          </View>
        </View>
      ) : null}
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
});

export default Video;
