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

      const newResident = new ResidentModel(input);
      const savedResident = await newResident.save();

      return {
        message: "Resident added successfully",
        resident: savedResident,
      };
    },
  },
};
