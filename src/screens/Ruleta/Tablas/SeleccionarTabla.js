import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import Header from '../../../components/Header';

export default function SeleccionarTabla(props) {
  const [tablasPorFichas] = useState([5, 8, 11, 17, 35]);
  const [tablasPorValor] = useState([1.25, 2.5, 10, 25, 50, 100, 500]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Header backVisible={false} />

          <View style={styles.body}>
            <View style={styles.section}>
              <Text style={styles.title}>Tablas por fichas:</Text>
              <View style={styles.gridContainer}>
                {tablasPorFichas.map((tabla, index) => (
                  <Pressable
                    key={index}
                    style={styles.button}
                    onPress={() =>
                      props.navigation.navigate('Tabla', { tabla })
                    }>
                    <Text style={styles.buttonText}>{tabla}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Tablas por valor:</Text>
              <View style={styles.gridContainer}>
                {tablasPorValor.map((tabla, index) => (
                  <Pressable
                    key={index}
                    style={styles.button}
                    onPress={() =>
                      props.navigation.navigate('Tabla', { tabla })
                    }>
                    <Text style={styles.buttonText}>{tabla}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
    backgroundColor: '#fcfcfc',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  section: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 33,
    fontFamily: 'Merriweather-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
