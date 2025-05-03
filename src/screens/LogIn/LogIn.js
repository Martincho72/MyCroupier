import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';
import { useState, useContext } from 'react';

import LoadingScreen from '../LoadingScreen';
import Contexto from '../../metodos/Context';
const { Context } = Contexto;

export default function LogIn(props) {
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const { setInformacionUsuario, setOnline } = useContext(Context);

  const enviarDatos = async () => {
    const url = 'http://54.237.169.52:8080/CroupierAPI/login';

    if (!usuario || !contrasenya) {
      Alert.alert('Campos vacíos', 'Rellena los campos vacíos.');
      return;
    }

    const datos = {
      nombreUsuario: usuario,
      contrasenya: contrasenya,
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

      console.log(resultado);
      setInformacionUsuario(resultado);
      setOnline(true)
      props.navigation.navigate('MainMenu');
      setUsuario("");
      setContrasenya("");
    } catch (error) {
      let mensajeError = 'Hubo un problema al conectar con el servidor.';

      if (error.name === 'AbortError') {
        mensajeError = 'La conexión tardó demasiado. Revise su internet.';
      } else if (error.message === 'Network request failed') {
        mensajeError = 'No hay conexión a internet.';
      }

      Alert.alert('Error al iniciar sesión', mensajeError);
      console.error('Error en la petición:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { minHeight: '100%' }]}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.containerWelcome}>
                <Text style={styles.paragraph}>¡Bienvenido!</Text>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logoV2.webp')}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Usuario</Text>
                  <TextInput
                    style={styles.input}
                    value={usuario}
                    onChangeText={(text) => setUsuario(text.replace(/\s/g, ''))}
                    placeholder="Juanito"
                    placeholderTextColor="#888"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contraseña</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={contrasenya}
                    onChangeText={(text) => setContrasenya(text.replace(/\s/g, ''))}
                    placeholder="••••••••"
                    placeholderTextColor="#888"
                  />
                </View>

                <Pressable
                  onPress={() => {
                    setOnline(false);
                    props.navigation.navigate('MainMenu');
                  }}
                  style={styles.buttonRegistrar}>
                  <Text style={styles.textRegistrar}>Acceder Sin Cuenta</Text>
                </Pressable>

                <Pressable
                  onPress={() => enviarDatos()}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </Pressable>

                <Pressable
                  onPress={() => props.navigation.navigate('StackRegistro')}
                  style={styles.buttonRegistrar}>
                  <Text style={styles.textRegistrar}>Registrarse</Text>
                </Pressable>

                <Pressable
                  onPress={() => props.navigation.navigate('RecuperarContrasenya')}
                  style={styles.buttonRegistrar}>
                  <Text style={styles.textRegistrar}>Recuperar Contraseña</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  containerWelcome: {
    alignItems: 'center',
    justifyContent: "flex-end",
    padding: 10
  },
  paragraph: {
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
  },
  button: {
    backgroundColor: 'black',
    width: 300,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonRegistrar: {
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    alignItems: 'center',
    margin: 8,
  },
  textRegistrar: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
    textDecorationLine: "underline",
  },
  buttonText: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'Merriweather-Light',
  },
  logo: {
    height: 250,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 11,
    width: 300,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Merriweather-SemiBold',
    marginBottom: 5,
    marginLeft: 5,
    color: '#333',
  },
  input: {
    height: 60,
    width: '100%',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#000',
    backgroundColor: '#fff',
  },
});
