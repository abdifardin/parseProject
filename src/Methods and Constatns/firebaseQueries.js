
import firebase from 'firebase';
import  { config } from './config';


firebase.initializeApp(config);

//Get posts for visitors
const getPosts= (cb) => {
  // reference to FB account
  const itemRef = `posts-preview`;
  const dbRef = firebase.database().ref(itemRef);

  // query
  dbRef
    .orderByKey()
    .on('value', (snapshot) => {
      cb(_toArray(snapshot));
    });
};

//Get a post
const getAPost= (cb, fbKey) => {
    // reference to FB account
  const itemRef = `posts/${fbKey}`;
  const dbRef = firebase.database().ref(itemRef);

  // query
  dbRef
    .orderByKey()
    .once('value', (snapshot) => {
      cb(snapshot.val());
    });
};

//Update a post
const updatePost= (cb, fbKey, newPost) => {
     // reference to FB account
  const itemRef = `posts/${fbKey}`;
  const dbRef = firebase.database().ref(itemRef);

  // query
  dbRef .set(newPost, (result) => {
      //todo: console
      console.log('result', result);
    });
};

//Delete a post
const deletePost= (cb, fbKey) => {
     // reference to FB account
  const itemRef = `posts/${fbKey}`;
  const dbRef = firebase.database().ref(itemRef);

  // query
  dbRef.remove('value', (result) => {
      //todo: console
      console.log('result', result);
    });
};

const getCurrentUser = () => {
    return (firebase.auth().currentUser);
};

const createUser = (cb, data) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(user => {
            console.log('success creating user', user);
            cb(user, 'successs');

        })
        .catch(err => {
            // if auth/email-already-in-use then we should login
            if (err.code === "auth/email-already-in-use") {
                console.error(err);
                firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then(function (user) {
                        cb(user, 'successs');
                    }).catch(function (error) {
                        cb(false, 'error');
                        console.log(error);
                    });
            }
        });
};

const getAuthStatus = (cb) => {
    firebase.auth().onAuthStateChanged((user) => {
        //todo: console
        console.log('user', user);
        cb(user);
    });
}

const logOutUser = (cb) => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        //todo: console
        console.log('log out successfully');
    }, (error) => {
        // An error happened.
        /*if (error) {
          console.error(error)
          cb(error);
        }*/
    });
};

//
// Helder functions ( NOT EXPORTED )
//------------------------------------------------------------------
const _toArray = (snapshot) => {
    var arr = [];
    snapshot.forEach(function (childSnapshot){
      var val = childSnapshot.val();
      if(_isObject(val)){
        val.fbKey = childSnapshot.key;
      }
      arr.push(val);
    });
    return arr;
  };

const _isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]' ? true : false;
};



  //
  // Exports
  //------------------------------------------------------------------
  export {
      getPosts,
      getAPost,
      updatePost,
      deletePost,
      getCurrentUser,
      createUser,
      getAuthStatus,
      logOutUser
  }