import admin from 'firebase-admin'
import firebase from 'firebase/app'
import 'firebase/storage'

const Keys = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(Keys)
})

const firebaseConfig = {
  apiKey: 'AIzaSyAzZj-zdANhmtj2wz9iCTRZJ3swfUsCXZ0',
  authDomain: 'pixnode-9a6fa.firebaseapp.com',
  databaseURL: 'https://pixnode-9a6fa-default-rtdb.firebaseio.com',
  projectId: 'pixnode-9a6fa',
  storageBucket: 'pixnode-9a6fa.appspot.com',
  messagingSenderId: '986306158399',
  appId: '1:986306158399:web:80f789beb8de6943b93d8a'
}
firebase.initializeApp(firebaseConfig)

export const dbfirebase = admin.firestore()

export const storagefirebase = firebase.storage()
