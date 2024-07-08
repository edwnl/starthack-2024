"use client";

import BookBackground from "@/components/BookBackground";
import { Button, Typography } from "antd";

const { Title } = Typography;

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LocationInput from "@/components/LocationInput";
import { SearchOutlined } from "@ant-design/icons";

export default function Home() {
  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceChange = (place) => {
    setSelectedPlace(place);
  };

  const handleSearch = () => {
    if (selectedPlace && selectedPlace.geometry) {
      const { lat, lng } = selectedPlace.geometry.location;
      const encodedLocation = encodeURIComponent(
        selectedPlace.formatted_address,
      );
      router.push(
        `/results?lat=${lat()}&lng=${lng()}&location=${encodedLocation}`,
      );
    } else {
      console.error("No valid place selected");
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4">
      <div className="text-center lg:w-1/3 md:w-1/2 flex flex-col justify-center items-center">
        <BookBackground />
        <Title
          style={{ fontSize: "5rem", fontWeight: "200", marginBottom: 0 }}
          level={1}
        >
          Ace Your Studies with{" "}
          <span style={{ fontWeight: "500" }}>Groupzy</span>
        </Title>
        <Title
          style={{
            fontWeight: "200",
            marginTop: "0.5rem",
            marginBottom: "2rem",
          }}
          level={2}
        >
          Track, collaborate, and compete with study groups
          <span style={{ fontWeight: "500" }}> effortlessly</span>.
        </Title>
        <div className="w-full max-w-2xl mx-auto relative">
          <LocationInput
            onPlaceChange={handlePlaceChange}
            placeholder="Where are you?"
            className="pr-20 w-full px-4 py-3 text-base border rounded-xl transition-colors "
          />
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="p-4 mr-1 rounded-xl"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
