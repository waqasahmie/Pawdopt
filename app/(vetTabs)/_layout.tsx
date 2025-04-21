import { VetTabBar } from '@/components/ui/vetTabBar';
import CustomHeader from '@/components/utils/vetDashboardHeader';
import ScheduleHeader from '@/components/utils/dashboardScheduleHeader';
import ReviewHeader from '@/components/utils/dashboardReviewHeader';
import { Tabs } from 'expo-router';
import React from 'react';


const TabLayout = () => {
  return (
    <Tabs tabBar={props => <VetTabBar {...props} />}>
        <Tabs.Screen name='index' options={{ header: () => <CustomHeader /> }} />
        <Tabs.Screen name='schedule' options={{ header: () => <ScheduleHeader /> }} />
        <Tabs.Screen name='reviews' options={{ header: () => <ReviewHeader /> }} />
        <Tabs.Screen name='chat' options={{ headerShown: false }} />
        <Tabs.Screen name='account' options={{ headerShown: false }} />
    </Tabs>
  )
}

export default TabLayout;