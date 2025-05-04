import { useState, useEffect, useContext } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { cargarDato, guardarDato } from '../../metodos/StorageUtils';
import { cargarRecord } from '../../metodos/cargarRecord';

import StreakCounter from '../../components/StreakCounter';
import Header from '../../components/Header';
import IMAGENES_CARTAS from '../../metodos/cargarImagenes';

const palos = ['S', 'H', 'D', 'C'];

class Carta {
  constructor(valor, palo) {
    this.valor = valor == 1 ? 11 : valor >= 10 ? 10 : valor;
    this.palo = palo;
    this.img = IMAGENES_CARTAS[`${valor}${palo}`];
  }
}

import actualizarRecord from '../../metodos/actualizarRecord';

import Contexto from '../../metodos/Context';
const { Context } = Contexto;

export default function BlackJackGame() {

  const nombreRecord = "RecordBlackjackGame";
  const { informacionUsuario, online } = useContext(Context);

  const [cartasJugador, setCartasJugador] = useState([]);
  const [cartasCroupier, setCartasCroupier] = useState([]);
  const [puntuacionJugador, setPuntuacionJugador] = useState(0);
  const [puntuacionCroupier, setPuntuacionCroupier] = useState(0);
  const [jugadorSePlanta, setJugadorSePlanta] = useState(true);
  const [baraja, setBaraja] = useState([]);
  const [racha, setRacha] = useState(0);
  const [record, setRecord] = useState(0);
  const [partidaActiva, setPartidaActiva] = useState(false);

  useEffect(() => {
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

  const generarBaraja = () => {
    let deck = [];
    palos.forEach((palo) => {
      for (let j = 1; j <= 13; j++) {
        deck.push(new Carta(j, palo));
      }
    });
    return deck.sort(() => Math.random() - 0.5);
  };

  const iniciarPartida = () => {
    const nuevaBaraja = generarBaraja();
    setBaraja(nuevaBaraja);
    setCartasJugador([nuevaBaraja[0], nuevaBaraja[2]]);
    setCartasCroupier([nuevaBaraja[1]]);
    let puntosJugador = calcularPuntos([nuevaBaraja[0], nuevaBaraja[2]]);

    if (puntosJugador == 21) {
      if (nuevaBaraja[1].valor != 11 && nuevaBaraja[1].valor != 10) {
        window.alert('Victoria: '+ 'BLACKJACK, que sea así toda la noche 🔥 🐼');
        setPuntuacionCroupier(nuevaBaraja[1].valor);
        setRacha((prevRacha) => {
          const nuevaRacha = prevRacha + 1;
          if (nuevaRacha > record) {
            setRecord(nuevaRacha);
          }
          return nuevaRacha;
        });
      } else {
        let puntosCrupier = calcularPuntos([nuevaBaraja[1], nuevaBaraja[3]]);
        if (puntosCrupier == 21) {
          window.alert('Empate: '+'DOBLE BLACKJACK, ESTO NO ES COMÚN 🗣🔥');
          setCartasCroupier([nuevaBaraja[1], nuevaBaraja[3]]);
        } else {
          window.alert('Victoria: '+ 'BLACKJACK, que sea así toda la noche 🔥 🐼');
          setRacha((prevRacha) => {
            const nuevaRacha = prevRacha + 1;
            if (nuevaRacha > record) {
              setRecord(nuevaRacha);
            }
            return nuevaRacha;
          });
          setCartasCroupier([nuevaBaraja[1], nuevaBaraja[3]]);
        }
        setPuntuacionCroupier(puntosCrupier);
      }
      setPuntuacionJugador(puntosJugador);
      setJugadorSePlanta(true);
      setPartidaActiva(false);
      return;
    }

    setPartidaActiva(true);
    setPuntuacionJugador(puntosJugador);
    setPuntuacionCroupier(nuevaBaraja[1].valor);
    setJugadorSePlanta(false);
    setBaraja(nuevaBaraja.slice(3));
  };

  const calcularPuntos = (cartas) => {
    let puntos = 0;
    let cantidadAses = 0;

    cartas.forEach((carta) => {
      puntos += carta.valor;
      if (carta.valor === 11) cantidadAses += 1;
    });

    while (puntos > 21 && cantidadAses > 0) {
      puntos -= 10;
      cantidadAses -= 1;
    }

    return puntos;
  };

  const pedirCarta = () => {
    if (jugadorSePlanta || baraja.length === 0) return;
    const nuevaCarta = baraja[0];
    const nuevasCartasJugador = [...cartasJugador, nuevaCarta];
    setCartasJugador(nuevasCartasJugador);
    setPuntuacionJugador(calcularPuntos(nuevasCartasJugador));
    if (calcularPuntos(nuevasCartasJugador) > 21) {
      setJugadorSePlanta(true);
      setPartidaActiva(false);
      setRacha(0);
      window.alert('Derrota: '+ '¿Te has pasado un poco no crees? 🐼');
    }
    setBaraja(baraja.slice(1));
  };

  const plantarse = () => {
    setJugadorSePlanta(true);

    let cartasCrupierTemp = [...cartasCroupier];
    let barajaTemp = [...baraja];
    let puntosCrupier = calcularPuntos(cartasCrupierTemp);

    const procesarTurnoCroupier = (index = 0) => {
      if (puntosCrupier >= 17 || barajaTemp.length === 0) {
        setCartasCroupier(cartasCrupierTemp);
        setPuntuacionCroupier(puntosCrupier);
        setBaraja(barajaTemp);

        if (puntosCrupier > 21 || puntuacionJugador > puntosCrupier) {
          window.alert('Victoria: '+ '¿Serás capaz de ganar otra vez? 🐼');
          setRacha((prevRacha) => {
            const nuevaRacha = prevRacha + 1;
            if (nuevaRacha > record) {
              setRecord(nuevaRacha);
            }
            return nuevaRacha;
          });
        } else if (cartasCrupierTemp.length == 2 && puntosCrupier == 21) {
          setRacha(0);
          window.alert(
            'Derrota: '+
            'BLACKJACK de la banca, este mes no hay propinas 🐼'
          );
        } else if (puntuacionJugador == puntosCrupier) {
          window.alert(
            'Empate: '+
            'Has tenido suerte, la próxima no tendrás tanta suerte 🐼'
          );
        } else {
          setRacha(0);
          window.alert('Derrota: '+ 'La banca siempre gana 🐼');
        }
        setPartidaActiva(false);
        return;
      }

      let nuevaCarta = barajaTemp.shift();
      cartasCrupierTemp.push(nuevaCarta);
      puntosCrupier = calcularPuntos(cartasCrupierTemp);

      setCartasCroupier(cartasCrupierTemp);
      setPuntuacionCroupier(puntosCrupier);
      setBaraja(barajaTemp);

      setTimeout(() => {
        procesarTurnoCroupier(index + 1);
      }, 500);
    };

    procesarTurnoCroupier();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <Header backVisible={false} />
          <View style={styles.body}>
            <Text style={styles.paragraph}>BLACKJACK</Text>

            {puntuacionJugador != 0 && (
              <>
                <View style={styles.cartasContainer}>
                  {cartasJugador.map((carta, index) => (
                    <Image
                      key={index}
                      source={carta.img}
                      style={styles.carta}
                    />
                  ))}
                </View>
                <Text style={styles.paragraph}>
                  Tu puntuación: {puntuacionJugador}
                </Text>
              </>
            )}

            <Pressable
              onPress={iniciarPartida}
              style={({ pressed }) => [
                styles.button,
                partidaActiva && styles.buttonDisabled,
                pressed && !partidaActiva && styles.buttonPressed,
              ]}
              disabled={partidaActiva}>
              <Text style={styles.buttonText}>Iniciar Partida</Text>
            </Pressable>

            <Pressable
              onPress={pedirCarta}
              style={({ pressed }) => [
                styles.button,
                jugadorSePlanta && styles.buttonDisabled,
                pressed && !jugadorSePlanta && styles.buttonPressed,
              ]}
              disabled={jugadorSePlanta}>
              <Text style={styles.buttonText}>Pedir Carta</Text>
            </Pressable>

            <Pressable
              onPress={plantarse}
              style={({ pressed }) => [
                styles.button,
                jugadorSePlanta && styles.buttonDisabled,
                pressed && !jugadorSePlanta && styles.buttonPressed,
              ]}
              disabled={jugadorSePlanta}>
              <Text style={styles.buttonText}>Plantarse</Text>
            </Pressable>

            {puntuacionJugador != 0 && (
              <>
                <View style={styles.cartasContainer}>
                  {cartasCroupier.map((carta, index) => (
                    <Image
                      key={index}
                      source={carta.img}
                      style={styles.carta}
                    />
                  ))}
                </View>
                <Text style={styles.paragraph}>
                  Puntos Croupier: {puntuacionCroupier}
                </Text>
              </>
            )}
          </View>
          <StreakCounter racha={racha} record={record} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  body: {
    flex: 8,
    alignItems: 'center',
    marginTop: 45
  },
  paragraph: {
    marginTop: 20,
    fontSize: 28,
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
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonPressed: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
  },
  cartasContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  carta: {
    width: 60,
    height: 90,
    margin: 5,
  },
});