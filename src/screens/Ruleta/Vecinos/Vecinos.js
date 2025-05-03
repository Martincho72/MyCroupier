import { useState, useEffect, useContext } from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';

import { cargarDato, guardarDato } from '../../../metodos/StorageUtils';
import { cargarRecord } from '../../../metodos/cargarRecord';
import actualizarRecord from '../../../metodos/actualizarRecord';

import Contexto from '../../../metodos/Context';
const { Context } = Contexto;

import StreakCounter from '../../../components/StreakCounter';
import Header from '../../../components/Header';

export default function Vecinos() {
  const [secuenciaRuleta, setSecuenciaRuleta] = useState([
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ]);

  const nombreRecord = 'RecordVecinos';
  const { informacionUsuario, online } = useContext(Context);
  const CORRECTO = 2;

  const INCORRECTO = 1;
  const SIN_INTENTO = 0;

  const [resultadoCorrecto, setResultadoCorrecto] = useState([]);
  const [vecinos, setVecinos] = useState([
    { nombre: 'vecino1', valor: 0, correcto: SIN_INTENTO },
    { nombre: 'vecino2', valor: 0, correcto: SIN_INTENTO },
    { nombre: 'vecino3', valor: 0, correcto: SIN_INTENTO },
    { nombre: 'vecino4', valor: 0, correcto: SIN_INTENTO },
  ]);
  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  const [textoComprobar, setTextoComprobar] = useState('');
  const [colorComprobar, setColorComprobar] = useState('');
  const [racha, setRacha] = useState(0);
  const [record, setRecord] = useState(0);

  const generarNumero = () => {
    let numero = -1;
    do {
      numero = Math.floor(Math.random() * 37);
    } while (numero == numeroAleatorio);
    setNumeroAleatorio(numero);
    let resultado = calcularVecinos(numero);
    setResultadoCorrecto(resultado);
  };

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

  const calcularVecinos = (seleccionado) => {
    const indice = secuenciaRuleta.indexOf(seleccionado);
    const vecinos = [];

    for (var i = 1; i <= 2; i++) {
      var indiceIzquierda =
        indice - i < 0 ? secuenciaRuleta.length + (indice - i) : indice - i;
      vecinos.push(secuenciaRuleta[indiceIzquierda]);
    }

    for (var j = 1; j <= 2; j++) {
      var indiceDerecha =
        indice + j >= secuenciaRuleta.length
          ? indice + j - secuenciaRuleta.length
          : indice + j;
      vecinos.push(secuenciaRuleta[indiceDerecha]);
    }

    vecinos.sort((a, b) => a - b);
    return vecinos;
  };

  const borrarIncorrectos = () => {
    const vecinitos = vecinos.map((value) => ({
      ...value,
      valor: value.correcto === INCORRECTO ? 0 : value.valor,
      correcto: value.correcto === INCORRECTO ? SIN_INTENTO : value.correcto,
    }));

    setVecinos(vecinitos);
  };

  const manejarMostrarRespuesta = () => {
    const nuevosVecinos = vecinos.map((vecino, index) => ({
      ...vecino,
      valor: vecino.correcto === CORRECTO ? vecino.valor : null,
      correcto: vecino.correcto === CORRECTO ? CORRECTO : SIN_INTENTO,
    }));

    setVecinos(nuevosVecinos);
    setMostrarRespuesta(true);
    setRacha(0);
  };

  const verificarRespuesta = () => {
    const nuevosVecinos = [...vecinos];

    const vecinosReordenados = Array(4).fill(null);
    const resultadoOrdenado = [...resultadoCorrecto].sort((a, b) => a - b);

    nuevosVecinos.forEach((v) => {
      v.correcto = INCORRECTO;
    });

    for (let i = 0; i < resultadoCorrecto.length; i++) {
      const valorCorrecto = resultadoCorrecto[i];
      const vecinoIndex = nuevosVecinos.findIndex(
        (v) => v.valor === valorCorrecto && v.correcto !== CORRECTO
      );

      if (vecinoIndex !== -1) {
        vecinosReordenados[i] = {
          ...nuevosVecinos[vecinoIndex],
          correcto: CORRECTO,
        };
        nuevosVecinos[vecinoIndex].correcto = CORRECTO;
      }
    }

    let vecinoIndex = 0;
    for (let i = 0; i < vecinosReordenados.length; i++) {
      if (vecinosReordenados[i] === null) {
        while (
          vecinoIndex < nuevosVecinos.length &&
          nuevosVecinos[vecinoIndex].correcto === CORRECTO
        ) {
          vecinoIndex++;
        }
        if (vecinoIndex < nuevosVecinos.length) {
          vecinosReordenados[i] = {
            ...nuevosVecinos[vecinoIndex],
            correcto: INCORRECTO,
          };
          vecinoIndex++;
        } else {
          vecinosReordenados[i] = {
            nombre: `vecino${i + 1}`,
            valor: 0,
            correcto: INCORRECTO,
          };
        }
      }
    }

    setVecinos(vecinosReordenados);

    const todosCorrectos = vecinosReordenados.every(
      (v, i) => v.valor === resultadoCorrecto[i]
    );

    if (todosCorrectos) {
      setMostrarRespuesta(false);
      setTextoComprobar('¡Correcto!');
      setColorComprobar('green');

      const nuevaRacha = racha + 1;
      if (nuevaRacha > record) {
        setRecord(nuevaRacha);
      }
      setRacha(nuevaRacha);

      setVecinos([
        { nombre: 'vecino1', valor: 0, correcto: SIN_INTENTO },
        { nombre: 'vecino2', valor: 0, correcto: SIN_INTENTO },
        { nombre: 'vecino3', valor: 0, correcto: SIN_INTENTO },
        { nombre: 'vecino4', valor: 0, correcto: SIN_INTENTO },
      ]);
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
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      <SafeAreaView style={styles.container}>
        <Header backVisible={false} />
        <View style={styles.body}>
          <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
            <Text style={styles.paragraph}>
              Introduce los vecinos del: {numeroAleatorio}
            </Text>
          </View>

          <View
            style={{
              flex: 0.7,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            {vecinos.map((vecino, index) => (
              <TextInput
                key={index}
                style={styles.input}
                keyboardType="number-pad"
                value={vecino.valor !== null ? vecino.valor.toString() : ''}
                maxLength={2}
                onChangeText={(text) => {
                  const nuevosVecinos = [...vecinos];
                  nuevosVecinos[index].valor = text ? parseInt(text) : null;
                  setVecinos(nuevosVecinos);
                }}
                editable={vecino.correcto !== CORRECTO}
                backgroundColor={
                  vecino.correcto === INCORRECTO
                    ? 'red'
                    : vecino.correcto === CORRECTO
                      ? 'green'
                      : 'black'
                }
                placeholderTextColor="gray"
                placeholder={
                  mostrarRespuesta && vecino.valor === null
                    ? resultadoCorrecto[index].toString()
                    : ''
                }
              />
            ))}
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <Text
              style={{
                fontSize: 28,
                textAlign: 'center',
                color: colorComprobar,
              }}>
              {textoComprobar}
            </Text>
          </View>
          <View style={{ flex: 1.4 }}>
            <Pressable
              onPress={() => verificarRespuesta()}
              style={styles.button}>
              <Text style={styles.buttonText}>Comprobar</Text>
            </Pressable>

            <Pressable
              onPress={() => borrarIncorrectos()}
              style={styles.button}>
              <Text style={styles.buttonText}>Borrar Incorrectos</Text>
            </Pressable>

            <Pressable
              onPress={() => manejarMostrarRespuesta()}
              style={styles.button}>
              <Text style={styles.buttonText}>Mostrar Respuesta</Text>
            </Pressable>
          </View>
        </View>
        <StreakCounter racha={racha} record={record} />
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
    flex: 8,
    alignItems: 'center',
    marginTop: 20
  },
  paragraph: {
    fontSize: 33,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Merriweather-SemiBold',
  },
  button: {
    backgroundColor: 'black',
    width: 250,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
  },
  input: {
    backgroundColor: 'black',
    margin: 5,
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    flexGrow: 1,
  },
});