import React, { useContext, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FirestoreContext } from 'FirestoreProvider'
import { Button, Modal } from 'antd'

const CreateBoulder = ({}) => {
  const [modal_showing, set_modal_showing] = useState(false)

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > CREATE </Button>

      <Modal
        title="Basic Modal"
        visible={modal_showing}
        onOk={() => set_modal_showing(false)}
        onCancel={() => set_modal_showing(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </div>
  )
}

export default CreateBoulder
