import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { useState } from 'react';
import Header from '../../components/Header';
import LoadingScreen from '../LoadingScreen';

export default function Registro(props) {
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [confirmarContrasenya, setConfirmarContrasenya] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(false);

  const esCorreoValido = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  };

  const enviarDatos = async () => {
    if (aceptoTerminos === true) {
      if (
        usuario == '' ||
        correoElectronico == '' ||
        contrasenya == '' ||
        confirmarContrasenya == ''
      ) {
        window.alert('Campos vacíos: '+ 'Rellene los campos vacíos.');
        return;
      } else if (!esCorreoValido(correoElectronico)) {
        window.alert("Correo no válido: "+"Ingrese un correo electrónico válido.");
        return;
      } else if (contrasenya !== confirmarContrasenya) {
        window.alert('Error Contraseñas: '+ "Las contraseñas no coinciden.");
        return;
      }

      setLoading(true);

      const url = 'https://api.mycroupier.duckdns.org/CroupierAPI/register';
      const datos = {
        nombreUsuario: usuario,
        contrasenya: contrasenya,
        correoElectronico: correoElectronico,
      };

      try {
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
          window.alert('Error: '+ resultado.message || 'Error Desconocido.');
          return;
        }

        window.alert("Verificar Cuenta: "+ "Revise su correo e ingrese el código en la pantalla de confirmación.");
        props.navigation.navigate("ConfirmarRegistro");
        console.log(resultado);

      } catch (error) {
        let mensajeError = 'Hubo un problema al conectar con el servidor.';

        if (error.name === 'AbortError') {
          mensajeError = 'La conexión tardó demasiado. Revisa tu internet.';
        } else if (error.message === 'Network request failed') {
          mensajeError = 'No hay conexión a internet.';
        }

        window.alert('Error al registrar el usuario: '+ mensajeError);
        console.error('Error en la petición: '+ error);

      } finally {
        setLoading(false);
      }
    } else {
      window.alert(
        'Términos y condiciones NO aceptados: '+
        'Acepte la política de privacidad para registrarse.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header homeVisible={false} />

          <View style={styles.content}>
            <Text style={styles.paragraph}>REGISTRO</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Usuario</Text>
                <TextInput
                  style={styles.input}
                  value={usuario}
                  onChangeText={(text) => setUsuario(text.replace(/\s/g, ''))}
                  placeholder="Juanito"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                  style={styles.input}
                  value={correoElectronico}
                  onChangeText={(text) => setCorreoElectronico(text.replace(/\s/g, ''))}
                  placeholder="juanito@correo.com"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={contrasenya}
                  onChangeText={(text) => setContrasenya(text.replace(/\s/g, ''))}
                  placeholder="Escriba su contraseña"
                  placeholderTextColor="#888"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Contraseña</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={confirmarContrasenya}
                  onChangeText={(text) => setConfirmarContrasenya(text.replace(/\s/g, ''))}
                  placeholder="Repita su contraseña"
                  placeholderTextColor="#888"
                  returnKeyType="done"
                />
              </View>

              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, aceptoTerminos && styles.checked]}
                  onPress={() => setAceptoTerminos(!aceptoTerminos)}
                >
                  {aceptoTerminos && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Acepto los </Text>
                <Pressable onPress={() => console.log("Mostrar términos")}>
                  <Text style={styles.linkText}>términos y condiciones</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => props.navigation.navigate('PoliticaPrivacidad')}
                style={styles.privacyLink}
              >
                <Text style={styles.linkText}>Leer política de privacidad</Text>
              </Pressable>

              <Pressable
                onPress={enviarDatos}
                style={styles.button}
                unstable_pressDelay={75}
              >
                <Text style={styles.buttonText}>Registrarse</Text>
              </Pressable>

              <Pressable
                onPress={() => props.navigation.navigate('ConfirmarRegistro')}
                style={styles.button}
                unstable_pressDelay={75}
              >
                <Text style={styles.buttonText}>Ingresar código de confirmación</Text>
              </Pressable>
            </View>
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
    paddingBottom: 20,
    ...Platform.select({
      web: {
        minHeight: 'calc(100vh - 100px)'
      }
    })
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  paragraph: {
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
    marginBottom: 15,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Merriweather-SemiBold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Merriweather-Light',
    color: '#333',
  },
  privacyLink: {
    marginBottom: 25,
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'underline',
    fontFamily: 'Merriweather-Light',
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Merriweather-SemiBold',
  }
});