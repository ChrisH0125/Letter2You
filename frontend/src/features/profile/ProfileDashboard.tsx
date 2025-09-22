import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseClient'
import type { User } from 'firebase/auth'

interface Letter {
    id: string
    text: string
    createdAt: any
    scheduledAt: number
    to?: string
}

interface ProfileDashboardProps {
    user: User
    onNavigateHome: () => void
}

export default function ProfileDashboard({ user, onNavigateHome }: ProfileDashboardProps) {
    const [letters, setLetters] = useState<Letter[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return

        const lettersRef = collection(db, 'letters')
        const q = query(
            lettersRef,
            where('uid', '==', user.uid),
            orderBy('createdAt', 'desc')
        )

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const lettersData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Letter[]
                setLetters(lettersData)
                setLoading(false)
                setError(null)
            },
            (err) => {
                console.error('Error fetching letters:', err)
                setError('Failed to load letters')
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [user])

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Unknown date'

        let date
        if (timestamp.toDate) {
            // Firestore timestamp
            date = timestamp.toDate()
        } else if (typeof timestamp === 'number') {
            // Unix timestamp
            date = new Date(timestamp)
        } else {
            date = new Date(timestamp)
        }

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getScheduledStatus = (scheduledAt: number) => {
        const now = Date.now()
        if (scheduledAt <= now) {
            return { status: 'sent', color: 'text-green-600' }
        } else {
            const scheduledDate = new Date(scheduledAt)
            return {
                status: `scheduled for ${scheduledDate.toLocaleDateString()}`,
                color: 'text-blue-600'
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8F002D] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your letters...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️</div>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-[#8F002D] text-white rounded-lg hover:bg-[#7a0026] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Your Letters</h1>
                        <button
                            onClick={onNavigateHome}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                    <p className="text-gray-600">
                        Welcome back, {user.email}! Here are all the letters you've written.
                    </p>
                </div>

                {/* Letters List */}
                {letters.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No letters yet</h3>
                        <p className="text-gray-500 mb-6">
                            You haven't written any letters yet. Start writing your first letter!
                        </p>
                        <button
                            onClick={onNavigateHome}
                            className="px-6 py-3 bg-[#8F002D] text-white rounded-lg hover:bg-[#7a0026] transition-colors"
                        >
                            Write Your First Letter
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {letters.length} letter{letters.length !== 1 ? 's' : ''} total
                            </h2>
                        </div>

                        <div className="grid gap-6">
                            {letters.map((letter) => {
                                const scheduledInfo = getScheduledStatus(letter.scheduledAt)
                                return (
                                    <div
                                        key={letter.id}
                                        className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    Letter #{letter.id.slice(-8)}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Created: {formatDate(letter.createdAt)}
                                                </p>
                                            </div>
                                            <span className={`text-sm font-medium ${scheduledInfo.color}`}>
                                                {scheduledInfo.status}
                                            </span>
                                        </div>

                                        <div className="prose max-w-none">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {letter.text}
                                            </p>
                                        </div>

                                        {letter.to && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-medium">To:</span> {letter.to}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
