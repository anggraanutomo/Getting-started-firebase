import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    getDocs, addDoc, deleteDoc, doc,
    query, where, orderBy, serverTimestamp,
    getDoc
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


// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data
onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset()
        })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })

})

// get a single document
const docRef = doc(db, 'books', '22lEKcLGoikcZ7voKh9w')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

