import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useState } from 'react';
import Header from '../../components/Header';
import LoadingScreen from '../LoadingScreen';

export default function ConfirmarRegistro(props) {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);

  const confRegistro = async () => {
    const url = 'http://54.237.169.52:8080/CroupierAPI/confirmRegister';

    if (codigo == null || codigo == '') {
      Alert.alert('Campo vacío', 'Introduzca el código de 7 dígitos.');
      return;
    }

    const datos = {
      numeroConfirmacion: codigo,
    };

    try {
      setLoading(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert('Error verificando el código', 'Número incorrecto');
        return;
      }

      Alert.alert('Información del mensaje', resultado.message);
      console.log(resultado);
      props.navigation.navigate('LogIn');

    } catch (error) {
      let mensajeError = 'Hubo un problema al conectar con el servidor.';

      if (error.name === 'AbortError') {
        mensajeError = 'La conexión tardó demasiado. Revisa tu internet.';
      } else if (error.message === 'Network request failed') {
        mensajeError = 'No hay conexión a internet.';
      }

      Alert.alert('Error al confirmar registro', mensajeError);
      console.error('Error en la petición:', error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
        >
          <Header homeVisible={false} />

          <View style={styles.contentContainer}>
            <Text style={styles.title}>CONFIRMAR REGISTRO</Text>

            <Image
              style={styles.logo}
              source={require('../../assets/logoV2.webp')}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Código de verificación</Text>
              <TextInput
                style={styles.input}
                value={codigo}
                onChangeText={setCodigo}
                placeholder="Ingrese el código de 7 dígitos"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                maxLength={7}
                returnKeyType="done"
              />
            </View>

            <Pressable
              onPress={confRegistro}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flex: 6,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    opacity: 0.4
  },
  inputContainer: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Merriweather-SemiBold',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 350,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Merriweather-SemiBold',
  },
});