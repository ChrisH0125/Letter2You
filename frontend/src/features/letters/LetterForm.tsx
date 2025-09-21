import { useState, useRef } from "react";
import { db } from "../../firebaseClient";
import microphoneIcon from '../../assets/microphoneIcon.png'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// imports from function from firebase 

export default function LetterForm() {
  const [message, setMessage] = useState("");        // committed textarea input
  const [interim, setInterim] = useState("") // live interim transcript
  const [status, setStatus] = useState<string | null>(null); // show success/error
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    try {
      await addDoc(collection(db, "letters"), {
        message,
        createdAt: serverTimestamp(),
      });

      setStatus("Letter saved!");
      setMessage("");  // clear textarea
    } catch (err: any) {
      console.error(err);
      setStatus("Error saving letter: " + err.message);
    }
  };

  return (
    <form 
      className="p-1 w-[26vw] h-[40vh] rounded-[50px] bg-[#2B1917]" 
      onSubmit={handleSubmit}  // form submission triggers Firestore save
    >
      <textarea
        className="p-4 w-full h-full resize-none bg-transparent text-white placeholder-gray-400 border-0 focus:outline-none focus:ring-0"
        placeholder="Write something sentimental :)"
        value={message + interim}
        onChange={(e) => { setMessage(e.target.value); setInterim("") }} // update state as user types
        required
      />
      <div className = "flex flex-row justify-start items-center">
        <button 
          type="submit" 
          className="px-3 py-2 bg-pink-500 text-white rounded"
        > 
          Send Letter
        </button>
        {status && <p className="mt-1 text-white">{status}</p>}

        <button
          type="button"
          className={`cameraButton ${listening ? 'ring-2 ring-pink-400' : ''}`}
          aria-pressed={listening}
          aria-label={listening ? 'Stop voice input' : 'Start voice input'}
          onClick={() => {
            // feature detect
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            if (!SpeechRecognition) {
              alert('Speech recognition is not supported in this browser.')
              return
            }

            if (listening) {
              // stop
              try { recognitionRef.current?.stop() } catch (e) {}
              setListening(false)
              setInterim("")
              return
            }

            // start
            try {
              const recog = new SpeechRecognition()
              recognitionRef.current = recog
              recog.continuous = true
              recog.interimResults = true
              recog.lang = navigator.language || 'en-US'

              recog.onstart = () => { setListening(true) }
              recog.onend = () => { setListening(false); setInterim("") }
              recog.onerror = (ev: any) => {
                console.error('Speech recognition error', ev)
                setStatus('Speech recognition error: ' + (ev.error || 'unknown'))
                setListening(false)
              }

              recog.onresult = (ev: any) => {
                let interimTrans = ''
                let finalTrans = ''
                for (let i = ev.resultIndex; i < ev.results.length; i++) {
                  const res = ev.results[i]
                  const t = res[0].transcript
                  if (res.isFinal) finalTrans += t
                  else interimTrans += t
                }
                if (finalTrans) {
                  setMessage((m) => (m + finalTrans))
                }
                setInterim(interimTrans)
              }

              recog.start()
            } catch (err) {
              console.error(err)
              alert('Could not start speech recognition')
            }
          }}
        >
          <img src={microphoneIcon} alt="mic button"/>
        </button>
      </div>
    </form>
  );
}
