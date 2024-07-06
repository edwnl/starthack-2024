'use server'

import admin from '../../../firebase/admin-config'

export async function createGroup(groupData) {
  const db = admin.firestore()
  
  try {
    // Convert the timeRange to Firestore Timestamps
    const startTime = admin.firestore.Timestamp.fromDate(new Date(groupData.timeRange[0]))
    const endTime = admin.firestore.Timestamp.fromDate(new Date(groupData.timeRange[1]))

    // Create a new group document
    const groupRef = await db.collection('groups').add({
      hostUser: groupData.hostUser,
      name: groupData.name,
      location: {
        building: groupData.location.building,
        locationInBuilding: groupData.location.locationInBuilding
      },
      users: [groupData.hostUser],
      startTime: startTime,
      endTime: endTime,
      groupSizeLimit: groupData.groupSizeLimit || null,
      studySubjects: groupData.studySubjects
    })

    return { success: true, groupId: groupRef.id }
  } catch (error) {
    console.error('Error creating group:', error)
    return { success: false, error: error.message }
  }
}