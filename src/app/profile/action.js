'use server'

import admin from '@/firebase/admin-config'

export async function updateProfile(userId, profileData) {
  const db = admin.firestore()
  
  try {
    await db.collection('users').doc(userId).update({
      username: profileData.username,
      status: profileData.status,
      // Add other fields as needed
    })

    return { success: true }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: error.message }
  }
}

export async function getProfile(userId) {
  const db = admin.firestore()
  
  try {
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()

    return { 
      success: true, 
      profile: {
        username: userData.username,
        email: userData.email,
        totalStudyTime: userData.totalStudyTime,
        numGroupsAttended: userData.numGroupsAttended,
        status: userData.status,
        // Add other fields as needed
      }
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return { success: false, error: error.message }
  }
}