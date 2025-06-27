import CustomHeader from '@/components/utils/vetIndexHeader';
import { Stack } from 'expo-router';
import AppointmentHeader  from '@/components/utils/appointmentHeader'

export default function Layout() {

  return (
    <Stack>
      <Stack.Screen name='index' options={{ header: () => <CustomHeader /> }} />
      <Stack.Screen name='vetDetail' options={{ headerShown: false }} />
      <Stack.Screen name='appointments' options={{ header: () => <AppointmentHeader /> }} />
    </Stack>
  );
}
