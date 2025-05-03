import { View, Text, StyleSheet } from 'react-native';

const StreakCounter = ({ racha, record }) => {
  return (
    <View style={styles.streak}>
      <View style={styles.racha}>
        <Text style={styles.textRacha}> Racha: {racha} </Text>
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
  },
  textRacha: {
    fontSize: 21,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Merriweather-Light',
  },
});

export default StreakCounter;
