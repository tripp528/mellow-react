import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core';

const BoulderView = ({name, location, doc_ref}) => {
  // const loc = new firebase.firestore.GeoPoint(lat, lng)

  const [new_name, set_new_name] = React.useState('')

  return (
    <div>
      <p> {name} </p>
      <p> {location.latitude} </p>
      <p> {location.longitude} </p>
      <TextField value={new_name} onChange={e => set_new_name(e.target.value)} />
      <Button
        color="primary"
        onClick={() => {
          doc_ref.update({ name: new_name })
        }}
      > Change Name </Button>
    </div>
  )
}


BoulderView.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  doc_ref: PropTypes.object.isRequired,
};

export default BoulderView
