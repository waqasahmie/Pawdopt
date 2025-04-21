import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AppProvider } from '../hooks/AppContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'JUST Sans Outline ExBold': require('../assets/fonts/JUST Sans Outline ExBold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <Stack initialRouteName="(onboarding)">
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
        <Stack.Screen name="(modals)" options={{ headerShown: false, presentation: "modal" }}/>
        <Stack.Screen name="(forgotPassword)" options={{ headerShown: false }}/>
        <Stack.Screen name="(finalSteps)" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="(accountScreens)" options={{ headerShown: false }} />
        <Stack.Screen name="(vetTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(vet)" options={{ headerShown: false }} />
        <Stack.Screen name="(others)" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}