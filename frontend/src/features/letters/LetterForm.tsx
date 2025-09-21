import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { db } from "../../firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function LetterForm(_props: any, ref: any) {
  const [message, setMessage] = useState("");
  const [interim, setInterim] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "letters"), {
        message,
        createdAt: serverTimestamp(),
      });
      setStatus("Letter saved!");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setStatus("Error saving letter: " + err.message);
    }
  };

  function toggleMic() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (listening) {
      try { recognitionRef.current?.stop(); } catch (e) {}
      setListening(false);
      setInterim("");
      return;
    }

    try {
      const recog = new SpeechRecognition();
      recognitionRef.current = recog;
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = navigator.language || 'en-US';

      recog.onstart = () => setListening(true);
      recog.onend = () => { setListening(false); setInterim(""); };
      recog.onerror = (ev: any) => {
        console.error('Speech recognition error', ev);
        setStatus('Speech recognition error: ' + (ev.error || 'unknown'));
        setListening(false);
      };

      recog.onresult = (ev: any) => {
        let interimTrans = '';
        let finalTrans = '';
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const res = ev.results[i];
          const t = res[0].transcript;
          if (res.isFinal) finalTrans += t;
          else interimTrans += t;
        }
        if (finalTrans) setMessage((m) => (m + finalTrans));
        setInterim(interimTrans);
      };

      recog.start();
    } catch (err) {
      console.error(err);
      alert('Could not start speech recognition');
    }
  }

  useImperativeHandle(ref, () => ({
    toggleMic
  }));
  return (
    <form
      id="letter-form"
      className="letter-box"
      onSubmit={handleSubmit}
    >
      <textarea
        className="letter-textarea"
        placeholder="Type your letter here"
        value={message + interim}
        onChange={(e) => { setMessage(e.target.value); setInterim(""); }}
        required
      />

      <div className="flex items-center justify-start mt-2 gap-3">
        {status && <p className="text-gray-700">{status}</p>}
      </div>
    </form>
  );

}

export default forwardRef(LetterForm);
