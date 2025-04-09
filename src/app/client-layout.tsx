"use client";

import { ApolloClient, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import client from "@/lib/apolloClient";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
}
