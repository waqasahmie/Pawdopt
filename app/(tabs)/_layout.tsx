import { TabBar } from '@/components/ui/TabBar';
import CustomHeader from '@/components/utils/indexHeader';
import { Tabs } from 'expo-router';
import React from 'react';


const TabLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen name='index' options={{ header: () => <CustomHeader /> }} />
        <Tabs.Screen name='location' options={{ headerShown: false }} />
        <Tabs.Screen name='favorite' options={{ headerShown: false }} />
        <Tabs.Screen name='chat' options={{ headerShown: false }} />
        <Tabs.Screen name='account' options={{ headerShown: false }} />
    </Tabs>
  )
}

export default TabLayout;