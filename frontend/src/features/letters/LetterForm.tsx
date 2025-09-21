import { useState } from "react";
import { db } from "../../firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// imports from function from firebase 

export default function LetterForm() {
  const [message, setMessage] = useState("");        // track textarea input
  const [status, setStatus] = useState<string | null>(null); // show success/error

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
      className="p-4 w-[26vw] h-[40vh] border rounded bg-[#2B1917]" 
      onSubmit={handleSubmit}  // form submission triggers Firestore save
    >
      <textarea
        className="border-2 border-dotted border-gray-400 p-4 w-full h-full resize-none bg-transparent text-white placeholder-gray-300"
        placeholder="Write something sentimental :)"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // update state as user types
        required
      />
      <button 
        type="submit" 
        className="mt-2 px-3 py-2 bg-pink-500 text-white rounded"
      >
        Send Letter
      </button>
      {status && <p className="mt-1 text-white">{status}</p>}
    </form>
  );
}
