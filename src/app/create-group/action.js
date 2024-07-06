'use server'

import admin from '../../../firebase/admin-config'

export async function createGroup(groupData) {
  const db = admin.firestore()
  
  try {
    // Create a new group document
    const groupRef = await db.collection('groups').add({
      name: groupData.name,
      subject: groupData.subject,
      location: groupData.location,
      users: { [groupData.creatorId]: true },
      startTime: groupData.startTime,
      endTime: groupData.endTime,
      repeat: groupData.repeat,
      groupSizeLimit: groupData.groupSizeLimit,
      studySubjects: groupData.studySubjects
    })

    // Update the location document to include the new group
    await db.collection('locations').doc(groupData.location).update({
      groups: { [groupRef.id]: true }
    })

    // Update the creator's user document to include the new group
    await db.collection('users').doc(groupData.creatorId).update({
      groups: { [groupRef.id]: true }
    })

    return { success: true, groupId: groupRef.id }
  } catch (error) {
    console.error('Error creating group:', error)
    return { success: false, error: error.message }
  }
}