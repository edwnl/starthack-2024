// app/actions/groupActions.js
"use server";

import { db } from "../../../firebase/config";

import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export async function fetchGroups(lat, lng, ignoreLocation = false) {
  const now = new Date();

  try {
    const groupsRef = collection(db, "groups-data");
    const q = query(groupsRef, where("endTime", ">", now.toISOString()));

    const querySnapshot = await getDocs(q);

    let groups = [];
    querySnapshot.forEach((doc) => {
      const group = { id: doc.id, ...doc.data() };
      if (
        ignoreLocation ||
        calculateDistance(
          lat,
          lng,
          group.location.placeDetails.geometry.lat,
          group.location.placeDetails.geometry.lng,
        ) <= 5
      ) {
        groups.push(group);
      }
    });

    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}
