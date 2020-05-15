import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import firebaseSvc from '../config/firebaseSvc';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const updateUserList = (data) => {
    if (!data) {
      return;
    }
    console.log('data', data.name);
    setPhotoURL(data.photoURL);
    setName(data.name);
    setEmail(data.email);
  };

  useEffect(() => {
    const starCountRef = firebase.database().ref('users/' + props.user.uid);
    starCountRef.on('value', function (snapshot) {
      updateUserList(snapshot.val());
    });
  }, []);

  const updateUserImageHandler = () => {
    launchCamera();
  };

  const launchCamera = () => {
    const options = {
      title: 'Select Avatar',
      takePhotoButtonTitle: 'choose photo from camera',
      chooseFromLibraryButtonTitle: 'choose photo from library',
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        firebaseSvc.uploadImage(response.uri);
      }
    });
  };

  const logoutUser = () => {
    firebaseSvc.onLogout(props.user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Image style={styles.avatar} source={{uri: photoURL}} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{email}</Text>

          <TouchableOpacity
            onPress={updateUserImageHandler}
            style={styles.buttonContainer}>
            <Text>Update profile picture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logoutUser} style={styles.logoutStyle}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  logoutStyle: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#ff0000',
  },
  text: {
    color: '#ffffff',
  },
});
