import React from 'react';
import { View, StyleSheet, Modal, StatusBar, Platform, Image } from 'react-native';

// Solo importa FastImage si no estamos en la web
let FastImage;
if (Platform.OS !== 'web') {
  FastImage = require('react-native-fast-image').default;
}

const LoadingScreen = () => {
  return (
    <Modal transparent={true} visible={true} animationType="fade" statusBarTranslucent>
      <StatusBar backgroundColor="rgba(255, 255, 255, 0.9)" barStyle="dark-content" />
      <View style={styles.overlay}>
        {Platform.OS !== 'web' ? (
          <FastImage
            source={require('../assets/loading.gif')}
            style={styles.image}
          />
        ) : (
          <Image
            source={require('../assets/loading.gif')}
            style={styles.image}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default LoadingScreen;