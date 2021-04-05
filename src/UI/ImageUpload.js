import React, { useContext, useState } from 'react'
import { useDownloadURL } from 'react-firebase-hooks/storage'

import { FirestoreContext } from 'FirestoreProvider'

const ImageUpload = ({
  dir_path = '/images/area',
  url,
  set_url
}) => {
  const { storage_ref } = useContext(FirestoreContext)

  const upload = async (local_file) => {
    const dir_ref = storage_ref.child(dir_path)
    const file_ref = dir_ref.child(local_file.name)
    await file_ref.put(local_file)
    set_url(await file_ref.getDownloadURL())
  }

  return (
    <input
      type="file"
      onChange={e => upload(e.target.files[0])}
    />
  )
}


export default ImageUpload
