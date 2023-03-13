import React from 'react';
import {View, Text, Button} from 'react-native';

const Menu = () => {
  return (
    <View style={Style.main}>
      <Text style={Style.head}>Select from the menue below:</Text>
      {((mapOpen || savedImg || uploadImage || uploadVid) && mapOpen) ||
      !(mapOpen || savedImg || uploadImage || uploadVid) ? (
        <Button
          title="My locations"
          onPress={() => {
            openMap(true);
          }}></Button>
      ) : null}
      {((mapOpen || savedImg || uploadImage || uploadVid) && uploadImage) ||
      !(mapOpen || savedImg || uploadImage || uploadVid) ? (
        <Button
          title="Upload Image"
          onPress={() => {
            setImg(true);
          }}></Button>
      ) : null}
      {((mapOpen || savedImg || uploadImage || uploadVid) && uploadVid) ||
      !(mapOpen || savedImg || uploadImage || uploadVid) ? (
        <Button
          title="Upload Video"
          onPress={() => {
            setVid(true);
          }}></Button>
      ) : null}
      {((mapOpen || savedImg || uploadImage || uploadVid) && savedImg) ||
      !(mapOpen || savedImg || uploadImage || uploadVid) ? (
        <Button
          title="Saved Images"
          onPress={() => {
            setSavImg(true);
          }}></Button>
      ) : null}

      {mapOpen || savedImg || uploadImage || uploadVid ? (
        <Button
          title=" Go Back"
          onPress={() => {
            setImg(false);
            setVid(false);
            setSavImg(false);
            openMap(false);
          }}></Button>
      ) : null}
    </View>
  );
};

export default Menu;
