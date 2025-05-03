import { useState, useEffect, useContext } from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { cargarDato, guardarDato } from '../../metodos/StorageUtils';
import { cargarRecord } from '../../metodos/cargarRecord';
import StreakCounter from '../../components/StreakCounter';
import Header from '../../components/Header';

import actualizarRecord from '../../metodos/actualizarRecord';

import Contexto from '../../metodos/Context';
const { Context } = Contexto;

export default function BlackJackPaga() {

  const nombreRecord = "RecordBlackjackPaga";
  const { informacionUsuario, online } = useContext(Context);

  const [resultadoCorrecto, setResultadoCorrecto] = useState(0);
  const [numeroMultiplicado, setNumeroMultiplicado] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState(0);
  const [textoComprobar, setTextoComprobar] = useState('');
  const [colorComprobar, setColorComprobar] = useState('');
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [racha, setRacha] = useState(0);
  const [record, setRecord] = useState(0);

  useEffect(() => {
    generarMultiplicacion();
    if (online) {
      cargarRecord(informacionUsuario.token, nombreRecord, informacionUsuario.id_usuario, setRecord);
    } else {
      cargarDato(nombreRecord, setRecord)
    }
  }, []);

  useEffect(() => {
    if (online) {
      actualizarRecord(nombreRecord, informacionUsuario.id_usuario, record, informacionUsuario.token);
    } else {
      guardarDato(nombreRecord, record);
    }
  }, [record]);

  const generarMultiplicacion = () => {
    let multiplicador = -1;
    do {
      multiplicador = (Math.floor(Math.random() * 50) + 1) * 10;
    } while (numeroMultiplicado == multiplicador);
    const resultado = 1.5 * multiplicador;
    setNumeroMultiplicado(multiplicador);
    setResultadoCorrecto(resultado);
  };

  const verificarRespuesta = () => {
    if (respuestaUsuario == resultadoCorrecto) {
      setRespuestaUsuario(0);
      setMostrarRespuesta(false);
      setTextoComprobar('¡Correcto!');
      setColorComprobar('green');
      let rachaAvanza = racha + 1;

      if (rachaAvanza > record) {
        setRecord(rachaAvanza);
      }

      setRacha(rachaAvanza);
      generarMultiplicacion();
    } else {
      setTextoComprobar('¡Incorrecto!');
      setColorComprobar('red');

      if (racha > record) {
        setRecord(racha);
      }
      setRacha(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <Header backVisible={false} />
        <View style={styles.body}>
          <View style={{ flex: 1.3, justifyContent: "center" }}>
            <Text style={styles.paragraph}> BLACKJACK PAGA 3:2 </Text>
          </View>
          {mostrarRespuesta && (
            <View style={{ flex: 0.6 }}>
              <Text style={styles.answer}>Respuesta: {resultadoCorrecto}</Text>
            </View>
          )}

          <View style={{ flex: 0.6 }}>
            <Text style={styles.question}>
              BlackJack de {numeroMultiplicado} paga:
            </Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={respuestaUsuario}
              onChangeText={setRespuestaUsuario}
              placeholder="Respuesta"
              placeholderTextColor="#888"
            />
          </View>
          <View style={{ flex: 0.4 }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Merriweather-Light',
                textAlign: 'center',
                color: colorComprobar,
              }}>
              {textoComprobar}
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Pressable
              onPress={() => verificarRespuesta()}
              style={styles.button}>
              <Text style={styles.buttonText}>Comprobar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setMostrarRespuesta(true), setRacha(0);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Mostrar Respuesta</Text>
            </Pressable>
          </View>
        </View>
        <StreakCounter racha={racha} record={record} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
  body: {
    flex: 8,
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 30,
    textAlign: 'center',
    zIndex: 2,
    justifyContent: "flex-end",
    fontFamily: 'Merriweather-SemiBold',
  },
  input: {
    height: 60,
    width: 200,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
  },
  answer: {
    fontSize: 28,
    textAlign: 'center',
    color: 'blue',
    fontFamily: 'Merriweather-Light',
  },
  question: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
  },
  button: {
    backgroundColor: 'black',
    width: 250,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
  },
});