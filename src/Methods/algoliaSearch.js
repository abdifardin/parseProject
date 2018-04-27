/**
 * Created by abdi.fakhruddin on 4/22/17.
 */

import algoliasearch from 'algoliasearch';
import { algoliaImporter } from './firebaseQueries';

// configure algolia
let algolia = algoliasearch(
    'M1Q3DVZ6SY',
    '8635e55a7b0b5c19155e80fac09db18d',
    { protocol: 'https:' }
);

var index = algolia.initIndex('parsProject');

const searchPostsSuggestion = (searchItem, cb) => {
    index.search(searchItem, cb);
};

const initialImporter = (dataSnapshot) => { 
    // Array of data to index
    var objectsToIndex = [];
    // Get all objects
    var values = dataSnapshot.val();
    // Process each child Firebase object
    dataSnapshot.forEach((function (childSnapshot) {
        // get the key and data from the snapshot
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // Specify Algolia's objectID using the Firebase object key
        childData.objectID = childKey;
        // Add object for indexing
        objectsToIndex.push(childData);
    }));
    // Add or update new objects
    index.saveObjects(objectsToIndex, function (err, content) {
        if (err) {
            throw err;
        }
        console.log('Firebase -> Algolia import done');
    });
};

const addOrUpdateIndexRecord = (dataSnapshot) => {
    // Get Firebase object
    var firebaseObject = dataSnapshot.val();
    // Specify Algolia's objectID using the Firebase object key
    firebaseObject.objectID = dataSnapshot.key;
    // Add or update object
    index.saveObject(firebaseObject, function (err, content) {
        if (err) {
            throw err;
        }
        console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
    });
}

const deleteIndexRecord = (dataSnapshot) => {
    // Get Algolia's objectID from the Firebase object key
    var objectID = dataSnapshot.key;
    // Remove the object from Algolia
    index.deleteObject(objectID, function (err, content) {
        if (err) {
            throw err;
        }
        console.log('Firebase object deleted from Algolia', objectID);
    });
}



export {
    initialImporter,
    searchPostsSuggestion,
    algoliaImporter,
    addOrUpdateIndexRecord,
    deleteIndexRecord
}