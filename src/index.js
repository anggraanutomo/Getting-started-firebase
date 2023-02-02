import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBN-WhJ9BfJ4wk1aCed9htLE2Gva1Xlj9o",
    authDomain: "fir-9-dojo-354c9.firebaseapp.com",
    projectId: "fir-9-dojo-354c9",
    storageBucket: "fir-9-dojo-354c9.appspot.com",
    messagingSenderId: "18598714807",
    appId: "1:18598714807:web:83814bf3ec1c4ca7ec1c32"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({...doc.data(), id: doc.id})
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })