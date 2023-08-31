import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA7DW_l7VtzLbZCTrS76ux57I3lBa54wok',
  authDomain: 'next-ecommerce-b79b4.firebaseapp.com',
  projectId: 'next-ecommerce-b79b4',
  storageBucket: 'next-ecommerce-b79b4.appspot.com',
  messagingSenderId: '393088582926',
  appId: '1:393088582926:web:72e809e4bccbd3df29435f',
  measurementId: 'G-2NF3GDF5D1'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const fireStoreDB = getFirestore(app)

export { fireStoreDB }
