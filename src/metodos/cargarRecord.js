import getData from './services';

export const cargarRecord = async (token, nombreRecord, id_usuario, setRecord) => {
    const url = `https://api.mycroupier.duckdns.org/CroupierAPI/getRecordEspecifico?token=${token}&nombreRecord=${nombreRecord}&id_usuario=${id_usuario}`;
    try {
        const data = await getData(url);
        console.log("datos: ", data);
        const clasifications = data;

        if (clasifications != undefined) {
            setRecord(clasifications.puntuacion);
        } else {
            setRecord(0);
        }

    } catch {
        console.log("Error al cargar el record:");
        setRecord(0);
    }
};
export default cargarRecord;