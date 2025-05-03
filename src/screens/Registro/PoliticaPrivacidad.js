import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const PoliticaPrivacidad = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header homeVisible={false}/>
        <Text style={styles.title}>POLÍTICA DE PRIVACIDAD</Text>

        <View style={styles.card}>
          <Text style={styles.introText}>
            Tu privacidad es nuestra prioridad. Protegemos tus datos y solo los utilizamos de acuerdo
            con nuestra política. Consulta nuestros términos de uso para más información.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Recopilación de información</Text>
          <Text style={styles.sectionText}>
            Cuando usas nuestra aplicación, podemos recopilar información automáticamente o de manera
            voluntaria, como datos personales proporcionados por el usuario (nombre, correo
            electrónico, número de teléfono) y datos de uso del dispositivo (dirección IP, tipo de
            dispositivo, versión del sistema operativo y patrones de navegación dentro de la
            aplicación).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Uso de la información</Text>
          <Text style={styles.sectionText}>
            La información recopilada se utiliza para mejorar la funcionalidad de la aplicación,
            proporcionar soporte técnico, personalizar la experiencia del usuario y, en algunos casos,
            enviar notificaciones relevantes. No compartiremos ni venderemos tu información a terceros
            sin tu consentimiento, excepto cuando lo exija la ley.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Almacenamiento y Seguridad</Text>
          <Text style={styles.sectionText}>
            Implementamos medidas de seguridad adecuadas para proteger tu información contra el
            acceso, alteración o divulgación no autorizados. Sin embargo, ninguna transmisión de datos
            a través de Internet o almacenamiento electrónico es completamente segura, por lo que no
            podemos garantizar una seguridad absoluta.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Permisos de la Aplicación</Text>
          <Text style={styles.sectionText}>
            Nuestra aplicación puede solicitar permisos para acceder a ciertas funciones del
            dispositivo, como la cámara, el micrófono, la ubicación o el almacenamiento, únicamente
            cuando sea necesario para ofrecer las funcionalidades del servicio. El acceso a estos
            datos se realiza de manera transparente y siempre con el consentimiento previo del usuario.
            Puedes gestionar o revocar estos permisos en cualquier momento a través de la configuración
            de tu dispositivo.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Última actualización: {new Date().getFullYear()}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    marginTop: 35,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  footer: {
    marginTop: 10,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerText: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 14,
  },
});

export default PoliticaPrivacidad;