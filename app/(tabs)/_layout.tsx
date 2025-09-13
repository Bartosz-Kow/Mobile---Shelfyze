// app/(tabs)/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { ColorValue } from "react-native";
const ACCENT_GRADIENT: readonly [ColorValue, ColorValue] = [
  "#4266C2",
  "#286161",
];
const TAB_HEIGHT = 64;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1E2A3A",
        tabBarInactiveTintColor: "#8C93A3",
      }}
      tabBar={(props) => <MinimalTabBar {...props} />}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          // 👇 ta opcja ukryje tabBar (obsłużymy w MinimalTabBar)
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function MinimalTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // 🔥 Sprawdź opcje aktualnego ekranu
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // Jeśli `tabBarStyle.display === 'none'`, nie renderuj tabów
  if (focusedOptions.tabBarStyle?.display === "none") {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.fabArea}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined
              ? (options.title as string)
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            Haptics.selectionAsync();
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const icon =
            options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? "#fff" : "#6B7280",
              size: 22,
            }) ?? null;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              {isFocused ? (
                <LinearGradient
                  colors={ACCENT_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.activePill}
                >
                  <View style={styles.iconRow}>
                    {icon}
                    <Text style={styles.activeLabel} numberOfLines={1}>
                      {label}
                    </Text>
                  </View>
                </LinearGradient>
              ) : (
                <View style={styles.inactivePill}>{icon}</View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fabArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.select({ ios: 24, android: 16 }),
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 24,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
    width: "92%",
  },
  tabButton: {
    flex: 1,
    height: TAB_HEIGHT,
  },
  inactivePill: {
    flex: 1,
    height: "100%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  activePill: {
    flex: 1,
    height: "100%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  activeLabel: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
