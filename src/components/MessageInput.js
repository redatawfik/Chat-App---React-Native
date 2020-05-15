import React, {useState} from 'react';

import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

function MessageInput(props) {
  const [message, setMessage] = useState('');

  const sendMessageClickHandler = () => {
    if (message.length !== 0) {
      props.onSendClick(message);
      setMessage('');
    }
  };

  const handleTextChanged = (text) => {
    setMessage(text);
  };

  const sendButtonStyle = function () {
    return {
      flex: 1,
      width: 30,
      height: 30,
      alignSelf: 'flex-end',
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
      opacity: message.length === 0 ? 0.3 : 1,
    };
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.messageInputStyle}
          value={message}
          onChangeText={(text) => handleTextChanged(text)}
          placeholder={'Enter a message...'}
        />
        <TouchableOpacity onPress={sendMessageClickHandler}>
          <Image
            style={sendButtonStyle()}
            source={require('../assets/send_message_icon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    borderTopColor: 'black',
    borderTopWidth: 1,
    height: 60,
  },
  messageInputStyle: {
    flex: 1,
  },
});

export default MessageInput;
