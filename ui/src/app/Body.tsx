"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { UserProvider } from "../context/UserContext";
import Navbar from "../components/Navbar";

export default function Body({ children }: { children: ReactNode }) {
  return (
    <body className="antialiased min-h-screen bg-base-200 text-base-content">
      <ApolloProvider client={client}>
        <UserProvider>
          {/* Navbar is already styled, but wrap in daisyUI navbar container for shadow and padding */}
          <div className="navbar bg-base-100 shadow-lg mb-4">
            <Navbar />
          </div>
          <main className="container mx-auto p-6">
            {children}
          </main>
        </UserProvider>
      </ApolloProvider>
    </body>
  );
}
