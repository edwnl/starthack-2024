"use server";

import admin from "../../firebase/admin-config";
import { db } from "../../firebase/config";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

export async function createUserData(uid) {
  if (!uid) {
    console.log(
      "[createUserData] Unable to create new user data, user is null.",
    );
    return;
  }
  console.log(
    "[createUserData] Starting createUserData function for user:",
    uid,
  );

  try {
    // Reference to the "user-data" collection
    const userDataCollection = collection(db, "user-data");

    // Check if user exists in Firestore
    const userRef = doc(userDataCollection, uid);

    let userSnap;
    try {
      userSnap = await getDoc(userRef);
      console.log(
        "[createUserData] Successfully fetched user document snapshot",
      );
    } catch (error) {
      console.error("[createUserData] Error fetching user document:", error);
      throw error;
    }

    if (!userSnap.exists()) {
      console.log(
        "[createUserData] User document does not exist, creating new user data",
      );

      // Create new user data
      const newUserData = {
        username: `user_${uid.slice(0, 8)}`,
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

      try {
        await setDoc(userRef, newUserData);
        console.log(
          "[createUserData] Successfully set new user document in Firestore",
        );
      } catch (error) {
        console.error(
          "[createUserData] Error setting new user document:",
          error,
        );
        throw error;
      }
    } else {
      console.log(
        "[createUserData] User document already exists, no action taken",
      );
    }

    console.log(
      "[createUserData] createUserData function completed successfully",
    );
  } catch (error) {
    console.error(
      "[createUserData] Unexpected error in createUserData function:",
      error,
    );
    throw error;
  }
}

export async function addTodo(userId, text) {
  const db = admin.firestore();
  try {
    const docRef = await db
      .collection("todo-test")
      .doc(userId)
      .collection("todos")
      .add({
        text,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    // must pass through stringify before being returned
    return JSON.parse(JSON.stringify({ success: true, id: docRef.id }));
  } catch (error) {
    console.error("Error adding todo:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function removeTodo(userId, todoId) {
  const db = admin.firestore();
  try {
    await db
      .collection("todo-test")
      .doc(userId)
      .collection("todos")
      .doc(todoId)
      .delete();
    // must pass through stringify before being returned
    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error removing todo:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function getTodos(userId) {
  const db = admin.firestore();
  try {
    const snapshot = await db
      .collection("todo-test")
      .doc(userId)
      .collection("todos")
      .orderBy("createdAt", "desc")
      .get();
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // must pass through stringify before being returned
    return JSON.parse(JSON.stringify({ success: true, todos }));
  } catch (error) {
    console.error("Error getting todos:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}
