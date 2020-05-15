import React from 'react';

import {Image, Text, View, StyleSheet} from 'react-native';

function MyMessage(props) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{props.message}</Text>
        <Image
          style={styles.imageStyle}
          source={require('../assets/profile-icon.png')}
        />
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
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 20,
    backgroundColor: '#c6c4c4',
    padding: 10,
    textAlign: 'right',
  },
  imageStyle: {
    margin: 1,
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
  },
});

export default MyMessage;
