"use client";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure correct import: typically from 'next/router'

export default function AutocompleteSearch({ items }: any) {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");

  const handleOnSearch = (string: string) => {
    setSearchField(string);
  };

  const handleSearchSubmit = () => {
    router.push(
      `/roaringforkvalley/search?category=${encodeURIComponent(
        searchField
      )}`
    );
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: any) => (
    <>
      <span
        style={{
          display: "block",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        {item.name}
      </span>
    </>
  );

  useEffect(() => {
    console.log(searchField);
  }, [searchField]);

  const handleOnSelect = async (item: any) => {
    router.push(
      `/roaringforkvalley/search?category=${item.name}`
    );
  };
  return (
    <form
      className="flex flex-row pt-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit();
      }}
    >
      <div style={{ width: 400 }} className="mr-2">
        <ReactSearchAutocomplete
          inputSearchString={searchField}
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          placeholder="Search for a service"
          styling={{
            backgroundColor: "#f9f7f7",
            borderRadius: "5px",
            zIndex: 10,
          }}
        />
      </div>
      <button
        type="submit"
        className="flex flex-row items-center bg-[#4F772D] px-4 rounded-md text-white"
      >
        Search
      </button>
    </form>
  );
}
