import React, {useState, useEffect} from 'react';

import {Image, TouchableOpacity, View, FlatList} from 'react-native';
import firebase from 'firebase';
import UserHeader from '../components/UserHeader';

function Home({navigation}) {
  const [usersList, setUsersList] = useState([]);

  const updateUserList = (data) => {
    console.log(data);
    if (!data) {
      return;
    }
    setUsersList(Object.values(data));
  };

  useEffect(() => {
    const starCountRef = firebase.database().ref('users');
    starCountRef.on('value', function (snapshot) {
      updateUserList(snapshot.val());
    });
  }, []);

  const ProfileIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          style={{marginRight: 10, width: 30, height: 30}}
          source={require('../assets/profile-icon.png')}
        />
      </TouchableOpacity>
    );
  };

  navigation.setOptions({
    headerRight: () => <ProfileIcon navigation={navigation} />,
  });

  const clickUserHandler = (user) => {
    console.log('Clicked');
    navigation.navigate('ChatRoom', {
      uid: user.uid,
    });
    console.log(firebase.auth().currentUser);
  };

  return (
    <View>
      <FlatList
        data={usersList}
        renderItem={({item}) => (
          <UserHeader
            id={item.id}
            name={item.name}
            photoURL={item.photoURL}
            onClickItem={() => clickUserHandler(item)}
          />
        )}
        keyExtractor={(user) => user.id}
      />
    </View>
  );
}

export default Home;
