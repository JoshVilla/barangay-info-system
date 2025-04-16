import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useMutation } from "@apollo/client";
import { ADD_RESIDENT } from "@/graphql/mutations/residents/addResidents";
import { toast } from "sonner";

const residentSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  middlename: z.string().min(1, "Middle name is required"),
  lastname: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
  age: z.coerce
    .number()
    .min(0, "Age must be at least 0")
    .int("Age must be a whole number"),
  birthdate: z.string().min(1, "Birthdate is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  civilStatus: z.string().min(1, "Civil Status is required"),
  religion: z.string().min(1, "Religion is required"),
  contactNumber: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  spouseName: z.string().optional(),
  numberOfChildren: z.coerce.number().optional(),
});

type ResidentForm = z.infer<typeof residentSchema>;

interface Props {
  refetch: () => void;
}

const AddResident = ({ refetch }: Props) => {
  const [addResident, { loading, error }] = useMutation(ADD_RESIDENT);
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<ResidentForm>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      age: 0,
      birthdate: "",
      suffix: "",
      nationality: "Filipino",
      gender: "",
      civilStatus: "",
      religion: "",
      contactNumber: "",
      email: "",
      fatherName: "",
      motherName: "",
      spouseName: "",
      numberOfChildren: 0,
    },
  });

  const onSubmit = async (values: ResidentForm) => {
    try {
      const { data } = await addResident({
        variables: {
          input: values,
        },
      });
      form.reset();
      setOpenDialog(false);
      refetch();
      toast(data.addResident.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) toast(error.message);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Add Resident
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "90vw" }}
      >
        <DialogHeader>
          <DialogTitle>New Resident</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col lg:flex-row">
              {/* Personal Details */}
              <div className="space-y-4 py-4 flex-1">
                <div className="text-gray-500 text-sm">Personal Details</div>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middlename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suffix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suffix (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Jr., Sr., III, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthdate</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="Filipino" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="civilStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Civil Status</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 py-4 flex-1">
                <div className="text-gray-500 text-sm">Contact Information</div>
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="09xxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Famil Composition */}
              <div className="space-y-4 py-4 flex-1">
                <div className="text-gray-500 text-sm">Family Composition</div>
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Father (Full Name)</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name of Mother (Full Name, Maiden Name)
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spouseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Spouse (if there is)</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfChildren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" size="sm">
                {loading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddResident;
