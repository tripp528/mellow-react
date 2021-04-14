import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import ClimbingStyleTagModalForm from 'ClimbingStyleTag/ModalForm'


const ClimbingStyleTagEdit = ({
  climbing_style_tag
}) => {

  const [modal_showing, set_modal_showing] = useState(false)

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Edit </Button>

      {/*this is so it unmounts and clears form after submit */}
      {modal_showing ? <ClimbingStyleTagModalForm
        modal_showing={modal_showing}
        set_modal_showing={set_modal_showing}
        climbing_style_tag={climbing_style_tag}
      /> : null}

    </div>
  )
}

export default ClimbingStyleTagEdit
