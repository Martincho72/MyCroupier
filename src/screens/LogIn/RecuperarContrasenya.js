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
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useState } from 'react';
import Header from '../../components/Header';
import LoadingScreen from '../LoadingScreen';

export default function RecuperarContrasenya(props) {
  const [loading, setLoading] = useState(false);
  const [correo, setCorreo] = useState('');

  const esCorreoValido = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  };

  const recuperarContrasenya = async () => {
    const url = 'http://54.237.169.52:8080/CroupierAPI/forgottenPassword';

    if (!correo) {
      Alert.alert('Campo vacío', 'Introduzca el correo electrónico asociado a su cuenta.');
      return;
    }

    if (!esCorreoValido(correo)) {
      Alert.alert("Correo no válido", "Ingrese un correo electrónico válido.");
      return;
    }

    const datos = {
      correoElectronico: correo,
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
        Alert.alert('Error', resultado.message || 'Error Desconocido.');
        return;
      }

      Alert.alert('Nueva contraseña', resultado.message);
      console.log(resultado);
      props.navigation.navigate('LogIn');

    } catch (error) {
      let mensajeError = 'Hubo un problema al conectar con el servidor.';

      if (error.name === 'AbortError') {
        mensajeError = 'La conexión tardó demasiado. Revisa tu internet.';
      } else if (error.message === 'Network request failed') {
        mensajeError = 'No hay conexión a internet.';
      }

      Alert.alert('Error al recuperar contraseña', mensajeError);
      console.error('Error en la petición:', error);

    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.container}>
            <Header homeVisible={false} />

            <View style={styles.contentContainer}>
              <Text style={styles.title}>RECUPERAR CONTRASEÑA</Text>

              <Image
                style={styles.logo}
                source={require('../../assets/logoV2.webp')}
              />

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                  style={styles.input}
                  value={correo}
                  onChangeText={setCorreo}
                  placeholder="Escriba su correo electrónico"
                  placeholderTextColor="#888"
                  returnKeyType="done"
                />
              </View>

              <Pressable
                onPress={() => recuperarContrasenya()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Recuperar Contraseña</Text>
              </Pressable>
            </View>
          </SafeAreaView>
          {loading && <LoadingScreen />}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    flex: 3,
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