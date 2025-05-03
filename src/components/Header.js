import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const navigation = useNavigation();

  const { backVisible = true, backAction = () => navigation.goBack() } = props;
  const { homeVisible = true, homeAction = () => navigation.navigate('Home') } = props;

  return (
    <View style={styles.header}>
      <View style={styles.back}>
        {backVisible && (
          <Pressable onPress={backAction} style={{
            width: 60,
            height: 60
          }}>
            <Image source={require('../assets/izquierda.webp')} style={styles.icon} />
          </Pressable>
        )}
      </View>
      <View style={styles.home}>
        {homeVisible &&
          (<Pressable onPress={homeAction} style={{
            width: 80,
            height: 80
          }}>
            <Image source={require('../assets/logoV2.webp')} style={styles.logo} />
          </Pressable>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  back: {
    flex: 1,
    width: 80,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    marginTop: 35,
  },
  logo: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginTop: 35,
    borderRadius: 10
  },
  home: {
    flex: 1,
    width: 80,
    alignItems: 'flex-end',
  },
});

export default Header;