
import firebase from 'firebase';
import  { config } from './config';


firebase.initializeApp(config);

//Get posts for visitors
getPosts= (cb) => {
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
getAPost= (cb, fbKey) => {
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
updatePost= (cb, fbKey, newPost) => {
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
deletePost= (cb, fbKey) => {
     // reference to FB account
  const itemRef = `posts/${fbKey}`;
  const dbRef = firebase.database().ref(itemRef);

  // query
  dbRef.remove('value', (result) => {
      //todo: console
      console.log('result', result);
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


  //
  // Exports
  //------------------------------------------------------------------
  export {
      getPosts,
      getAPost,
      updatePost,
      deletePost
  }