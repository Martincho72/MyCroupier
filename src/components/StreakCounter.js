import { View, Text, StyleSheet, Image } from 'react-native';

const StreakCounter = ({ racha, record }) => {
  return (
    <View style={styles.streak}>
      <View style={styles.rachaConIcono}>
        <Text style={styles.textRacha}> Racha: {racha} </Text>
        {racha === record && racha != 0 && (
          <Image
            source={require('../assets/fueguito.gif')}
            style={styles.fueguito}
          />
        )}
      </View>
      <View style={styles.racha}>
        <Text style={styles.textRacha}> Récord: {record} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  streak: {
    flex: 0.5,
    flexDirection: 'row',
  },
  racha: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rachaConIcono: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRacha: {
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
  },
  fueguito: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default StreakCounter;
