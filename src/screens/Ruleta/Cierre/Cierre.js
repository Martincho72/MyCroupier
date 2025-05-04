import { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import {
  nombreAleatorio,
  comprobarEmoji,
  getRandomInt,
  devolverMensaje,
} from '../../../metodos/UtilsCierre';

import { cargarDato, guardarDato } from '../../../metodos/StorageUtils';

import { cargarRecord } from '../../../metodos/cargarRecord';
import actualizarRecord from '../../../metodos/actualizarRecord';

import Contexto from '../../../metodos/Context';
const { Context } = Contexto;

import Header from '../../../components/Header';

const Cierre = () => {

  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [nombre, setNombre] = useState(nombreAleatorio(0));
  const [emoji, setEmoji] = useState(comprobarEmoji('Sandro'));

  const nombreRecord = 'RecordCierre';
  const { informacionUsuario, online } = useContext(Context);

  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(true);
  const [valoresIntroducidos, setValoresIntroducidos] = useState({});
  const [respuestaTotal, setRespuestaTotal] = useState(0);
  const [bordes, setBordes] = useState({});
  const [tiempoPersonal, setTiempoPersonal] = useState(0);

  const [fichas, setFichas] = useState([
    { valor: 10000, cantidad: getRandomInt(0, 5) },
    { valor: 500, cantidad: getRandomInt(5, 40) },
    { valor: 100, cantidad: getRandomInt(15, 65) },
    { valor: 50, cantidad: getRandomInt(30, 100) },
    { valor: 25, cantidad: getRandomInt(30, 100) },
    { valor: 10, cantidad: getRandomInt(40, 80) },
    { valor: 5, cantidad: getRandomInt(60, 250) },
    { valor: 2.5, cantidad: getRandomInt(60, 250) },
    { valor: 1.25, cantidad: getRandomInt(8, 30) },
  ]);

  useEffect(() => {
    if (online) {
      cargarRecord(informacionUsuario.token, nombreRecord, informacionUsuario.id_usuario, setTiempoPersonal);
    } else {
      cargarDato(nombreRecord, setTiempoPersonal)
    }
  }, [nombre]);

  useEffect(() => {
    let intervalo;
    if (corriendo) {
      intervalo = setInterval(() => setTiempo((prev) => prev + 1), 1000);
    }
    return () => clearInterval(intervalo);
  }, [corriendo]);

  const formatearTiempo = (segundos) => {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, '0');
    const sec = (segundos % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const total = fichas.reduce(
    (acc, ficha) => acc + ficha.valor * ficha.cantidad,
    0
  );

  const reiniciar = () => {
    let nuevoNombre = -1;
    do {
      nuevoNombre = getRandomInt(0, 4);
    } while (nuevoNombre == numeroAleatorio);
    let nom = nombreAleatorio(nuevoNombre);
    setNumeroAleatorio(nuevoNombre);
    setNombre(nom);
    setEmoji(comprobarEmoji(nom));
    setTiempo(0);
    setCorriendo(true);
    setRespuestaTotal(0);
    setValoresIntroducidos({});
    setBordes({});
    setFichas([
      { valor: 10000, cantidad: getRandomInt(1, 5) },
      { valor: 500, cantidad: getRandomInt(5, 40) },
      { valor: 100, cantidad: getRandomInt(15, 65) },
      { valor: 50, cantidad: getRandomInt(30, 100) },
      { valor: 25, cantidad: getRandomInt(30, 100) },
      { valor: 10, cantidad: getRandomInt(40, 80) },
      { valor: 5, cantidad: getRandomInt(60, 250) },
      { valor: 2.5, cantidad: getRandomInt(60, 250) },
      { valor: 1.25, cantidad: getRandomInt(8, 30) },
    ]);
  };

  const mostrarRespuestas = () => {
    let respuestas = {};
    let totalRespuesta = 0;

    fichas.forEach((ficha) => {
      const respuestaCorrecta = (ficha.valor * ficha.cantidad).toFixed(2);
      respuestas[ficha.valor] = respuestaCorrecta;
      totalRespuesta += parseFloat(respuestaCorrecta);
    });

    setValoresIntroducidos(respuestas);
    setTiempo(900);
    setRespuestaTotal(total.toFixed(2));
  };

  const comprobarRespuestas = () => {
    let todasCorrectas = true;
    let nuevosBordes = {};

    fichas.forEach((ficha) => {
      const valorIntroducido =
        parseFloat(valoresIntroducidos[ficha.valor]) || 0;
      const valorCorrecto = ficha.valor * ficha.cantidad;

      if (valorIntroducido == valorCorrecto) {
        nuevosBordes[ficha.valor] = 'green';
      } else {
        nuevosBordes[ficha.valor] = 'red';
        todasCorrectas = false;
      }
    });

    if (respuestaTotal == total) {
      nuevosBordes['total'] = 'green';
    } else {
      nuevosBordes['total'] = 'red';
      todasCorrectas = false;
    }

    setBordes(nuevosBordes);

    if (todasCorrectas && respuestaTotal == total) {
      if (tiempoPersonal > tiempo || tiempoPersonal == 0) {
        if (online) {
          actualizarRecord(nombreRecord, informacionUsuario.id_usuario, tiempo, informacionUsuario.token);
        } else {
          guardarDato(nombreRecord, tiempo);
        }
      }
      let message = devolverMensaje(nombre, tiempo);
      setCorriendo(false);
      window.alert(nombre + ' dice: ' + message);
    } else {
      window.alert('Error: '+ 'Revisa los campos en rojo');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Header backVisible={false} />
        <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 40 }}>
          <Text style={styles.mensaje}>
            {nombre} dice que cierres la AMERICANA 2 {emoji}:
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.tiempo}>Tiempo:</Text>
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.reloj}>{formatearTiempo(tiempo)}</Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.tiempoRecord}>
                Récord personal:
              </Text>
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.relojRecord}>
                {formatearTiempo(tiempoPersonal)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Tipo Ficha</Text>
            <Text style={styles.headerCell}>Cantidad</Text>
            <Text style={styles.headerCellInput}>Introducido</Text>
          </View>
          <FlatList
            scrollEnabled={true}
            data={fichas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.valor}</Text>
                <Text style={styles.cell}>{item.cantidad}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      { borderColor: bordes[item.valor] || '#000' },
                    ]}
                    keyboardType="number-pad"
                    placeholderTextColor="#888"
                    value={valoresIntroducidos[item.valor] || ''}
                    onChangeText={(text) =>
                      setValoresIntroducidos((prev) => ({
                        ...prev,
                        [item.valor]: text.replace(',', '.'),
                      }))
                    }
                    placeholder="0.00"
                  />
                </View>
              </View>
            )}
          />
          <View style={styles.footerRow}>
            <Text style={styles.footerCell}>Total:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: bordes['total'] || '#000' },
                ]}
                keyboardType="numeric"
                value={respuestaTotal}
                onChangeText={(respuestaTotal) =>
                  setRespuestaTotal(respuestaTotal)
                }
                placeholder="0.00"
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Pressable style={styles.button} onPress={reiniciar}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={mostrarRespuestas}>
            <Text style={styles.buttonText}>Respuestas</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={comprobarRespuestas}>
            <Text style={styles.buttonText}>Comprobar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mensaje: {
    fontSize: 25, textAlign: 'center', padding: 8, fontFamily: 'Merriweather-Light',
  },
  tiempo: {
    fontSize: 20, color: 'blue', textAlign: 'center', fontFamily: 'Merriweather-Light',
  },
  reloj: {
    fontSize: 24,
    color: 'blue',
    textAlign: 'center',
    padding: 2,
    fontFamily: 'Merriweather-SemiBold',

  },
  tiempoRecord: {
    fontSize: 20, color: 'red', textAlign: 'center', fontFamily: 'Merriweather-Light',
  },
  relojRecord: {
    fontSize: 24,
    color: 'red',
    textAlign: 'center',
    padding: 2,
    fontFamily: 'Merriweather-SemiBold',
  },
  table: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 5,
    alignSelf: 'center',
  },
  headerRow: { flexDirection: 'row', backgroundColor: '#ddd', padding: 10 },
  headerCell: {
    flex: 0.5, fontFamily: 'Merriweather-SemiBold', fontSize: 17,
    textAlign: 'center'
  },
  headerCellInput: { flex: 1, fontFamily: 'Merriweather-SemiBold', textAlign: 'center', fontSize: 17, },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  cell: { flex: 0.5, textAlign: 'center', fontFamily: 'Merriweather-Light', fontSize: 21 },
  footerRow: { flexDirection: 'row', padding: 10, backgroundColor: '#eee' },
  footerCell: { flex: 1, textAlign: 'center', fontFamily: 'Merriweather-SemiBold', fontSize: 24 },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    fontSize: 22,
    fontFamily: 'Merriweather-SemiBold',
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    width: '80%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: 112,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontFamily: 'Merriweather-Light', },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
});

export default Cierre;