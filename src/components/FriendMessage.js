import React from 'react';

import {Image, Text, View, StyleSheet} from 'react-native';

function FriendMessage(props) {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/profile-icon.png')}
        />
        <Text style={styles.textStyle}>{props.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 2,
    flexDirection: 'row',
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 20,
    padding: 10,
  },
  imageStyle: {
    margin: 1,
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
  },
});

export default FriendMessage;
