import React, {useState} from 'react';
import {Alert, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebaseSvc from '../config/firebaseSvc';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpUser = () => {
    setLoading(true);
    firebaseSvc
      .createAccount(getUser())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', error.message);
      });
  };

  const getUser = () => {
    return {
      name: name,
      email: email,
      password: password,
    };
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <Title style={styles.titleText}>Register to chat</Title>
      <FormInput
        labelName="Name"
        value={name}
        autoCapitalize="none"
        onChangeText={(username) => setName(username)}
      />
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormInput
        labelName="Confirm Password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={(p) => setConfirmPassword(p)}
      />
      <FormButton
        title="Signup"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => signUpUser()}
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
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default SignUp;
