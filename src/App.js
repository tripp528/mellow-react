import React from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'

import { useCollectionData } from 'react-firebase-hooks/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC5__rt9myffWYA7v_03Zcb3CzbYvIlB6Y",
    authDomain: "mellow-7cac6.firebaseapp.com",
    projectId: "mellow-7cac6",
    storageBucket: "mellow-7cac6.appspot.com",
    messagingSenderId: "24271594627",
    appId: "1:24271594627:web:dc7100007797edddeda7b6",
    measurementId: "G-PHR6T070H0"
  })
} else {
   firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore()

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        <BoulderList />
      </section>
    </div>
  );
}

const BoulderList = ({}) => {

  // reference to boulders collection in firestore
  const boulders_ref = firestore.collection('boulders')
  const [boulders] = useCollectionData(boulders_ref, {
    idField: 'id',
  })

  return (
    <div>
      {boulders && boulders.map(boulder => {
        return (
          <Boulder
            key={boulder.id}
            name={boulder.name}
            lat={boulder.location.latitude}
            lng={boulder.location.longitude}
          />
        )
      })}
    </div>
  )
}

const Boulder = ({id, name, lat, lng}) => {
  return (
    <div key={id}>
      <p> {name} </p>
      <p> {lat} </p>
      <p> {lng} </p>
    </div>
  )
}

export default App
