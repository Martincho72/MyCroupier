import React, { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import StackLogin from './src/screens/LogIn/StackLogin';

export default function App() {
  useEffect(() => {
    // Solo manejamos el backPress en Android, ya que en la web no tiene sentido
    if (Platform.OS === 'android') {
      const backAction = () => {
        return true; // Previene el comportamiento por defecto
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);

  return <StackLogin />;
}
