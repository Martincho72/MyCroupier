import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Image,
} from 'react-native';

import HeaderMainMenu from '../components/HeaderMainMenu';

export default function Home(props) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMainMenu />
      <View style={{ flex: 5 }}>
        <View style={styles.containerWelcome}>
          <Image
            style={styles.logo}
            source={require('../assets/logoV2.webp')}></Image>
        </View>
        <View style={styles.containerButtons}>
          <View>
            <Pressable
              onPress={() => props.navigation.navigate('Tab_Ruleta')}
              style={styles.button}>
              <Text style={styles.buttonText}>Ruleta</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => props.navigation.navigate('Tab_BlackJack')}
              style={styles.button}>
              <Text style={styles.buttonText}>Blackjack</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => props.navigation.navigate('Clasificacion')}
              style={styles.button}>
              <Text style={styles.buttonText}>Clasificación</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
  },
  containerWelcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  containerButtons: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  paragraph: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Merriweather-SemiBold',
  },
  button: {
    backgroundColor: 'black',
    width: 300,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merriweather-Light',
  },
  logo: {
    height: 250,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10
  },
});