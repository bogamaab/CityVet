import React, { useCallback, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
  ActivityIndicator, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { obtenerAgenda } from '../services/vetService';

const VET_TABS = [
  { key: 'Control', label: 'Control', icon: 'grid-outline', route: 'VetPanel' },
  { key: 'Pacientes', label: 'Pacientes', icon: 'paw-outline', route: 'PetProfile' },
  { key: 'Perfil', label: 'Mi Perfil', icon: 'person-outline', route: 'VetAccount' },
];

export default function VetPanelScreen({ navigation }) {
  const { usuario } = useAuth();
  const [agenda, setAgenda] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const cargar = async () => {
        try {
          setCargando(true);
          const respuesta = await obtenerAgenda();
          setAgenda(respuesta.citas);
          setTitulo(respuesta.titulo);
        } catch (error) {
          Alert.alert('Error', error.message);
        } finally {
          setCargando(false);
        }
      };
      cargar();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerSmall}>Agenda del Día</Text>
            <Text style={styles.headerTitle}>{usuario?.nombre}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.weekLink}>Semana</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dateText}>{titulo}</Text>

        <View style={{ marginTop: 16 }}>
          {cargando && <ActivityIndicator color={colors.primary} />}
          {!cargando && agenda.length === 0 && (
            <Text style={styles.agendaDetalle}>No tienes citas programadas.</Text>
          )}

          {agenda.map((item) => (
            <View
              key={item.id}
              style={[
                styles.agendaCard,
                { borderLeftColor: item.critico ? colors.danger : colors.primary },
              ]}
            >
              <View>
                <Text style={styles.agendaHora}>{item.hora}</Text>
                <Text style={styles.agendaHoraFin}>{item.horaFin}</Text>
              </View>
              <View style={styles.agendaInfo}>
                <Text style={styles.agendaMascota}>{item.mascota}</Text>
                <Text style={styles.agendaDetalle}>{item.detalle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar
        tabs={VET_TABS}
        activeKey="Control"
        onPress={(key) => navigation.navigate(VET_TABS.find((t) => t.key === key).route)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerSmall: { fontSize: 12, color: colors.textGray, marginBottom: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
  weekLink: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  dateText: { fontSize: 13, color: colors.textDark, marginTop: 12, fontWeight: '500' },
  agendaCard: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 10,
    borderLeftWidth: 4, padding: 14, marginBottom: 12, gap: 16,
    borderWidth: 1, borderColor: colors.border,
  },
  agendaHora: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  agendaHoraFin: { fontSize: 11, color: colors.textGray },
  agendaInfo: { justifyContent: 'center' },
  agendaMascota: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  agendaDetalle: { fontSize: 12, color: colors.textGray, marginTop: 2 },
});