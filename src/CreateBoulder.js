import React, { useContext, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FirestoreContext } from 'FirestoreProvider'
import { Button, Modal, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const CreateBoulder = ({}) => {
  const classes = useStyles()

  const [modal_showing, set_modal_showing] = useState(false)

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > CREATE </Button>

      <Modal open={modal_showing} onClose={() => set_modal_showing(false)} >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Create New Boulder</h2>
          <p id="simple-modal-description">
            Some stuff here
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default CreateBoulder
