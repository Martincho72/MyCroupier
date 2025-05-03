import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import BlackJackPaga from './BlackJackPaga';
import BlackJackGame from './BlackJackGame';

const Tab_BlackJack = createBottomTabNavigator();

const App = () => (
  <Tab_BlackJack.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: 'black',
        borderTopWidth: 0,
        height: 60,
        justifyContent: 'center',
      },
      tabBarInactiveBackgroundColor: '#2f2f2f',
      tabBarActiveBackgroundColor: 'black',
      tabBarInactiveTintColor: 'white',
      tabBarActiveTintColor: '#FFFFFF',
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
      },
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'BlackJack Paga':
            iconName = 'cash-outline';
            break;
          case 'Jugar':
            iconName = 'game-controller-sharp';
            break;
          default:
            iconName = 'help-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
    <Tab_BlackJack.Screen name="BlackJack Paga" component={BlackJackPaga} />
    <Tab_BlackJack.Screen name="Jugar" component={BlackJackGame} />
  </Tab_BlackJack.Navigator>
);

export default App;