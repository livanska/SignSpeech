/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import { COLORS, COLOR_THEMES } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';
import LinkingConfiguration from './LinkingConfiguration';
import { ROUTES } from './routes';
import { textStyles } from '../constants/TextStyle';
import { ITabBarIconProps, TabBarIcon } from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Authorization from '../screens/AutorizationScreen';
import Camera from '../screens/CameraScreen';

export default function Navigation() {
  const isAuthorized = true;

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {isAuthorized ? <AuthorizedNavigator /> : <UnAuthorizedNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthorizedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function UnAuthorizedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authorization"
        component={Authorization}
        options={{ headerShown: false, contentStyle: { backgroundColor: COLORS.white } }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={ROUTES.home}
      sceneContainerStyle={{ backgroundColor: COLORS.white }}
      screenOptions={{
        headerLeftContainerStyle: { backgroundColor: COLORS.transparent },
        headerTransparent: true,
        headerBackgroundContainerStyle: styles.header,
        headerStatusBarHeight: 32,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primaryLight,
        headerShadowVisible: true,
        headerStyle: styles.header,
        headerTitleStyle: textStyles.heading,
      }}
    >
      <BottomTab.Screen
        name={ROUTES.home}
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<`${ROUTES.home}`>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.home} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={COLORS.mainText}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name={ROUTES.learning}
        component={(props: RootTabScreenProps<`${ROUTES.learning}`>) =>
          Camera({ reachedFromPage: ROUTES.learning, ...props })
        }
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.learning} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={ROUTES.translate}
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.translate} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={ROUTES.profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.profile} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 25,
    height: 92,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
});
