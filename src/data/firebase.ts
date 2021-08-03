import admin from 'firebase-admin'
import Keys from './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(Keys)
})

const dbFirebase = admin.database()

export default dbFirebase
