import React, { useState, createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import firebase_config from './firebase_config'

// initialize firebase app if not yet
let firebase_app
if (!firebase.apps.length) {
  firebase_app = firebase.initializeApp(firebase_config)
} else {
  firebase_app = firebase.app()
}

// initialize state of context
const initial_state = {
  db: firebase_app.firestore()
}

export const FirestoreContext = createContext(initial_state)

export const FirestoreProvider = ({ children }) => {

  const [value, set_value] = useState(initial_state)

  return (
    <FirestoreContext.Provider value={ value }>
      {children}
    </FirestoreContext.Provider>
  )
}
