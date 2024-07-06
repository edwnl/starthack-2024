'use server'

import admin from '../../../firebase/admin-config'

export async function createGroup(groupData) {
  const db = admin.firestore()
  
  try {
    // Create a new group document
    const groupRef = await db.collection('groups').add({
      hostUser: groupData.hostUser,
      name: groupData.name,
      location: {
        building: groupData.building,
        locationInBuilding: groupData.locationInBuilding
      },
      users: [groupData.hostUser],
      startTime: admin.firestore.Timestamp.fromDate(new Date(groupData.startTime)),
      endTime: admin.firestore.Timestamp.fromDate(new Date(groupData.endTime)),
      repeat: groupData.repeat,
      groupSizeLimit: groupData.groupSizeLimit,
      studySubjects: groupData.studySubjects
    })

    return { success: true, groupId: groupRef.id }
  } catch (error) {
    console.error('Error creating group:', error)
    return { success: false, error: error.message }
  }
}