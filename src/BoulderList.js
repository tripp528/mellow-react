import React, { useState, useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import BoulderView from './BoulderView'
import { FirestoreContext } from './FirestoreProvider'

const BoulderList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to boulders collection in firestore
  const boulders_ref = db.collection('boulders')
  const [boulders] = useCollectionData(boulders_ref, {
    idField: 'id',
    refField: 'doc_ref',
    // transform: t => {
    //   return t
    // }
  })

  return (
    <div>
      {boulders && boulders.map(boulder => {
        return (
          <BoulderView
            key={boulder.id}
            name={boulder.name}
            location={boulder.location}
            doc_ref={boulder.doc_ref}
          />
        )
      })}
    </div>
  )
}

export default BoulderList
