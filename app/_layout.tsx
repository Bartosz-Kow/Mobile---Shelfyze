import { AuthProvider } from "@/src/context/AuthProvider";
import { LanguageProvider } from "@/src/context/LanguageProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
export default function RootLayout() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <StatusBar style="dark" translucent />
        <Stack screenOptions={{ headerShown: false }} />
      </LanguageProvider>
    </AuthProvider>
  );
}
