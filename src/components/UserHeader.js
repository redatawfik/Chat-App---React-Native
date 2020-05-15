import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

function UserHeader(props) {
  return (
    <TouchableOpacity onPress={props.onClickItem}>
      <View style={styles.container}>
        <Avatar
          size="large"
          rounded
          source={{
            uri: props.photoURL,
          }}
        />
        <Text style={styles.nameStyle}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 2,
    flexDirection: 'row',
  },
  nameStyle: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  imageStyle: {
    margin: 3,
    width: 50,
    height: 50,
  },
  border: {
    backgroundColor: '#474747',
    height: 1,
  },
});

export default UserHeader;
