"use server";

import admin from "../../../firebase/admin-config";

export async function sendFriendRequest(userId, friendUsername) {
  const db = admin.firestore();
  try {
    const senderRef = db.collection("user-data").doc(userId);
    const receiverRef = db.collection("user-data").doc(friendUsername);

    // Update the sender's document to add the friend request to sent
    await senderRef.update({
      "friends.pendingRequests.sentRequests":
        admin.firestore.FieldValue.arrayUnion(friendUsername),
    });

    // Update the receiver's document to add the friend request to received
    await receiverRef.update({
      "friends.pendingRequests.receivedRequests":
        admin.firestore.FieldValue.arrayUnion(userId),
    });

    // Must pass through stringify before being returned
    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error sending friend request:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function acceptFriendRequest(userId, friendUsername) {
  const db = admin.firestore();
  try {
    const userRef = db.collection("user-data").doc(userId);
    const friendRef = db.collection("user-data").doc(friendUsername);

    // Update the user's document
    await userRef.update({
      "friends.pendingRequests.receivedRequests":
        admin.firestore.FieldValue.arrayRemove(friendUsername),
      activeFriends: admin.firestore.FieldValue.arrayUnion(friendUsername),
    });

    // Update the friend's document
    await friendRef.update({
      "friends.pendingRequests.sentRequests":
        admin.firestore.FieldValue.arrayRemove(userId),
      activeFriends: admin.firestore.FieldValue.arrayUnion(userId),
    });

    // Must pass through stringify before being returned
    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function declineFriendRequest(userId, friendUsername) {
  const db = admin.firestore();
  try {
    const userRef = db.collection("user-data").doc(userId);
    const friendRef = db.collection("user-data").doc(friendUsername);

    // Update the user's document
    await userRef.update({
      "friends.pendingRequests.receivedRequests":
        admin.firestore.FieldValue.arrayRemove(friendUsername),
    });

    // Update the friend's document
    await friendRef.update({
      "friends.pendingRequests.sentRequests":
        admin.firestore.FieldValue.arrayRemove(userId),
    });

    // Must pass through stringify before being returned
    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function getAllFriends(userId) {
  const db = admin.firestore();
  try {
    const userDoc = await db.collection("user-data").doc(userId).get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const activeFriends = userData.friends.activeFriends || [];

    const uniqueFriendIds = [...new Set(activeFriends)];

    const friends = uniqueFriendIds.map((friendId, index) => ({
      id: friendId,
      name: friendId,
      avatar: `https://randomuser.me/api/portraits/thumb/men/${index % 100}.jpg`, //auto-generated random images
    }));

    return JSON.parse(
      JSON.stringify({ success: true, friends, hasMore: false }),
    );
  } catch (error) {
    console.error("Error getting friends:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function getAllFriendRequests(userId) {
  const db = admin.firestore();
  try {
    const userDoc = await db.collection("user-data").doc(userId).get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const receivedFriendRequests =
      userData.friends.pendingRequests?.receivedRequests || [];

    const friendRequests = receivedFriendRequests.map((requesterId, index) => ({
      id: requesterId,
      name: requesterId,
      avatar: `https://randomuser.me/api/portraits/thumb/women/${index % 100}.jpg`, //auto-generated random images
    }));

    return JSON.parse(
      JSON.stringify({
        success: true,
        friendRequests,
        hasMore: false,
      }),
    );
  } catch (error) {
    console.error("Error getting friend requests:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}
