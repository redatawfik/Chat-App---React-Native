import React, {useState} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import firebaseSvc from '../config/firebaseSvc';

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setEmail('');
    setPassword('');
  };

  const signUpUser = () => {
    navigation.navigate('SignUp');
    clear();
  };

  const forgetPassword = () => {
    navigation.navigate('ForgetPassword');
    clear();
  };

  const onSuccessCallback = () => {
    setLoading(false);
  };

  const loginUser = () => {
    setLoading(true);
    console.log('try to login');
    firebaseSvc.login(getUser(), onSuccessCallback).catch(function (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    });
  };

  const getUser = () => {
    return {
      email: email,
      password: password,
    };
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <Title style={styles.titleText}>Welcome to Chat app</Title>
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
      <FormButton
        title="Login"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => loginUser()}
      />
      <FormButton
        title="New user? Join here"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => signUpUser()}
      />
      <FormButton
        title="Forget password?"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.forgetPasswordStyle}
        onPress={() => forgetPassword()}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default Login;

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
  navButtonText: {
    fontSize: 16,
  },
  forgetPasswordStyle: {
    fontSize: 16,
    color: 'red',
  },
});
