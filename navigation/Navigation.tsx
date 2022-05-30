import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';
import LinkingConfiguration from './LinkingConfiguration';
import { ROUTES } from './routes';
import { textStyles } from '../constants/TextStyle';
import { TabBarIcon } from '../components/TabBarIcon';
import Profile from '../screens/ProfileScreen';
import Authorization from '../screens/AutorizationScreen';
import Camera from '../screens/CameraScreen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Overlay from '../components/Overlay';
import { authorizationState, screenState } from '../state/atoms';
import ResultScreen from '../screens/ResultScreen';
import Task from '../screens/TaskScreen';
import Home from '../screens/HomeScreen';
import { IScreen } from '../state/types';
import Select from '../screens/SelectScreen';

export default function Navigation() {
  const authorization = useRecoilValue(authorizationState);

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {authorization.isAuthorized ? <AuthorizedNavigator /> : <UnAuthorizedNavigator />}
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthorizedNavigator = () => {
  return (
    <>
      <Overlay />
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </>
  );
};

const UnAuthorizedNavigator = () => {
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
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const setScreen = useSetRecoilState(screenState);
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
        component={Home}
        options={({ navigation, route }: RootTabScreenProps<`${ROUTES.home}`>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.home} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                setScreen((prev: IScreen) => ({
                  ...prev,
                  isOverlay: true,
                }));
              }}
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
        name={ROUTES.select}
        component={Select}
        options={({ navigation, route }: RootTabScreenProps<`${ROUTES.select}`>) => ({
          navigation,
          route,
          title: 'Learning',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.learning} color={color} />,
        })}
      />
      <BottomTab.Screen
        name={ROUTES.translate}
        component={Camera}
        initialParams={{ cameraScreenOptions: { reachedFromPage: ROUTES.translate } }}
        options={({ navigation, route }: RootTabScreenProps<`${ROUTES.translate}`>) => ({
          navigation,
          route,
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.translate} color={color} />,
        })}
      />
      <BottomTab.Screen
        name={ROUTES.profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name={ICON_TITLES.profile} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={ROUTES.signTask}
        component={Camera}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name={ROUTES.task}
        component={Task}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
          headerTitle: ROUTES.learning,
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
