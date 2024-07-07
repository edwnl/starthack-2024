// app/loading.js
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex-grow flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
