"use client";
import TitlePage from "@/components/titlePage";
import React, { useEffect, useState } from "react";
import { GET_RESIDENTS } from "@/graphql/queries/residents/getResidents";
import { useLazyQuery } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { headers } from "./tableProps";
import { IResidents } from "@/graphql/queries/residents/responseTypes";
import AddResident from "./addResident";
import Loader from "@/components/loader";
import DeleteResident from "./deleteResident";
import { Pencil } from "lucide-react";
import EditResident from "./editResident";
import { ImportExcelModal } from "@/components/importFile";

const Page = () => {
  const [importedData, setImportedData] = useState<any[]>([]);
  // Filter state
  const [filter, setFilter] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });

  // useLazyQuery instead of useQuery
  const [getResidents, { loading, error, data, refetch }] =
    useLazyQuery(GET_RESIDENTS);

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

  const handleReset = () => {
    setFilter({
      firstname: "",
      middlename: "",
      lastname: "",
    });
    getResidents({ variables: { filter: {} } });
  };

  const handleDataImport = (data: any[]) => {
    console.log("Imported data:", data);
    setImportedData(data); // Process or display data as needed
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
          placeholder="Enter First Name"
          className="w-64"
        />
        <Input
          type="text"
          name="middlename"
          value={filter.middlename}
          onChange={handleChange}
          placeholder="Enter Middle Name"
          className="w-64"
        />
        <Input
          type="text"
          name="lastname"
          value={filter.lastname}
          onChange={handleChange}
          placeholder="Enter Last Name"
          className="w-64"
        />
        <Button size="sm" onClick={handleSearch} className="cursor-pointer">
          Search
        </Button>
        <Button size="sm" onClick={handleReset} className="cursor-pointer">
          Reset Filters
        </Button>
        <AddResident refetch={refetch} />
        <ImportExcelModal onDataImport={handleDataImport} />
      </div>

      <div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {headers.map((header: string, index: number) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.residents?.map((residents: IResidents) => (
              <TableRow key={residents.id}>
                <TableCell>{residents.firstname}</TableCell>
                <TableCell>{residents.middlename}</TableCell>
                <TableCell>{residents.lastname}</TableCell>
                <TableCell>{residents.age}</TableCell>
                <TableCell>{residents.birthdate}</TableCell>
                <TableCell>{residents.nationality}</TableCell>
                <TableCell>
                  <DeleteResident id={residents.id} refetch={refetch} />
                  <EditResident refetch={refetch} records={residents} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Status */}
        {loading && <Loader />}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default Page;
