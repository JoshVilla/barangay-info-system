"use client";
import TitlePage from "@/components/titlePage";
import React, { useEffect, useState } from "react";
import { GET_RESIDENTS } from "@/graphql/queries/residents/getResidents";
import { useLazyQuery } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  // Filter state
  const [filter, setFilter] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });

  // useLazyQuery instead of useQuery
  const [getResidents, { loading, error, data }] = useLazyQuery(GET_RESIDENTS);

  // Update filter state on input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Trigger the query on search button click
  const handleSearch = () => {
    getResidents({ variables: { filter } });
  };

  // Reset the filter and clear the results
  const handleReset = () => {
    setFilter({
      firstname: "",
      middlename: "",
      lastname: "",
    });
    // Optionally: Refetch with empty filter or not refetch at all
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <TitlePage title="Residents" />

      {/* Filter inputs */}
      <div className="flex gap-2 my-4 items-center flex-wrap">
        <Input
          type="text"
          name="firstname"
          value={filter.firstname}
          onChange={handleChange}
          placeholder="Filter by First Name"
          className="w-64"
        />
        <Input
          type="text"
          name="middlename"
          value={filter.middlename}
          onChange={handleChange}
          placeholder="Filter by Middle Name"
          className="w-64"
        />
        <Input
          type="text"
          name="lastname"
          value={filter.lastname}
          onChange={handleChange}
          placeholder="Filter by Last Name"
          className="w-64"
        />
        <Button size="sm" onClick={handleSearch}>
          Search
        </Button>
        <Button size="sm" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>

      {/* Status */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Display results */}
      <ul>
        {data?.residents?.map((resident: any) => (
          <li key={resident.id}>
            {resident.firstname} {resident.middlename} {resident.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
