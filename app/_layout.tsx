import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { AppProvider } from "../hooks/AppContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import React from "react";
import PresenceManager from "@/components/utils/PresenceManager";
import * as Notifications from "expo-notifications";
import * as Location from 'expo-location';
import { Alert } from "react-native";

// ✅ Set the global notification handler to show notifications even in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "JUST Sans Outline ExBold": require("../assets/fonts/JUST Sans Outline ExBold.otf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Location Permission",
            "Location access is required for this app to work properly."
          );
        } else {
          const location = await Location.getCurrentPositionAsync({});
        }
      } finally {
        // Once fonts are loaded and permission is handled, hide splash
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    if (loaded) {
      prepareApp();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <AppProvider>
        <PresenceManager />
        <Stack initialRouteName="(onboarding)">
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="(forgotPassword)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(finalSteps)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="(accountScreens)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(vetTabs)" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="(vet)" options={{ headerShown: false }} />
          <Stack.Screen name="(others)" options={{ headerShown: false }} />
          <Stack.Screen name="(chat)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </ClerkProvider>
  );
}
