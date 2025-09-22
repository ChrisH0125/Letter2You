import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { db, auth } from "../../firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function LetterForm(_props: any, ref: any) {
  const [message, setMessage] = useState("");
  const [interim, setInterim] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be signed in to send a letter.");
      return;
    }

    try {
      await addDoc(collection(db, "letters"), {
        uid: user.uid,
        email: user.email,
        text: message,
        createdAt: serverTimestamp(),
        scheduledAt: Date.now() + 3 * 60 * 1000,
      });
      setMessage("");
      
      // show sent pop-up
      setStatus("Letter sent!");
      setTimeout(() => setStatus(null), 2000); // disappears after 2s
    } catch (err: any) {
      console.error(err);
      setStatus("Error saving letter: " + err.message);
      setTimeout(() => setStatus(null), 3000); // disappears after 3s
    }
  };

  function toggleMic() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setListening(false);
      setInterim("");
      return;
    }

    try {
      const recog = new SpeechRecognition();
      recognitionRef.current = recog;
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = navigator.language || "en-US";

      recog.onstart = () => setListening(true);
      recog.onend = () => {
        setListening(false);
        setInterim("");
      };
      recog.onerror = (ev: any) => {
        console.error("Speech recognition error", ev);
        setStatus("Speech recognition error: " + (ev.error || "unknown"));
        setListening(false);
      };

      recog.onresult = (ev: any) => {
        let interimTrans = "";
        let finalTrans = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const res = ev.results[i];
          const t = res[0].transcript;
          if (res.isFinal) finalTrans += t;
          else interimTrans += t;
        }
        if (finalTrans) setMessage((m) => m + finalTrans);
        setInterim(interimTrans);
      };

      recog.start();
    } catch (err) {
      console.error(err);
      alert("Could not start speech recognition");
    }
  }

  useImperativeHandle(ref, () => ({
    toggleMic,
    getCurrentMessage: () => message,
  }));

  return (
    <>
      <form id="letter-form" className="letter-box" onSubmit={handleSubmit}>
        <textarea
          className="letter-textarea"
          placeholder="Type your letter here"
          value={message + interim}
          onChange={(e) => {
            setMessage(e.target.value);
            setInterim("");
          }}
          required
        />
      </form>

      {status && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8F002D] text-white px-6 py-3 rounded shadow-lg opacity-90 z-50 animate-bounce transition-opacity duration-500"
        >
          {status}
        </div>
      )}
    </>
  );
}

export default forwardRef(LetterForm);
