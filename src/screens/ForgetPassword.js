import React, {useState} from 'react';
import {Alert, StyleSheet, View, ActivityIndicator} from 'react-native';

import firebase from 'firebase';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

function ForgetPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendResetEmail = () => {
    setLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        // Password reset email sent.
        setLoading(false);
        setSent(true);
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <Title style={styles.titleText}>
        Please provide the email address you used when you signed up for your
        account.
      </Title>
      {sent ? (
        <Title style={styles.sentText}>
          An email with password reset instructions has been sent to your email
          address
        </Title>
      ) : null}
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormButton
        title="Send email"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => sendResetEmail()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    margin: 15,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  sentText: {
    color: 'green',
    margin: 15,
  },
});

export default ForgetPassword;
