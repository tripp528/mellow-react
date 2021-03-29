import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { FirestoreContext } from 'FirestoreProvider'
import CreateBoulder from 'CreateBoulder'

const BoulderList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to boulders collection in firestore
  const boulders_ref = db.collection('boulders')
  const [boulders] = useCollectionData(boulders_ref, {
    idField: 'id',
    refField: 'doc_ref'
  })

  return (
    <List>
      <CreateBoulder />
      {boulders && boulders.map(boulder => (
        <ListItem key={boulder.id}>
          <ListItemText inset
            primary={boulder.name}
            secondary={"(" + boulder.location.latitude + ", " + boulder.location.latitude + ")"}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default BoulderList
