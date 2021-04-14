import React, { useContext, useState } from 'react'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import firebase from 'firebase/app'
import UploadedImage from 'UI/UploadedImage'

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'

const ImageUpload = ({
  images_ref,
  images
}) => {

  const { storage_ref } = useContext(FirestoreContext)
  const [upload_status, set_upload_status] = useState("none")
  const [upload_progress, set_upload_progress] = useState(0)

  const upload = async (local_file) => {

    // this will store in the storage the same path as in firestore
      // so if we are in areas/{id}/images/
      // it will be stored in the areas/{id}/images/ folder in storage
    const dir_ref = storage_ref.child(images_ref.path)

    // store unique filename with proper extension
    const filename = utils.get_unique_file_name(local_file.name)
    const file_ref = dir_ref.child(filename)

    // start uploading the file
    const upload_task = file_ref.put(local_file)

    // define success callback
    const upload_success = () => {
      // Upload completed successfully, now we can get the download URL
      upload_task.snapshot.ref.getDownloadURL().then((download_url) => {
        set_upload_status('uploaded')
        set_upload_progress(100)

        // add the download url to an image document in the images subcollection
        images_ref.doc(utils.uuid()).set({
          url: download_url
        })
        .then((docRef) => {
          console.log('saved')
        })
        .catch((error) => {
          utils.error_msg(error)
        })
      })
    }

    // define error callback
    const upload_error = error => {

      switch (error.code) {
        // https://firebase.google.com/docs/storage/web/handle-errors
        case 'storage/unauthorized':
          set_upload_status('unauthorized_error')
          break
        case 'storage/canceled':
          set_upload_status('canceled')
          break
        default:
          utils.error_msg(error)
          set_upload_status('unknown_error')
      }
    }

    // define progress callback
    const upload_progress = snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      set_upload_progress(progress)
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          set_upload_status('paused')
          break
        case firebase.storage.TaskState.RUNNING: // or 'running'
          set_upload_status('running')
          break
      }
    }

    // register callbacks
    upload_task.on (
      firebase.storage.TaskEvent.STATE_CHANGED,
      upload_progress,
      upload_error,
      upload_success
    )
  }

  return (
    <div>
      <p> {upload_status} {upload_progress} % </p>
      <input
        type="file"
        onChange={e => upload(e.target.files[0])}
      />
      {images && images.map(img => {
        return (
          <UploadedImage
            key={img.id}
            image_document={img}
          />
        )
      })}
    </div>
  )
}


export default ImageUpload
