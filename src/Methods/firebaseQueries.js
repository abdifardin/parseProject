
import firebase from 'firebase';
import { config } from './config';
import { initialImporter } from '../Methods/algoliaSearch';


firebase.initializeApp(config);

//Get posts for visitors
const getPosts = (mode, cb) => {
    const user = getCurrentUser();
    // reference to FB account
    const itemRef = `posts`;
    const dbRef = firebase.database().ref(itemRef);

    if (mode === 'userPost')
        dbRef
            .orderByChild('uid')
            .equalTo(user.uid)
            .on('value', (snapshot) => {
                cb(_toArray(snapshot));
            });
    else// query
        dbRef
            .orderByKey()
            .on('value', (snapshot) => {
                cb(_toArray(snapshot));
            });
};

//Get a post
const getAPost = (cb, fbKey) => {
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

//New Post
const newPost = (newPost, fbKeyParam) => {
    // if we are in editing mode, then we have fbKey already
    // so we can use it for update
    // if not we should generate a new one
    const fbKey = fbKeyParam || getFbKey('posts');
    newPost.uid = getCurrentUser().uid;
    newPost.timestamp = Date.now();
    const postPreview = {
        title: newPost.title,
        uid: newPost.uid,
        timestamp: newPost.timestamp
    };
    // reference to FB account - posts
    const itemRef = `posts/${fbKey}`;
    const dbRef = firebase.database().ref(itemRef);

    // reference to preview path
    const itemRef_preview = `posts-preview/${fbKey}`;
    const dbRef_preview = firebase.database().ref(itemRef_preview);

    // query
    dbRef.set(newPost);
    dbRef_preview.push(newPost);
};

//Update a post
const updatePost = (cb, fbKey, newPost) => {
    // reference to FB account
    const itemRef = `posts/${fbKey}`;
    const dbRef = firebase.database().ref(itemRef);

    // query
    dbRef.set(newPost, (result) => {
        //todo: console
        console.log('result', result);
    });
};

//Delete a post
const deletePost = (fbKey) => {
    // reference to FB account - posts list
    const itemRef = `posts/${fbKey}`;
    const dbRef = firebase.database().ref(itemRef);

    //  posts - preview path
    const itemRef_preview = `posts-preview/${fbKey}`;
    const dbRef_preview = firebase.database().ref(itemRef_preview);

    // query
    dbRef.remove();
    dbRef_preview.remove();
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

const algoliaImporter = () => {
    // reference to FB.USER_LIKES account
    const itemRef = 'posts';
    const dbRef = firebase.database().ref(itemRef);

    dbRef.on('value', initialImporter);
};

//
// Helder functions ( NOT EXPORTED )
//------------------------------------------------------------------
const getFbKey = (path) => {
    return firebase.database().ref().child(path).push().key;
};

const _toArray = (snapshot) => {
    var arr = [];
    snapshot.forEach(function (childSnapshot) {
        var val = childSnapshot.val();
        if (_isObject(val)) {
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
    logOutUser,
    newPost,
    algoliaImporter
}