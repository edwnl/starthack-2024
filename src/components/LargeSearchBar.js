import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const LargeSearchBar = () => {
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
      >
        Find Groups
      </Button>
    </div>
  );
};

export default LargeSearchBar;
