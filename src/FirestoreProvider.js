import React, { useState, createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

import firebase_config from './firebase_config'

// initialize firebase app if not yet
let firebase_app
if (!firebase.apps.length) {
  firebase_app = firebase.initializeApp(firebase_config)
} else {
  firebase_app = firebase.app()
}

// initialize state of context
const init_store = {
  db: firebase_app.firestore(),
  storage_ref: firebase.storage().ref()
}

export const FirestoreContext = createContext(init_store)

export const FirestoreProvider = ({ children }) => {

  const [store, set_store] = useState(init_store)

  return (
    <FirestoreContext.Provider value={ { ...store, set_store } }>
      {children}
    </FirestoreContext.Provider>
  )
}
