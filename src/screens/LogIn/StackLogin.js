import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LogIn from './LogIn';
import RecuperarContrasenya from './RecuperarContrasenya';
import StackRegistro from '../Registro/StackRegistro';
import MainMenu from '../MainMenu';
import Contexto from '../../metodos/Context';
const { Provider } = Contexto;
const Stack = createStackNavigator();

const StackLogin = () => (
  <Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="RecuperarContrasenya" component={RecuperarContrasenya} />
        <Stack.Screen name="StackRegistro" component={StackRegistro} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default StackLogin;