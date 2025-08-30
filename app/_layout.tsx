import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LanguageProvider } from "@/src/context/LanguageProvider";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="dark" translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}
