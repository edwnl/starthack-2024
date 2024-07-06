"use client";

import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const LargeSearchBar = () => {
  const router = useRouter();

  const handleSearch = () => {
    // Perform any necessary search logic or state updates
    router.push("/results");
  };

  return (
    <div className="flex items-center justify-center py-2 px-4 border rounded-xl w-full">
      <Input
        placeholder="Where are you?"
        variant="borderless"
        className="flex-grow text-lg border-transparent"
      ></Input>
      <Button
        type="primary"
        icon={<SearchOutlined />}
        className="rounded-xl px-3 py-5 text-lg flex items-center"
        onClick={handleSearch}
      >
        Find Groups
      </Button>
    </div>
  );
};

export default LargeSearchBar;