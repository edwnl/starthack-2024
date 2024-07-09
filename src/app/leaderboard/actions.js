"use server";

import admin from "../../../firebase/admin-config";

const calculateRank = (users) => {
  return users
    .sort((a, b) => b.totalSeconds - a.totalSeconds)
    .map((user, index) => ({ ...user, rank: index + 1 }));
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export async function getLeaderboardData(timeFrame) {
  const db = admin.firestore();
  const usersRef = db.collection("user-data");

  try {
    const snapshot = await usersRef.get();
    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      const stats = data.stats[timeFrame];
      return {
        key: doc.id,
        username: data.username,
        totalStudyTime: formatTime(stats.totalSeconds),
        studyGroupsAttended: stats.totalSessions,
        longestStudySession: formatTime(stats.totalStreak),
        totalSeconds: stats.totalSeconds, // for sorting
      };
    });

    const rankedUsers = calculateRank(users);

    return JSON.parse(
      JSON.stringify({
        success: true,
        data: rankedUsers,
        lastUpdated: new Date().toISOString(),
      }),
    );
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return JSON.parse(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
    );
  }
}
