import CustomHeader from '@/components/utils/vetIndexHeader';
import { Stack } from 'expo-router';

export default function Layout() {

  return (
    <Stack>
      <Stack.Screen name='index' options={{ header: () => <CustomHeader /> }} />
      <Stack.Screen name='vetDetail' options={{ headerShown: false }} />
    </Stack>
  );
}
