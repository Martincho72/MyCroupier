export const actualizarRecord = async (nombreR, id_usu, record, tok) => {
  const url = 'https://api.mycroupier.duckdns.org/CroupierAPI/saveRecord';

  const datos = {
    nombreRecord: nombreR,
    id_usuario: id_usu,
    puntuacion: record,
    token: tok
  };

  try {
    console.log('Enviando datos:', datos);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const respuesta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const resultado = await respuesta.json();

    console.log('Respuesta cruda:', respuesta.status, resultado);

    if (!respuesta.ok) {
      Alert.alert('Error al actualizar récord', resultado.message || 'Error Desconocido.');
      return;
    }

    console.log('Resultado exitoso:', resultado);

  } catch (error) {
    console.error('Error en la petición:', error);
    let mensaje = 'Error inesperado.';

    if (error.name === 'AbortError') {
      mensaje = 'La conexión tardó demasiado.';
    } else if (error.message === 'Network request failed') {
      mensaje = 'No se pudo conectar al servidor.';
    }

    Alert.alert('Error al actualizar récord', mensaje);
  }
};
export default actualizarRecord;