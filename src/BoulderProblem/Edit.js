import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import BoulderProblemModalForm from 'BoulderProblem/ModalForm'


const BoulderProblemEdit = ({
  boulder_problem
}) => {

  const [modal_showing, set_modal_showing] = useState(false)

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Edit </Button>

      {/*this is so it unmounts and clears form after submit */}
      {modal_showing ? <BoulderProblemModalForm
        modal_showing={modal_showing}
        set_modal_showing={set_modal_showing}
        boulder_problem={boulder_problem}
      /> : null}

    </div>
  )
}

export default BoulderProblemEdit
