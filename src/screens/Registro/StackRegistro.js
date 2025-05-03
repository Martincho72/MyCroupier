import { createStackNavigator } from '@react-navigation/stack';
import Registro from './Registro';
import PoliticaPrivacidad from './PoliticaPrivacidad';
import ConfirmarRegistro from './ConfirmarRegistro';

const Stack = createStackNavigator();

const StackRegistro = () => (
  <Stack.Navigator options="false">
    <Stack.Screen
      name="Registro"
      component={Registro}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PoliticaPrivacidad"
      component={PoliticaPrivacidad}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ConfirmarRegistro"
      component={ConfirmarRegistro}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackRegistro;