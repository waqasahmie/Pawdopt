import { VetTabBar } from '@/components/ui/vetTabBar';
import CustomHeader from '@/components/utils/vetDashboardHeader';
import { Tabs } from 'expo-router';
import React from 'react';


const TabLayout = () => {
  return (
    <Tabs tabBar={props => <VetTabBar {...props} />}>
        <Tabs.Screen name='index' options={{ header: () => <CustomHeader /> }} />
        <Tabs.Screen name='schedule' options={{ headerShown: false }} />
        <Tabs.Screen name='reviews' options={{ headerShown: false }} />
        <Tabs.Screen name='chat' options={{ headerShown: false }} />
        <Tabs.Screen name='account' options={{ headerShown: false }} />
    </Tabs>
  )
}

export default TabLayout;