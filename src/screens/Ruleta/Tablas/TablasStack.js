import { createStackNavigator } from '@react-navigation/stack';
import SeleccionarTabla from './SeleccionarTabla';
import Tabla from './Tabla';

const Stack = createStackNavigator();

const TablasStack = () => (
  <Stack.Navigator options="false">
    <Stack.Screen
      name="SeleccionarTabla"
      component={SeleccionarTabla}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Tabla"
      component={Tabla}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default TablasStack;