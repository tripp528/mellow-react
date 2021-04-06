
export const error_msg = (...args) => {
  console.error(...args)
  alert(args)
}


export const collections = {
  BOULDERS: 'boulders',
  AREAS: 'areas'
}


export const is_valid_image = file => {
  // check if a file is jpg or png and less than 2mb
  const less_2mb = file.size / 1024 / 1024 < 2
  const jpg_or_png = file.type === 'image/jpeg' || file.type === 'image/png'

  return less_2mb && jpg_or_png
}


export const uuid = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}


export const get_unique_file_name = local_file_name => {
  const extension = local_file_name.split('.').pop()
  return uuid() + '.' + extension
}
