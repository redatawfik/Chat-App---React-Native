import React, {useState, useEffect} from 'react';

import {View, FlatList, StyleSheet} from 'react-native';
import firebase from 'firebase';
import FriendMessage from '../components/FriendMessage';
import MyMessage from '../components/MyMessage';
import firebaseSvc from '../config/firebaseSvc';
import MessageInput from '../components/MessageInput';

function ChatRoom({route, navigation}) {
  const [messages, setMessages] = useState([]);

  const {uid} = route.params;
  const myId = firebase.auth().currentUser.uid;
  const threadId = myId.localeCompare(uid) > 0 ? myId + uid : uid + myId;
  console.log('threadId: ' + threadId);
  console.log('myId: ' + myId);
  console.log('uid: ' + uid);

  const updateMessagesList = (m) => {
    console.log('updateMessagesList', m);
    if (!m) {
      return;
    }
    const msgs = Object.values(m);
    setMessages(msgs);
  };

  useEffect(() => {
    const starCountRef = firebase.database().ref('messages/' + threadId);
    starCountRef.on('value', function (snapshot) {
      updateMessagesList(snapshot.val());
    });
  }, []);

  const clickSend = (message) => {
    const msg = getMessageObject(message);
    firebaseSvc.send(msg, threadId);
  };

  const getMessageObject = (message) => {
    return {
      uid: myId,
      message: message,
      createdAt: firebaseSvc.timestamp,
    };
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={messages}
        renderItem={({item}) => {
          if (item.uid === myId) {
            return <MyMessage id={item.uid} message={item.message} />;
          } else {
            return <FriendMessage id={item.uid} message={item.message} />;
          }
        }}
        keyExtractor={(msg) => msg.createdAt}
      />
      <MessageInput onSendClick={clickSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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

export default ChatRoom;
