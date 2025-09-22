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
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchLetters = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "letters"),
          where("uid", "==", user.uid),
        );
        const snapshot = await getDocs(q);
        const lettersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Letter, "id">)
        }));
        setLetters(lettersData);
      } catch (err) {
        console.error("Error fetching letters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [user]);

  if (!user) {
    return <p className="p-4 text-red-600">You must be logged in to view the dashboard.</p>;
  }

  return (
    <div className="dashboard-page text-[#8F002D] p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Letters</h1>

      {loading ? (
        <p>Loading your letters...</p>
      ) : letters.length === 0 ? (
        <p>You haven’t sent any letters yet.</p>
      ) : (
        <ul className="space-y-4">
          {letters.map(letter => (
            <li key={letter.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-gray-800">{letter.text}</p>
              <small className="text-gray-500 mt-1 block">
                Sent: {letter.createdAt?.toDate ? letter.createdAt.toDate().toLocaleString() : "Unknown"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
