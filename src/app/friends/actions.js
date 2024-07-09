"use server";

import admin from "../../../firebase/admin-config";

async function getUserIdByUsername(username) {
  const db = admin.firestore();
  const usersSnapshot = await db
    .collection("user-data")
    .where("username", "==", username)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    throw new Error("User not found");
  }

  return usersSnapshot.docs[0].id;
}

export async function sendFriendRequest(senderId, receiverUsername) {
  const db = admin.firestore();
  try {
    const receiverId = await getUserIdByUsername(receiverUsername);

    const senderRef = db.collection("user-data").doc(senderId);
    const receiverRef = db.collection("user-data").doc(receiverId);

    await senderRef.update({
      "friends.pendingRequests.sentRequests":
        admin.firestore.FieldValue.arrayUnion(receiverId),
    });

    await receiverRef.update({
      "friends.pendingRequests.receivedRequests":
        admin.firestore.FieldValue.arrayUnion(senderId),
    });

    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error sending friend request:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function acceptFriendRequest(userId, friendId) {
  const db = admin.firestore();
  try {
    const userRef = db.collection("user-data").doc(userId);
    const friendRef = db.collection("user-data").doc(friendId);

    await userRef.update({
      "friends.pendingRequests.receivedRequests":
        admin.firestore.FieldValue.arrayRemove(friendId),
      activeFriends: admin.firestore.FieldValue.arrayUnion(friendId),
    });

    await friendRef.update({
      "friends.pendingRequests.sentRequests":
        admin.firestore.FieldValue.arrayRemove(userId),
      activeFriends: admin.firestore.FieldValue.arrayUnion(userId),
    });

    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}

export async function declineFriendRequest(userId, friendId) {
  const db = admin.firestore();
  try {
    const userRef = db.collection("user-data").doc(userId);
    const friendRef = db.collection("user-data").doc(friendId);

    await userRef.update({
      "friends.pendingRequests.receivedRequests":
        admin.firestore.FieldValue.arrayRemove(friendId),
    });

    await friendRef.update({
      "friends.pendingRequests.sentRequests":
        admin.firestore.FieldValue.arrayRemove(userId),
    });

    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error declining friend request:", error);
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

    const friendsData = await Promise.all(
      activeFriends.map(async (friendId) => {
        const friendDoc = await db.collection("user-data").doc(friendId).get();
        const friendData = friendDoc.data();
        return {
          id: friendId,
          name: friendData.username,
        };
      }),
    );

    return JSON.parse(
      JSON.stringify({ success: true, friends: friendsData, hasMore: false }),
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

    const friendRequestsData = await Promise.all(
      receivedFriendRequests.map(async (requesterId) => {
        const requesterDoc = await db
          .collection("user-data")
          .doc(requesterId)
          .get();
        const requesterData = requesterDoc.data();
        return {
          id: requesterId,
          name: requesterData.username,
        };
      }),
    );

    return JSON.parse(
      JSON.stringify({
        success: true,
        friendRequests: friendRequestsData,
        hasMore: false,
      }),
    );
  } catch (error) {
    console.error("Error getting friend requests:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}
