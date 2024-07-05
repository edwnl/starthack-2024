'use server'

import admin from '../../../firebase/admin-config'

export async function getFriendsLeaderboard(userId) {
  const db = admin.firestore()
  
  try {
    const userDoc = await db.collection('users').doc(userId).get()
    const leaderboardId = userDoc.data().friendsLeaderboardId

    const leaderboardDoc = await db.collection('friendsLeaderboards').doc(leaderboardId).get()
    const leaderboardData = leaderboardDoc.data()

    // Sort the leaderboard data by total study time
    const sortedLeaderboard = Object.entries(leaderboardData)
      .sort(([, a], [, b]) => b.totalStudyTime - a.totalStudyTime)
      .map(([userId, data]) => ({ userId, ...data }))

    return { success: true, leaderboard: sortedLeaderboard }
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return { success: false, error: error.message }
  }
}