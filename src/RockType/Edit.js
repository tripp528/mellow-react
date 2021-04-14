import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import RockTypeModalForm from 'RockType/ModalForm'


const RockTypeEdit = ({
  rock_type
}) => {

  const [modal_showing, set_modal_showing] = useState(false)

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Edit </Button>

      {/*this is so it unmounts and clears form after submit */}
      {modal_showing ? <RockTypeModalForm
        modal_showing={modal_showing}
        set_modal_showing={set_modal_showing}
        rock_type={rock_type}
      /> : null}

    </div>
  )
}

export default RockTypeEdit
