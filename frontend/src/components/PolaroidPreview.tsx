import { useRef, useState, useEffect } from 'react'

export default function PolaroidPreview(){
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [desc, setDesc] = useState<string>('')
  const [showCamera, setShowCamera] = useState(false)
  const [showDescInput, setShowDescInput] = useState(false)
  const preventOpenRef = useRef(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

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
    if (preventOpenRef.current) return
    setShowCamera(true)
    // mark body so global UI (send button) can hide while camera/modal is open
    try { document.body.classList.add('polaroid-modal-open') } catch(e) {}
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
    // remove modal marker
    try { document.body.classList.remove('polaroid-modal-open') } catch(e) {}
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
    try { document.body.classList.add('polaroid-modal-open') } catch(e) {}
  }

  function saveDescription() {
    // keep the captured image and close the description prompt
    setShowDescInput(false)
    // ensure camera is closed
    closeCamera()
    // briefly prevent re-opening due to click event bubbling
    preventOpenRef.current = true
    setTimeout(() => { preventOpenRef.current = false }, 300)
  }

  // ensure body class is removed on unmount
  useEffect(() => {
    return () => {
      try { document.body.classList.remove('polaroid-modal-open') } catch(e) {}
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center polaroid-section-outer hover:scale-105 hover:shadow-xl transition-all duration-300">
  <div className="polaroid-frame" onClick={(e) => { e.stopPropagation(); if (!showCamera && !showDescInput) openCamera() }} title="Click to add photo">
        {imageSrc ? (
          <div className="polaroid-inner">
            <img src={imageSrc} alt={desc || 'Captured polaroid'} className="polaroid-img" />
          </div>
        ) : (
          <div className="polaroid-inner polaroid-placeholder" />
        )}

        {/* place description inside the white polaroid bottom area */}
        {desc && <p className="polaroid-desc">{desc}</p>}
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
              <button onClick={() => {
                // clear any typed description and close prompt
                setDesc('')
                setShowDescInput(false)
                closeCamera()
                // prevent immediate reopen due to click bubbling
                preventOpenRef.current = true
                setTimeout(() => { preventOpenRef.current = false }, 300)
              }} className="px-3 py-1 mr-2">Skip</button>
              <button onClick={saveDescription} className="px-3 py-1 bg-pink-500 text-white rounded">Save</button>
            </div>
        </div>
      )}
    </div>
  )
}
