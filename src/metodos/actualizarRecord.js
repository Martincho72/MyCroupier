export const actualizarRecord = async (nombreR, id_usu, record, tok) => {
  const url = 'http://54.237.169.52:8080/CroupierAPI/saveRecord';

  const datos = {
    nombreRecord: nombreR,
    id_usuario: id_usu,
    puntuacion: record,
    token: tok
  };

  try {
    console.log('Enviando datos:', datos);

    const respuesta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    const resultado = await respuesta.json();

    console.log('Respuesta cruda:', respuesta.status, resultado);

    if (!respuesta.ok) {
      Alert.alert('Error al actualizar récord', resultado.message || 'Error Desconocido.');
      return;
    }

    console.log('Resultado exitoso:', resultado);

  } catch (error) {
    console.error('Error en la petición:', error);
    Alert.alert('Error al actualizar récord', error.message || 'Error inesperado.');
  }
};
export default actualizarRecord;