// components/ImportExcelModal.tsx
// ... (imports remain the same)
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface ImportExcelModalProps {
  onDataImport: (data: Record<string, any>) => void;
}

export function ImportExcelModal({ onDataImport }: ImportExcelModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rawJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const keyValueData: Record<string, any>[] = [];

      // Assuming each record is 13 fields long (as per provided structure)
      const fieldNames = [
        "firstname",
        "middlename",
        "lastname",
        "suffix",
        "age",
        "birthdate",
        "gender",
        "civilStatus",
        "nationality",
        "religion",
        "contactNumber",
        "email",
        "fatherName",
        "motherName",
        "spouseName",
        "numberOfChildren",
      ];

      for (let i = 0; i < rawJson.length; i += 2) {
        // increment by 2 assuming two records per people block
        const obj: Record<string, any> = {};
        for (let j = 0; j < fieldNames.length; j++) {
          if (rawJson[i + j]) {
            obj[fieldNames[j]] = rawJson[i + j][1]; // Adjust depending on how your data is structured
          }
        }
        keyValueData.push(obj);
      }

      console.log("Key-Value JSON:", keyValueData);
      onDataImport(keyValueData);
      setOpenDialog(false);
    };

    reader.readAsBinaryString(file);
  };

  // Drag and Drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setFile(acceptedFiles[0]);
        console.log("File selected:", acceptedFiles[0].name); // Log selected file
      }
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Import Excel
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[425px] lg:w-[80%] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Excel File</DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className="border-2 border-dashed p-4 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {file ? (
            <p>Selected file: {file.name}</p>
          ) : (
            <p>Drag & Drop an Excel file here or click to select one</p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFileUpload}
            disabled={!file}
            className="mt-4 w-full"
          >
            Upload and Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
