import { useEffect, useState } from "react";
import { db, auth } from "../../firebaseClient";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface Letter {
  id: string;
  text: string;
  createdAt: any;
}

export default function Dashboard() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchLetters = async () => {
      const q = query(
        collection(db, "letters"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const lettersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Letter, "id">)
      }));
      setLetters(lettersData);
    };

    fetchLetters();
  }, [user]);

  if (!user) {
    return <p className="p-4">You must be logged in to view the dashboard.</p>;
  }

  return (
    <div className="dashboard-page text-[#8F002D] p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Letters</h1>
      {letters.length === 0 ? (
        <p>You haven’t sent any letters yet.</p>
      ) : (
        <ul className="space-y-2">
          {letters.map(letter => (
            <li key={letter.id} className="p-2 border rounded">
              <p>{letter.text}</p>
              <small className="text-gray-500">
                {letter.createdAt?.toDate ? letter.createdAt.toDate().toLocaleString() : ""}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

