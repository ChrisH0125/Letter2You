import { useRef, useState, useEffect } from 'react'
import littleGuy from '../assets/littleGuy.png'
import cameraIcon from '../assets/cameraIcon.png'

export default function PolaroidPreview(){
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [desc, setDesc] = useState<string>('')
  const [showCamera, setShowCamera] = useState(false)
  const [showDescInput, setShowDescInput] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    return () => {
      // cleanup stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop())
        streamRef.current = null
      }
    }
  }, [])

  async function openCamera(){
    setShowCamera(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error('Could not open camera', err)
      setShowCamera(false)
      alert('Unable to access camera — please grant permissions or use a supported device.')
    }
  }

  function closeCamera(){
    setShowCamera(false)
    if (videoRef.current) {
      try { videoRef.current.pause() } catch(e) {}
      videoRef.current.srcObject = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }

  function capture() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    const w = video.videoWidth
    const h = video.videoHeight
    // create a square-ish polaroid crop
    const size = Math.min(w, h)
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    // center crop
    const sx = (w - size) / 2
    const sy = (h - size) / 2
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size)
    const data = canvas.toDataURL('image/png')
    setImageSrc(data)
    closeCamera()
    // prompt for description inline
    setShowDescInput(true)
  }

  function saveDescription() {
    setShowDescInput(false)
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* camera button above polaroid */}
      <button onClick={openCamera} className="mb-3 rounded-full bg-pink-200 p-3 cameraButton shadow-lg">
        <img src={cameraIcon} alt="open camera" style={{ width: 28, height: 28 }} />
      </button>

      <div className="bg-white w-[220px] h-[260px] p-3 flex flex-col items-center relative rounded-md shadow-md">
        <div className="bg-black w-full h-[85%] flex items-center justify-center overflow-hidden">
          {imageSrc ? (
            <img src={imageSrc} alt={desc || 'Captured polaroid'} className="object-cover w-full h-full" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-[#2B1917] p-4">
              <img src={littleGuy} alt="placeholder" className="w-28 h-28 object-contain mb-2" />
              <div className="text-sm text-red-400">No photo yet</div>
            </div>
          )}
        </div>

        <p className="absolute text-red-400 bottom-3 text-center text-xs w-full px-2">{desc || 'Image description'}</p>
      </div>

      {/* camera overlay */}
      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg p-4 max-w-3xl w-full mx-4">
            <div className="flex justify-between items-center mb-2">
              <strong>Camera</strong>
              <div className="flex gap-2">
                <button onClick={closeCamera} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
                <button onClick={capture} className="px-3 py-1 rounded bg-pink-500 text-white">Capture</button>
              </div>
            </div>
            <div className="w-full h-[60vh] bg-black flex items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* description prompt */}
      {showDescInput && (
        <div className="mt-2 w-[220px] bg-white p-3 rounded shadow">
          <label className="block text-xs text-red-700">Add an image description (optional)</label>
          <input className="w-full mt-2 p-2 border rounded text-red-400" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="mt-2 flex justify-end">
            <button onClick={() => { setShowDescInput(false) }} className="px-3 py-1 mr-2">Skip</button>
            <button onClick={saveDescription} className="px-3 py-1 bg-pink-500 text-white rounded">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}
