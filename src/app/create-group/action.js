"use server";

import admin from "../../../firebase/admin-config";

export async function createGroup(serializedData) {
  const db = admin.firestore();
  const groupData = JSON.parse(serializedData);

  try {
    // Prepare the data to be stored
    const dataToStore = {
      name: groupData.name,
      description: groupData.description,
      hostUser: groupData.hostUser,
      startTime: groupData.startTime,
      endTime: groupData.endTime,
      groupSizeLimit: groupData.groupSizeLimit,
      studySubjects: groupData.studySubjects,
      location: {
        building: groupData.location.building,
        locationInBuilding: groupData.location.locationInBuilding,
        placeDetails: {
          name: groupData.location.placeDetails.name,
          formatted_address: groupData.location.placeDetails.formatted_address,
          vicinity: groupData.location.placeDetails.vicinity,
          geometry: {
            lat: groupData.location.placeDetails.geometry.location.lat,
            lng: groupData.location.placeDetails.geometry.location.lng,
          },
        },
      },
      createdAt: new Date().toISOString(),
      currentUsers: [],
    };

    await db.collection("groups-data").add(dataToStore);
    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error creating group:", error);
    return JSON.parse(JSON.stringify({ success: false, error: error.message }));
  }
}
