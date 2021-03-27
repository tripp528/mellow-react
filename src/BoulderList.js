import React, { useState, useEffect } from 'react'
import BoulderView from './BoulderView'
import { BoulderModel } from './model/BoulderModel'

const BoulderList = () => {

  const [boulders, set_boulders] = useState([])
  const bmodel = new BoulderModel()

  useEffect(() => {
    console.log("YOO")
    bmodel.subscribe_all_boulders()
    .then(res => {
      set_boulders(res)
    })
    .catch(err => {
      console.error(err)
    })
  }, [])

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
