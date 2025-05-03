import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useContext, useEffect } from 'react';
import CLASIFICACIONES from '../../metodos/UtilsClasificacion';
import Header from '../../components/Header';
import Contexto from '../../metodos/Context';
const { Context } = Contexto;
import getData from '../../metodos/services';

import LoadingScreen from '../LoadingScreen';

export default function Clasificacion() {
    const [loading, setLoading] = useState(false);
    const { informacionUsuario, online } = useContext(Context);
    const [clasification, setClasification] = useState([]);

    const [selectedSection, setSelectedSection] = useState('RecordBlackjackPaga');

    const obtenerClasificaciones = async () => {
        try {
            setLoading(true);

            const timeout = 25000;

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Tiempo de espera agotado")), timeout)
            );

            const url = `http://54.237.169.52:8080/CroupierAPI/getRecords?token=${informacionUsuario.token}&nombreRecord=${selectedSection}`;

            const data = await Promise.race([getData(url), timeoutPromise]);

            console.log(data.results);
            const clasifications = data.results;
            setClasification(clasifications);
        } catch (error) {
            console.error('Error al obtener clasificaciones:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const primeraLetraMayuscula = (str) => {
        return str.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()).join(' ');
    }

    useEffect(() => {
        setClasification([]);
        if (online) {
            obtenerClasificaciones();
        }
    }, [selectedSection]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <SafeAreaView style={styles.container}>
                <Header backVisible={false} />
                <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 90 }}> {/* Aumenta el marginTop aquí */}
                    <Text style={styles.title}>CLASIFICACIÓN</Text>

                    {!online && <Text style={styles.advisor}>¡Accede con una cuenta para poder ver las clasificaciones!</Text>
                    }

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionText}>Sección:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedSection}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedSection(itemValue)}
                            >
                                {CLASIFICACIONES.map((item) => (
                                    <Picker.Item
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}
                                        style={{ fontFamily: 'Merriweather-Light', fontSize: 19 }}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 4 }}>
                    <View style={styles.table}>
                        <View style={styles.headerRow}>
                            <Text style={styles.positionCell}>Posición</Text>
                            <Text style={styles.userCell}>Usuario</Text>
                            <Text style={styles.recordCell}>Récord</Text>
                        </View>

                        <FlatList
                            scrollEnabled={false}
                            data={clasification}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                let backgroundColor = 'white';

                                if (index === 0) backgroundColor = '#FFD700';
                                else if (index === 1) backgroundColor = '#C0C0C0';
                                else if (index === 2) backgroundColor = '#CD7F32';

                                return (
                                    <View style={[styles.row, { backgroundColor }]}>
                                        <Text style={styles.positionCell}>{(index + 1).toString()}</Text>
                                        <Text style={styles.userCell}>{primeraLetraMayuscula(item.nombreUsuario)}</Text>
                                        <Text style={styles.recordCell}>{item.puntuacion}</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
                {loading && <LoadingScreen />}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fcfcfc',
    },
    title: {
        flex: 1,
        fontSize: 38,
        fontFamily: 'Merriweather-SemiBold',
        textAlign: 'center',
        marginBottom: 15,
    },
    advisor: {
        flex: 1,
        fontSize: 25,
        padding: 10,
        fontFamily: 'Merriweather-SemiBold',
        textAlign: 'center',
    },
    sectionContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginVertical: 0, 
    },
    sectionText: {
        fontSize: 25,
        fontFamily: 'Merriweather-Light',
        marginRight: 10, 
        textAlign: "right",
    },
    pickerContainer: {
        minWidth: 230,
        maxWidth: 255,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
    },
    picker: {
        backgroundColor: 'white',
        color: 'black',
        height: 60,
    },
    table: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        paddingVertical: 10,
        textAlign: "center",
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    positionCell: {
        flex: 0.45,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Merriweather-Light',
    },
    userCell: {
        flex: 1.2,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Merriweather-Light',
    },
    recordCell: {
        flex: 0.7,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Merriweather-Light',
    },
});
