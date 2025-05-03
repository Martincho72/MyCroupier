export const nombreAleatorio = (numeroAleatorio) => {
  let nom = '';

  switch (numeroAleatorio) {
    case 0:
      nom = 'Sandro';
      break;
    case 1:
      nom = 'Rafa';
      break;
    case 2:
      nom = 'Verzo';
      break;
    case 3:
      nom = 'Laura';
      break;
    case 4:
      nom = 'Goyo';
      break;
    default:
      nom = 'Sandro';
      break;
  }

  return nom;
};

export const comprobarEmoji = (nombre) => {
  let emoji = '';

  switch (nombre) {
    case 'Sandro':
      emoji = '😝';
      break;
    case 'Rafa':
      emoji = '🫨';
      break;
    case 'Verzo':
      emoji = '😎';
      break;
    case 'Laura':
      emoji = '🫣';
      break;
    case 'Goyo':
      emoji = '🐻‍❄️';
      break;
    default:
      emoji = 'Sandro';
      break;
  }

  return emoji;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const devolverMensaje = (nombre, tiempo) => {
  let mensaje = 'Bien hecho';
  switch (nombre) {
    case 'Sandro':
      if (tiempo < 140) {
        mensaje = 'INCREIBLE HERMAN@ 🗣🔥, mereces un ascenso';
      } else if (tiempo < 190) {
        mensaje = 'Muy bien hecho, aunque sé que lo puedes hacer mejor 😎';
      } else if (tiempo < 240) {
        mensaje = 'Bien, pero los he visto más rápidos. 🐌';
      } else {
        mensaje = 'No está mal, pero quiero irme antes de las 05:00 💀';
      }
      break;
    case 'Rafa':
      if (tiempo < 140) {
        mensaje = 'Muy bien, muy bien hecho, demasiado bien... 🐧';
      } else if (tiempo < 190) {
        mensaje = 'Bastante rápido, pero muñones lo es más 🤐';
      } else if (tiempo < 240) {
        mensaje = 'Nivel estándar por lo que veo...';
      } else {
        mensaje = 'Un poco más y me jubilo antes de que acabes, eh 😒';
      }
      break;
    case 'Verzo':
      if (tiempo < 140) {
        mensaje = 'Jolines que rápido, puedes irte ya a casa 😊';
      } else if (tiempo < 190) {
        mensaje = 'Rápido y conciso, aunque puedes mejorar un poco 🙂';
      } else if (tiempo < 240) {
        mensaje = 'Aprendes rápido, práctica más y serás veloz 🥳';
      } else {
        mensaje = 'Está bien, pero hay que darle un poco al acelerador 😓';
      }
      break;
    case 'Laura':
      if (tiempo < 140) {
        mensaje =
          '¡Lo has hecho muy rápido! Ahora tienes más tiempo para hacer cartas 😁';
      } else if (tiempo < 190) {
        mensaje =
          'Si hubiera un top 3, estarías en la segunda posición, muy bien. 😌';
      } else if (tiempo < 240) {
        mensaje = 'Bien, aunque vas un poco chafando huevos 🐔';
      } else {
        mensaje = 'No está mal, ya lo harás más rápido a la próxima 😅';
      }
      break;
    case 'Goyo':
      if (tiempo < 140) {
        mensaje = '¡Excelente, tú ser el guerrero del Dragón! 🐻‍❄️';
      } else if (tiempo < 190) {
        mensaje = 'Muy bien, tú ser el escudero del Dragón 🐻‍❄️';
      } else if (tiempo < 240) {
        mensaje = 'Bien, tú ser aprendiz del Dragón 🐻‍❄️';
      } else {
        mensaje = 'Tú no ser el guerrero del Dragón... 🐻‍❄️';
      }
      break;
    default:
      break;
  }

  return mensaje;
};
