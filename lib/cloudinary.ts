import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export function cldOptimize(url: string, width = 800, height = 1000) {
  const u = new URL(url)
  return `${u.origin}${u.pathname.replace('/upload', `/upload/f_auto,q_auto,c_fill,w_${width},h_${height}`)}`
}

export default cloudinary


