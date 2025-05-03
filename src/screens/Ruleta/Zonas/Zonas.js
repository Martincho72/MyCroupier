import { useState, useEffect, useContext } from 'react';

import { Text, SafeAreaView, StyleSheet, View, Pressable } from 'react-native';

import { cargarDato, guardarDato } from '../../../metodos/StorageUtils';
import { cargarRecord } from '../../../metodos/cargarRecord';
import actualizarRecord from '../../../metodos/actualizarRecord';

import Contexto from '../../../metodos/Context';
const { Context } = Contexto;

import StreakCounter from '../../../components/StreakCounter';
import Header from '../../../components/Header';
export default function Zonas() {
  const [numerosTercio, setNumerosTercio] = useState([
    5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36,
  ]);
  const [numerosHuerfanos, setNumerosHuerfanos] = useState([
    1, 6, 9, 14, 17, 20, 31, 34,
  ]);
  const [numerosVecinosDel0, setNumerosVecinosDel0] = useState([
    0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35,
  ]);

  const nombreRecord = 'RecordZonas';
  const { informacionUsuario, online } = useContext(Context);

  const [resultadoCorrecto, setResultadoCorrecto] = useState('');
  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [textoComprobar, setTextoComprobar] = useState('');
  const [colorComprobar, setColorComprobar] = useState('');
  const [racha, setRacha] = useState(0);
  const [record, setRecord] = useState(0);

  useEffect(() => {
    generarNumero();
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

  const generarNumero = () => {
    let numero = -1;
    do {
      numero = Math.floor(Math.random() * 37);
    } while (numero == numeroAleatorio);
    setNumeroAleatorio(numero);
    let resultado = 'Vecinos del 0';
    if (numerosTercio.includes(numero)) {
      resultado = 'Tercio';
    } else if (numerosHuerfanos.includes(numero)) {
      resultado = 'Huerfanos';
    }
    setResultadoCorrecto(resultado);
  };

  const verificarRespuesta = (respuesta) => {
    if (respuesta == resultadoCorrecto) {
      setTextoComprobar('¡Correcto!');
      setColorComprobar('green');
      let rachaAvanza = racha + 1;

      if (rachaAvanza > record) {
        setRecord(rachaAvanza);
      }

      setRacha(rachaAvanza);
      generarNumero();
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
      <Header backVisible={false} />
      <View style={styles.body}>
        <View style={{ flex: 0.6, justifyContent: 'flex-end' }}>
          <Text style={styles.paragraph}> Número: {numeroAleatorio} </Text>
        </View>

        <View style={{ flex: 0.6, justifyContent: 'center' }}>
          <Text style={styles.question}>¿A qué zona pertenece?:</Text>
        </View>

        <View style={{ flex: 0.3 }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: 'center',
              color: colorComprobar,
              fontFamily: 'Merriweather-Light',
            }}>
            {textoComprobar}
          </Text>
        </View>
        <View style={{ flex: 2.5 }}>
          <Pressable
            onPress={() => verificarRespuesta('Tercio')}
            style={styles.button}>
            <Text style={styles.buttonText}>Tercio</Text>
          </Pressable>

          <Pressable
            onPress={() => verificarRespuesta('Huerfanos')}
            style={styles.button}>
            <Text style={styles.buttonText}>Huérfanos</Text>
          </Pressable>

          <Pressable
            onPress={() => verificarRespuesta('Vecinos del 0')}
            style={styles.button}>
            <Text style={styles.buttonText}>Vecinos del 0</Text>
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
    marginTop: 10
  },
  paragraph: {
    fontSize: 35,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Merriweather-SemiBold',
  },
  question: {
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
  },
  button: {
    backgroundColor: 'black',
    width: 250,
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
  },
});