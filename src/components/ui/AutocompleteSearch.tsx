"use client";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import React from "react";

export default function AutocompleteSearch({
  items,
  handleOnSearch,
  handleOnSelect,
}: any) {
  const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: any) => {
    return (
      <>
        <span
          style={{ display: "block", textAlign: "left" }}
        >
          {item.name}
        </span>
      </>
    );
  };
  return (
    <div id="name" style={{ width: 400 }} className="mr-2">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        placeholder="Search for a service"
        styling={{
          backgroundColor: "#F1F1F1",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}
