import { ResidentModel } from "@/graphql/models";
import { connectToDatabase } from "@/lib/mongodb";

export const resolvers = {
  Query: {
    residents: async (_: any, { filter }: { filter: any }) => {
      await connectToDatabase();

      const query: any = {};

      // Apply filters if provided
      if (filter) {
        if (filter.firstname) {
          query.firstname = { $regex: filter.firstname, $options: "i" }; // case-insensitive
        }
        if (filter.middlename) {
          query.middlename = { $regex: filter.middlename, $options: "i" }; // case-insensitive
        }
        if (filter.lastname) {
          query.lastname = { $regex: filter.lastname, $options: "i" }; // case-insensitive
        }
      }

      // Return residents based on the filter query
      return ResidentModel.find(query);
    },
  },
  Mutation: {
    addResident: async (_: any, { input }: { input: any }) => {
      await connectToDatabase();

      // If suffix is missing or falsy (undefined, null, ""), set default to empty string
      const cleanedInput = {
        ...input,
        suffix: input.suffix || "", // 👈 default value
      };

      const newResident = new ResidentModel(cleanedInput);
      const savedResident = await newResident.save();

      return {
        message: "Resident added successfully",
        resident: savedResident,
      };
    },

    deleteResident: async (_: any, { id }: { id: string }) => {
      await connectToDatabase();

      await ResidentModel.findByIdAndDelete(id);

      return {
        message: "Resident deleted successfully",
      };
    },
  },
};
