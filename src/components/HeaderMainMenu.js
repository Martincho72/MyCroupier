import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import Contexto from '../metodos/Context';
const { Context } = Contexto;

const HeaderMainMenu = (props) => {
  const navigation = useNavigation();
  const { informacionUsuario, online, setOnline, setInformacionUsuario } = useContext(Context);

  const cerrarSesion = async () => {
    if (!informacionUsuario?.token) {
      console.warn('Token no disponible');
      return;
    }

    const url = `https://api.mycroupier.duckdns.org/CroupierAPI/logout?token=${informacionUsuario.token}`;

    try {
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!respuesta.ok) {
        console.warn('Logout fallido con status:', respuesta.status);
        return;
      }

      console.log('Logout exitoso (204 No Content)');

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const { backVisible = true, backAction = () => {
    if (online) {
      cerrarSesion();
      setOnline(false);
      setInformacionUsuario(null);
    }
    navigation.navigate('LogIn');
  } } = props;
  const { homeVisible = true, homeAction = () => navigation.navigate('AboutApp') } = props;

  return (
    <View style={styles.header}>
      <View style={styles.back}>
        {backVisible && (
          <Pressable onPress={backAction} style={{
            width: 80,
            height: 80,
          }}>
            <Image source={require('../assets/logout.webp')} style={styles.icon} />
          </Pressable>
        )}
      </View>
      <View style={styles.home}>
        {homeVisible &&
          (<Pressable onPress={homeAction} style={{
            width: 80,
            height: 80,
          }}>
            <Image source={require('../assets/info.webp')} style={styles.logo} />
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
    width: 50,
    height: 50,
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

export default HeaderMainMenu;