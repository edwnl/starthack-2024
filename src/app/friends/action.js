'use server'

import admin from '../../../firebase/admin-config'

export async function addFriend(userId, friendId) {
  const db = admin.firestore()
  
  try {
    // Add friend to user's friends list
    await db.collection('users').doc(userId).update({
      [`friends.${friendId}`]: true
    })

    // Add user to friend's friends list
    await db.collection('users').doc(friendId).update({
      [`friends.${userId}`]: true
    })

    return { success: true }
  } catch (error) {
    console.error('Error adding friend:', error)
    return { success: false, error: error.message }
  }
}

export async function removeFriend(userId, friendId) {
  const db = admin.firestore()
  
  try {
    // Remove friend from user's friends list
    await db.collection('users').doc(userId).update({
      [`friends.${friendId}`]: admin.firestore.FieldValue.delete()
    })

    // Remove user from friend's friends list
    await db.collection('users').doc(friendId).update({
      [`friends.${userId}`]: admin.firestore.FieldValue.delete()
    })

    return { success: true }
  } catch (error) {
    console.error('Error removing friend:', error)
    return { success: false, error: error.message }
  }
}