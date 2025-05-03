import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './Home';
import Tab_Ruleta from './Ruleta/Tab_Ruleta'
import Tab_BlackJack from './BlackJack/Tab_BlackJack';
import Clasificacion from './Clasificacion/Clasificacion';
import AboutApp from './AboutApp/AboutApp';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tab_Ruleta"
            component={Tab_Ruleta}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tab_BlackJack"
            component={Tab_BlackJack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Clasificacion"
            component={Clasificacion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AboutApp"
            component={AboutApp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
});
