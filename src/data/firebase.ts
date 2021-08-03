import admin from 'firebase-admin'

const Keys = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(Keys),
})

const dbFirebase = admin.firestore()

export default dbFirebase
