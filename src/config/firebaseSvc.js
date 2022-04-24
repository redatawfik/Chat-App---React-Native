import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'REMOVED',
  authDomain: 'REMOVED',
  databaseURL: 'REMOVED',
  projectId: 'REMOVED',
  storageBucket: 'REMOVED',
  messagingSenderId: 'REMOVED',
  appId: 'REMOVED8',
  measurementId: 'REMOVED',
};

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      firebase.firestore();
    } else {
      console.log('firebase apps already running...');
    }
  }

  login = async (user, success_callback, failed_callback) => {
    console.log('logging in');
    const output = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        this.login(user);
      } catch ({message}) {
        console.log('Failed:' + message);
      }
    } else {
      console.log('Reusing auth...');
    }
  };

  createAccount = async (user) => {
    var that = this;
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function (data) {
        console.log(
          'created user successfully. User email:' +
            user.email +
            ' name:' +
            user.name,
        );
        var userf = firebase.auth().currentUser;
        userf.updateProfile({displayName: user.name}).then(
          function () {
            console.log('Updated displayName successfully. name:' + user.name);
            that.addUser();
            console.log('User ' + user.name + ' was created successfully.');
          },
          function (error) {
            console.warn('Error update displayName.');
          },
        );
      })
      .catch((error) => alert(error));
  };

  uploadImage = async (uri) => {
    const that = this;
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('images')
        .child('123' + Date.now());
      const task = ref.put(blob);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
            /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => {
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('download', downloadURL);
              that.updateAvatar(downloadURL);
            });
            resolve(task.snapshot.downloadURL);
          },
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  };

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    const that = this;
    const userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({photoUrl: url}).then(
        function () {
          console.log('Updated avatar successfully. url:' + url);
          alert('Avatar image is saved successfully.');
          that.addUser(url);
          console.log('userf.photoUR', userf.photoURL);
        },
        function (error) {
          console.warn('Error update avatar.');
          alert('Error update avatar. Error:' + error.message);
        },
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert('Unable to update avatar. You must login first.');
    }
  };

  onLogout = (user) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('Sign-out successful.');
      })
      .catch(function (error) {
        console.log('An error happened when signing out');
      });
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('users');
    // const database = firebase.firestore();
    // console.log('firestore', database);
    //return firebase.firestore().collection('user');
  }

  parse = (snapshot) => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: id} = snapshot;
    const {key: _id} = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = (callback) => {
    this.ref
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  addUser = (url = '') => {
    var userf = firebase.auth().currentUser;
    console.log('userf', userf);
    firebase
      .database()
      .ref('users/' + userf.uid)
      .set({
        name: userf.displayName,
        email: userf.email,
        uid: userf.uid,
        photoURL: url,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // send the message to the Backend
  send = (message, threadId) => {
    // for (let i = 0; i < messages.length; i++) {
    //   const {text, user} = messages[i];
    //   const message = {
    //     text,
    //     user,
    //     createdAt: this.timestamp,
    //   };
    firebase
      .database()
      .ref('messages/' + threadId)
      .push(message);
  };

  refOff() {
    this.ref.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
