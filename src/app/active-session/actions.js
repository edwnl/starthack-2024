"use server";

import { db } from "../../../firebase/config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { fetchUserData } from "@/app/actions";

export async function checkActiveSession(userId) {
  try {
    const userDocRef = doc(db, "user-data", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return !!userData.activeSessionId;
    }
    return false;
  } catch (error) {
    console.error("[checkActiveSession] Error checking active session:", error);
    throw error;
  }
}

export async function joinGroup(userId, groupId) {
  try {
    if (!userId) {
      console.error("[joinGroup] userId is undefined or null");
      throw new Error("User ID is required to join a group");
    }
    if (!groupId) {
      console.error("[joinGroup] groupId is undefined or null");
      throw new Error("Group ID is required to join a group");
    }

    // Fetch user data to get the username
    const userData = await fetchUserData(userId);
    if (!userData || !userData.username) {
      console.error("[joinGroup] Unable to fetch username for user", userId);
      throw new Error("Unable to fetch user data");
    }

    const username = userData.username;

    console.log(
      `[joinGroup] Attempting to join group. UserId: ${userId}, GroupId: ${groupId}, Username: ${username}`,
    );

    const userDocRef = doc(db, "user-data", userId);
    const groupDocRef = doc(db, "groups-data", groupId);

    // Add the session to the user's data
    await setDoc(userDocRef, { activeSessionId: groupId }, { merge: true });

    // Add the user to the group's participants with both ID and username
    await updateDoc(groupDocRef, {
      participants: arrayUnion({ id: userId, username: username }),
    });

    console.log(
      `[joinGroup] Successfully joined group. UserId: ${userId}, GroupId: ${groupId}`,
    );
    return username; // Return the username for use in the UI if needed
  } catch (error) {
    console.error("[joinGroup] Error joining group:", error);
    throw error;
  }
}

export async function fetchGroups(lat, lng, ignoreLocation) {
  try {
    let groupsQuery;

    if (ignoreLocation) {
      groupsQuery = query(collection(db, "groups-data"));
    } else {
      // Implement geolocation query logic here
      // This is a placeholder and needs to be replaced with actual geolocation query
      groupsQuery = query(
        collection(db, "groups-data"),
        where("location.lat", ">=", lat - 0.045),
        where("location.lat", "<=", lat + 0.045),
      );
    }

    const querySnapshot = await getDocs(groupsQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("[fetchGroups] Error fetching groups:", error);
    throw error;
  }
}

export async function getActiveSession(userId) {
  try {
    const userDocRef = doc(db, "user-data", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.activeSessionId) {
        const sessionDocRef = doc(db, "groups-data", userData.activeSessionId);
        const sessionDocSnap = await getDoc(sessionDocRef);
        if (sessionDocSnap.exists()) {
          return { id: sessionDocSnap.id, ...sessionDocSnap.data() };
        }
      }
    }
    return null;
  } catch (error) {
    console.error("[getActiveSession] Error fetching active session:", error);
    throw error;
  }
}

export async function leaveSession(userId, sessionId) {
  try {
    const userDocRef = doc(db, "user-data", userId);
    const sessionDocRef = doc(db, "groups-data", sessionId);

    // Remove the active session from the user's data
    await updateDoc(userDocRef, {
      activeSessionId: null,
    });

    // Get the current participants
    const sessionDoc = await getDoc(sessionDocRef);
    const participants = sessionDoc.data().participants;

    // Remove the user from the session's participants
    const updatedParticipants = participants.filter((p) => p.id !== userId);
    await updateDoc(sessionDocRef, {
      participants: updatedParticipants,
    });
  } catch (error) {
    console.error("[leaveSession] Error leaving session:", error);
    throw error;
  }
}
