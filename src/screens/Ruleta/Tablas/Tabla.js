import { useState, useEffect, useContext } from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from 'react-native';

import { cargarDato, guardarDato } from '../../../metodos/StorageUtils';
import { cargarRecord } from '../../../metodos/cargarRecord';
import actualizarRecord from '../../../metodos/actualizarRecord';

import Contexto from '../../../metodos/Context';
const { Context } = Contexto;

import StreakCounter from '../../../components/StreakCounter';
import Header from '../../../components/Header';
export default function Tabla({ route }) {
  const { tabla } = route.params ?? 5;

  const nombreRecord = `RecordTabla${tabla}`;
  const { informacionUsuario, online } = useContext(Context);

  const [resultadoCorrecto, setResultadoCorrecto] = useState(0);
  const [numeroMultiplicado, setNumeroMultiplicado] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
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
      multiplicador = Math.floor(Math.random() * 20) + 1;
    } while (multiplicador == numeroMultiplicado);
    let resultado = tabla * multiplicador;
    setNumeroMultiplicado(multiplicador);
    setResultadoCorrecto(resultado);
  };

  const verificarRespuesta = () => {
    if (parseFloat(respuestaUsuario) === resultadoCorrecto) {
      setRespuestaUsuario('');
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
      <Header />
      <View style={styles.body}>
        <View style={{ flex: 0.9, justifyContent: 'center' }}>
          <Text style={styles.paragraph}> Tabla del {tabla}: </Text>
        </View>
        {mostrarRespuesta && (
          <View style={{ flex: 0.7, justifyContent: 'center' }}>
            <Text style={styles.answer}>Respuesta: {resultadoCorrecto}</Text>
          </View>
        )}

        <View style={{ flex: 0.7, justifyContent: 'center' }}>
          <Text style={styles.question}>
            {tabla} x {numeroMultiplicado} =
          </Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={respuestaUsuario}
            onChangeText={(texto) => setRespuestaUsuario(texto.replace(',', '.'))}
            placeholder="Respuesta"
            placeholderTextColor="#888"
          />
        </View>
        <View style={{ flex: 0.7 }}>
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              fontFamily: 'Merriweather-Light',
              color: colorComprobar,
              marginTop: 10,
            }}>
            {textoComprobar}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Pressable onPress={() => verificarRespuesta()} style={styles.button}>
            <Text style={styles.buttonText}>Comprobar</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setMostrarRespuesta(true);
              setRacha(0);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Mostrar Respuesta</Text>
          </Pressable>
        </View>
      </View>
      <StreakCounter racha={racha} record={record} />
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
    marginTop: 30,
    fontSize: 30,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Merriweather-SemiBold',
  },
  input: {
    height: 60,
    width: 200,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
  },
  answer: {
    fontSize: 28,
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontFamily: 'Merriweather-Light',

  },
  question: {
    fontSize: 30,
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