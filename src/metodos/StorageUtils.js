import AsyncStorage from '@react-native-async-storage/async-storage';

export const cargarDato = async (clave, setEstado) => {
  try {
    const valorGuardado = await AsyncStorage.getItem(clave);
    if (valorGuardado !== null) {
      setEstado(parseInt(valorGuardado));
    } else {
      setEstado(0);
    }
  } catch (error) {
    console.error(`Error cargando los datos para ${clave}:`, error);
  }
};

export const guardarDato = async (clave, valor) => {
  try {
    await AsyncStorage.setItem(clave, valor.toString());
  } catch (error) {
    console.error(`Error guardando los datos para ${clave}:`, error);
  }
};

export const borrarTodosLosRecords = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Todos los registros han sido borrados');
  } catch (error) {
    console.error('Error borrando todos los registros:', error);
  }
};
