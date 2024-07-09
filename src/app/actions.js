"use server";

import { db } from "../../firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function createUserData(uid, username = null) {
  if (!uid) {
    console.log(
      "[createUserData] Unable to create new user data, user is null.",
    );
    return JSON.parse(
      JSON.stringify({ success: false, error: "User is null" }),
    );
  }
  console.log(
    "[createUserData] Starting createUserData function for user:",
    uid,
  );

  try {
    const userDataCollection = collection(db, "user-data");
    const userRef = doc(userDataCollection, uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log(
        "[createUserData] User document does not exist, new user detected",
      );

      if (username === null) {
        // This is a new user, but we don't have a username yet
        console.log("[createUserData] Returning isNewUser: true");
        return JSON.parse(JSON.stringify({ success: true, isNewUser: true }));
      }

      // Check if the username is unique
      const usernameQuery = query(
        userDataCollection,
        where("username", "==", username),
      );
      const usernameQuerySnapshot = await getDocs(usernameQuery);

      if (!usernameQuerySnapshot.empty) {
        return JSON.parse(
          JSON.stringify({ success: false, error: "Username already exists" }),
        );
      }

      const newUserData = {
        username: username ? username : `user_${uid.slice(0, 8)}`,
        activeSessionId: null,
        friends: {
          activeFriends: [],
          pendingRequests: {
            sentRequests: [],
            receivedRequests: [],
          },
        },
        stats: {
          lifetime: {
            totalSeconds: 0,
            totalSessions: 0,
            totalStreak: 0,
          },
          weekly: {
            lastWiped: new Date().toISOString(),
            totalSeconds: 0,
            totalSessions: 0,
            totalStreak: 0,
          },
          monthly: {
            lastWiped: new Date().toISOString(),
            totalSeconds: 0,
            totalSessions: 0,
            totalStreak: 0,
          },
          yearly: {
            lastWiped: new Date().toISOString(),
            totalSeconds: 0,
            totalSessions: 0,
            totalStreak: 0,
          },
        },
      };

      await setDoc(userRef, newUserData);
      console.log(
        "[createUserData] Successfully set new user document in Firestore",
      );
      return JSON.parse(JSON.stringify({ success: true, isNewUser: false }));
    } else {
      console.log(
        "[createUserData] User document already exists, existing user",
      );
      return JSON.parse(JSON.stringify({ success: true, isNewUser: false }));
    }
  } catch (error) {
    console.error(
      "[createUserData] Unexpected error in createUserData function:",
      error,
    );
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function fetchUserProfile(userId) {
  try {
    const userDocRef = doc(db, "user-data", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return {
        username: userData.username,
        stats: userData.stats || {
          totalTime: 0,
          avgTime: 0,
          groupsAttended: 0,
          longestStreak: 0,
        },
      };
    } else {
      console.error("[fetchUserProfile] User document does not exist");
      return null;
    }
  } catch (error) {
    console.error("[fetchUserProfile] Error fetching user profile:", error);
    throw error;
  }
}

export async function fetchUserData(userId) {
  try {
    const userDocRef = doc(db, "user-data", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      console.error("[fetchUserData] User document does not exist");
      return null;
    }
  } catch (error) {
    console.error("[fetchUserData] Error fetching user data:", error);
    throw error;
  }
}
