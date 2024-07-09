"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "../app/autocomplete-google.css";

const LocationInput = ({
  onPlaceChange,
  placeholder = "Where are you?",
  className = "",
  children,
}) => {
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      console.log("Google Maps API is available");
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["establishment", "geocode"],
          fields: ["vicinity", "geometry", "name", "formatted_address"],
          componentRestrictions: { country: "au" },
        },
      );
      autocompleteRef.current = autocompleteInstance;

      autocompleteInstance.addListener("place_changed", handlePlaceSelect);
    } else {
      console.error("Google Maps API is not available");
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current,
        );
      }
    };
  }, []);

  const handlePlaceSelect = useCallback(() => {
    console.log("Place selected");
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        console.log("Selected place:", place);
        onPlaceChange(place);
        console.log(place);
        if (place.name) {
          setInputValue(place.name);
        } else if (place.geometry) {
          setInputValue(place.formatted_address);
        }
      } else {
        console.log("Place selected is null.");
      }
    } else {
      console.error("Autocomplete is not initialized");
    }
  }, [onPlaceChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={className}
      />
      {children}
    </div>
  );
};

export default LocationInput;
