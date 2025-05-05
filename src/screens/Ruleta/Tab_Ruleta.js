import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Tablas from './Tablas/TablasStack';
import Zonas from './Zonas/Zonas';
import Vecinos from './Vecinos/Vecinos';
import Cierre from './Cierre/Cierre';

const Tab_Ruleta = createBottomTabNavigator();

const App = () => (
  <Tab_Ruleta.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: 'black',
        borderTopWidth: 0,
        height: 70,
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
          case 'Tablas':
            iconName = 'grid-outline';
            break;
          case 'Zonas':
            iconName = 'map-outline';
            break;
          case 'Vecinos':
            iconName = 'people-outline';
            break;
          case 'Cierre':
            iconName = 'lock-closed-outline';
            break;
          default:
            iconName = 'help-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
    <Tab_Ruleta.Screen name="Tablas" component={Tablas} />
    <Tab_Ruleta.Screen name="Zonas" component={Zonas} />
    <Tab_Ruleta.Screen name="Vecinos" component={Vecinos} />
    <Tab_Ruleta.Screen name="Cierre" component={Cierre} />
  </Tab_Ruleta.Navigator>
);

export default App;