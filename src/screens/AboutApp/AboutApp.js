import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import { borrarTodosLosRecords } from '../../metodos/StorageUtils';

import Contexto from '../../metodos/Context';
const { Context } = Contexto;

export default function AboutApp() {
  const navigation = useNavigation();
  const { informacionUsuario, online } = useContext(Context);

  const borradoRecords = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas borrar todos los récords? (solo se borrarán de su dispositivo).',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            borrarTodosLosRecords();
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <Header backVisible={false} />
        <View style={styles.body}>
          <View style={styles.headerContainer}>
            <Text style={styles.paragraph}>Sobre la App</Text>
          </View>

          {/* Ajustar la disposición de la imagen con flex */}
          <View style={styles.juanito}>
            <Image
              source={require('../../assets/Juanito.webp')}
              style={styles.image}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>¿Quién Soy?</Text>
            <Text style={styles.sectionText}>
              Hola, soy Juan Martín Barrachina Alfonso, también conocido como
              Martín o "Juanito".
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>¿Por qué he desarrollado esta app?</Text>
            <Text style={styles.sectionText}>
              Desarrollé esta aplicación porque, mientras realizaba el cursillo de croupier,
              me ayudó mucho practicar con los minijuegos que contiene para
              mejorar mi cálculo y agilidad mental.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disfruta de la app 🙂</Text>
            <Text style={styles.sectionText}>
              Si estás leyendo esto, espero que disfrutes la aplicación y que te
              sea tan útil como lo ha sido para mí.
            </Text>
            <Text style={styles.sectionText}>
              Un saludo para mis profesores y amigos de Florida Universitària, a
              mis compañeros de trabajo del Casino y a Mari Carmen ¡La mejor
              profe!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    // Eliminado el flex aquí
  },

  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    flexGrow: 1, // Asegura que el contenido crezca según el tamaño de la pantalla
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20, // Para separar un poco más el encabezado de los siguientes elementos
  },
  paragraph: {
    fontSize: 35,
    fontFamily: 'Merriweather-SemiBold',
    textAlign: 'center',
    marginTop: 2,
  },
  juanito: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Separación entre la imagen y el siguiente contenido
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },

  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#34495e',
  },

  button: {
    backgroundColor: 'black',
    width: 250,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
  },
});
