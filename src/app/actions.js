"use server";

import admin from "../../firebase/admin-config";

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
