"use client";

import { useState, useEffect } from "react";
import { Input, Button, List } from "antd";
import { addTodo, removeTodo, getTodos } from "@/app/actions";
import { useAuth } from "@/contexts/AuthContext";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const result = await getTodos(user.uid);
        if (result.success) {
          setTodos(result.todos);
        }
      }
    };
    fetchTodos();
  }, [user]);

  const handleAddTodo = async () => {
    if (newTodo.trim() && user) {
      const result = await addTodo(user.uid, newTodo);
      if (result.success) {
        setTodos([{ id: result.id, text: newTodo }, ...todos]);
        setNewTodo("");
      }
    }
  };

  const handleRemoveTodo = async (id) => {
    if (user) {
      const result = await removeTodo(user.uid, id);
      if (result.success) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onPressEnter={handleAddTodo}
          placeholder="Add a new todo"
          className="mr-2"
        />
        <Button onClick={handleAddTodo} type="primary">
          Add
        </Button>
      </div>
      <List
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                key="delete"
                onClick={() => handleRemoveTodo(todo.id)}
                danger
              >
                Delete
              </Button>,
            ]}
          >
            {todo.text}
          </List.Item>
        )}
      />
    </div>
  );
}
