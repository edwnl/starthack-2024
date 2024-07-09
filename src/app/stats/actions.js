"use server";

import admin from "../../../firebase/admin-config";

export async function fetchUserStats(userId) {
  const db = admin.firestore();

  try {
    const userDoc = await db.collection("user-data").doc(userId).get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const stats = userData.stats;

    // Convert seconds to hours and minutes
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} hours, ${minutes} minutes`;
    };

    // Calculate average time
    const calculateAvg = (totalSeconds, totalSessions) => {
      if (totalSessions === 0) return "0 minutes";
      const avgSeconds = totalSeconds / totalSessions;
      return formatTime(avgSeconds);
    };

    return JSON.stringify({
      weekly: {
        period: "Weekly",
        totalTime: formatTime(stats.weekly.totalSeconds),
        avgTime: calculateAvg(
          stats.weekly.totalSeconds,
          stats.weekly.totalSessions,
        ),
        groupsAttended: stats.weekly.totalSessions,
        trackingFrom: stats.weekly.lastWiped,
        longestStreak: stats.weekly.totalStreak,
      },
      monthly: {
        period: "Monthly",
        totalTime: formatTime(stats.monthly.totalSeconds),
        avgTime: calculateAvg(
          stats.monthly.totalSeconds,
          stats.monthly.totalSessions,
        ),
        groupsAttended: stats.monthly.totalSessions,
        trackingFrom: stats.monthly.lastWiped,
        longestStreak: stats.monthly.totalStreak,
      },
      yearly: {
        period: "Yearly",
        totalTime: formatTime(stats.yearly.totalSeconds),
        avgTime: calculateAvg(
          stats.yearly.totalSeconds,
          stats.yearly.totalSessions,
        ),
        groupsAttended: stats.yearly.totalSessions,
        trackingFrom: stats.yearly.lastWiped,
        longestStreak: stats.yearly.totalStreak,
      },
      lifetime: {
        period: "Lifetime",
        totalTime: formatTime(stats.lifetime.totalSeconds),
        avgTime: calculateAvg(
          stats.lifetime.totalSeconds,
          stats.lifetime.totalSessions,
        ),
        groupsAttended: stats.lifetime.totalSessions,
        trackingFrom: userData.createdAt,
        longestStreak: stats.lifetime.totalStreak,
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
}
