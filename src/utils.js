
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
