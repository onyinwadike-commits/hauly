import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    index: '📋',
    active: '🚚',
    earnings: '💰',
    profile: '👤',
  };

  return (
    <View className="items-center">
      <Text className="text-2xl">{icons[name] || '•'}</Text>
    </View>
  );
}

export default function DriverLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C27D4B',
        tabBarInactiveTintColor: '#3D3D3D',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E5',
          paddingTop: 8,
          height: 85,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="active"
        options={{
          title: 'Active',
          tabBarIcon: ({ focused }) => <TabIcon name="active" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ focused }) => <TabIcon name="earnings" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="profile" focused={focused} />,
        }}
      />
      {/* Hidden screens */}
      <Tabs.Screen name="job" options={{ href: null }} />
    </Tabs>
  );
}
