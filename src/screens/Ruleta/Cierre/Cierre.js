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
} from 'react-native';

import {
  nombreAleatorio,
  comprobarEmoji,
  getRandomInt,
  devolverMensaje,
} from '../../../metodos/UtilsCierre';

import { cargarDato, guardarDato } from '../../../metodos/StorageUtils';
import DigitInputRow from '../../../components/DigitInputRow';
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
  const [respuestaTotal, setRespuestaTotal] = useState('');
  const [bordes, setBordes] = useState({});
  const [tiempoPersonal, setTiempoPersonal] = useState(0);

  const [fichas, setFichas] = useState([
    { valor: 10000, cantidad: getRandomInt(1, 5) },
    { valor: 500, cantidad: getRandomInt(5, 40) },
    { valor: 100, cantidad: getRandomInt(15, 100) },
    { valor: 50, cantidad: getRandomInt(30, 100) },
    { valor: 25, cantidad: getRandomInt(30, 100) },
    { valor: 10, cantidad: getRandomInt(40, 100) },
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
    const min = Math.floor(segundos / 60).toString().padStart(2, '0');
    const sec = (segundos % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const total = fichas.reduce((acc, ficha) => acc + ficha.valor * ficha.cantidad, 0);

  const reiniciar = () => {
    let nuevoNombre = -1;
    do {
      nuevoNombre = getRandomInt(0, 3);
    } while (nuevoNombre == numeroAleatorio);
    let nom = nombreAleatorio(nuevoNombre);
    setNumeroAleatorio(nuevoNombre);
    setNombre(nom);
    setEmoji(comprobarEmoji(nom));
    setTiempo(0);
    setCorriendo(true);
    setRespuestaTotal('');
    setValoresIntroducidos({});
    setBordes({});
    setFichas([
      { valor: 10000, cantidad: getRandomInt(1, 5) },
      { valor: 500, cantidad: getRandomInt(5, 40) },
      { valor: 100, cantidad: getRandomInt(15, 65) },
      { valor: 50, cantidad: getRandomInt(30, 100) },
      { valor: 25, cantidad: getRandomInt(30, 100) },
      { valor: 10, cantidad: getRandomInt(40, 100) },
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
      respuestas[ficha.valor] = respuestaCorrecta.padStart(9, "\u00A0");
      totalRespuesta += parseFloat(respuestaCorrecta);
    });

    setValoresIntroducidos(respuestas);
    setTiempo(900);
    setRespuestaTotal(total.toFixed(2).padStart(9, "\u00A0"));
  };

  const comprobarRespuestas = () => {
    let todasCorrectas = true;
    let nuevosBordes = {};

    if (Object.keys(valoresIntroducidos).length < 9) {
      web.alert('Cuidado', 'Rellena todos los campos antes de comprobar');
      return;
    }

    fichas.forEach((ficha) => {
      console.log(valoresIntroducidos);
      const arrayFichas = valoresIntroducidos[ficha.valor].toString();

      let valorIntroducido;

      if (arrayFichas.includes(",")) {
        const nuevosValores = valoresIntroducidos[ficha.valor].map((valor, index,) => {
          if (valor === "" || valor == null) {
            return "";
          }

          if (index == 5) {
            return valor + ".";
          }

          return valor;

        })
        console.log("NUEVOS VALORES: " + parseFloat(nuevosValores.toString().replace(/,/g, "").replace(/" "/), ""));
        valorIntroducido = parseFloat(nuevosValores.toString().replace(/,/g, "").replace(/" "/), "");

      } else {
        valorIntroducido = parseFloat(valoresIntroducidos[ficha.valor]) || 0;
      }
      const valorCorrecto = parseFloat(ficha.valor * ficha.cantidad);
      console.log(valorIntroducido);
      console.log(valorCorrecto);

      if (valorIntroducido === valorCorrecto) {
        nuevosBordes[ficha.valor] = 'green';
      } else {
        nuevosBordes[ficha.valor] = 'red';
        todasCorrectas = false;
      }
    });

    console.log(respuestaTotal);
    console.log(total);

    let respuestaTotalConvertida = respuestaTotal.toString();
    if (respuestaTotalConvertida.includes(",")) {
      const nuevosValores = respuestaTotal.map((valor, index,) => {
        if (valor === "" || valor == null) {
          return "";
        }

        if (index == 5) {
          return valor + ".";
        }

        return valor;

      })
      console.log("NUEVOS VALORES: " + parseFloat(nuevosValores.toString().replace(/,/g, "").replace(/" "/), ""));
      respuestaTotalConvertida = parseFloat(nuevosValores.toString().replace(/,/g, "").replace(/" "/), "");
    } else {
      respuestaTotalConvertida = respuestaTotal
    }


    if (respuestaTotalConvertida == total) {
      nuevosBordes['total'] = 'green';
    } else {
      nuevosBordes['total'] = 'red';
      todasCorrectas = false;
    }

    setBordes(nuevosBordes);




    if (todasCorrectas && respuestaTotalConvertida == total) {
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
      window.alert('Error: ' + 'Revisa los campos en rojo');
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

        <ScrollView horizontal={true}
          style={{ marginTop: 10, flexGrow: 0, width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ minWidth: 530 }}>
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
                      <DigitInputRow
                        value={valoresIntroducidos[item.valor] || ''}
                        onChange={(val) =>
                          setValoresIntroducidos((prev) => ({
                            ...prev,
                            [item.valor]: val,
                          }))
                        }
                        borderColor={bordes[item.valor]}
                      />
                    </View>
                  </View>
                )}
              />
              <View style={styles.footerRow}>
                <Text style={styles.footerCell}>Total:</Text>
                <View style={styles.inputContainer}>
                  <DigitInputRow
                    value={respuestaTotal}
                    onChange={(val) => setRespuestaTotal(val)}
                    borderColor={bordes['total'] || '#000'}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>


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
  container: { flex: 1, backgroundColor: 'white' },
  scrollContainer: { flex: 1, backgroundColor: '#fcfcfc' },
  mensaje: { fontSize: 25, textAlign: 'center', padding: 8, fontFamily: 'Merriweather-Light' },
  tiempo: { fontSize: 20, color: 'blue', textAlign: 'center', fontFamily: 'Merriweather-Light' },
  reloj: { fontSize: 24, color: 'blue', textAlign: 'center', fontFamily: 'Merriweather-SemiBold' },
  tiempoRecord: { fontSize: 20, color: 'red', textAlign: 'center', fontFamily: 'Merriweather-Light' },
  relojRecord: { fontSize: 24, color: 'red', textAlign: 'center', fontFamily: 'Merriweather-SemiBold' },

  table: {
    minWidth: 530,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
  },

  headerRow: { flexDirection: 'row', backgroundColor: '#ddd', padding: 10 },
  headerCell: {
    width: 100,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
  },
  headerCellInput: {
    width: 280,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
  },

  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  cell: {
    width: 100,
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
  },
  footerRow: { flexDirection: 'row', padding: 10, backgroundColor: '#eee' },
  footerCell: {
    width: 200,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
  },
  inputContainer: {
    width: 280,
    alignItems: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: 112,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontFamily: 'Merriweather-Light' },
});

export default Cierre;