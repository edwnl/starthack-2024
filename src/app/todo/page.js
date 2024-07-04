"use client";

import { useAuth } from "@/contexts/AuthContext";
import TodoList from "@/components/TodoList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function TodoPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <Link href="/">
            <Button icon={<HomeOutlined />}>Back to Home</Button>
          </Link>
        </div>
        {user && <TodoList />}
      </div>
    </ProtectedRoute>
  );
}
