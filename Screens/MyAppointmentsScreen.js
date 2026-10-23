import React, { useCallback, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
  ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';
import { obtenerCitas, cancelarCita } from '../services/citaService';

const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'ClientProfile' },
];

const estiloEstado = (estado) => {
  if (estado === 'Confirmada') return [styles.badgeWarning, styles.badgeTextWarning];
  if (estado === 'Cancelada') return [styles.badgeDanger, styles.badgeTextDanger];
  return [styles.badgeSuccess, styles.badgeTextSuccess];
};

export default function MyAppointmentsScreen({ navigation }) {
  const [tab, setTab] = useState('proximas');
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async (tipo) => {
    try {
      setCargando(true);
      setData(await obtenerCitas(tipo));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setCargando(false);
    }
  };

  // Se ejecuta al enfocar la pantalla y cada vez que cambia la pestaña
  useFocusEffect(
    useCallback(() => {
      cargar(tab);
    }, [tab])
  );

  const cancelar = (cita) =>
    Alert.alert('Cancelar cita', `¿Cancelar la cita de ${cita.mascotaNombre}?`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelarCita(cita.id);
            await cargar(tab);
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);

  const reagendar = (c) =>
    navigation.navigate('SelectDateTime', {
      citaId: c.id,
      servicio: c.servicio,
      servicioId: c.servicioId,
      mascotaId: c.mascotaId,
      mascotaNombre: c.mascotaNombre,
    });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Citas</Text>
        <Ionicons name="notifications-outline" size={22} color={colors.textDark} />
      </View>

      <View style={styles.segmentWrap}>
        <TouchableOpacity
          style={[styles.segmentBtn, tab === 'proximas' && styles.segmentBtnActive]}
          onPress={() => setTab('proximas')}
        >
          <Text style={[styles.segmentText, tab === 'proximas' && styles.segmentTextActive]}>Próximas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, tab === 'historial' && styles.segmentBtnActive]}
          onPress={() => setTab('historial')}
        >
          <Text style={[styles.segmentText, tab === 'historial' && styles.segmentTextActive]}>Historial</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {cargando && <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />}
        {!cargando && data.length === 0 && (
          <Text style={styles.dateText}>No hay citas para mostrar.</Text>
        )}

        {data.map((c) => {
          const [badgeStyle, badgeTextStyle] = estiloEstado(c.estado);
          return (
            <View key={c.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.petName}>{c.mascota}</Text>
                <View style={[styles.badge, badgeStyle]}>
                  <Text style={[styles.badgeText, badgeTextStyle]}>{c.estado}</Text>
                </View>
              </View>
              <Text style={styles.serviceText}>{c.servicio}</Text>
              <Text style={styles.dateText}>{c.fecha}</Text>
              <Text style={styles.doctorText}>{c.doctor}</Text>

              {tab === 'proximas' && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.rescheduleBtn} onPress={() => reagendar(c)}>
                    <Text style={styles.rescheduleText}>Reagendar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelar(c)}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <BottomTabBar
        tabs={CLIENT_TABS}
        activeKey="Citas"
        onPress={(key) => navigation.navigate(CLIENT_TABS.find((t) => t.key === key).route)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
  segmentWrap: { flexDirection: 'row', backgroundColor: colors.primaryLight, borderRadius: 10, padding: 4, marginHorizontal: 20, marginBottom: 16 },
  segmentBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: colors.white },
  segmentText: { color: colors.primary, fontWeight: '500', fontSize: 13 },
  segmentTextActive: { fontWeight: '700' },
  container: { paddingHorizontal: 20 },
  card: { backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  petName: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeWarning: { backgroundColor: colors.warningLight },
  badgeSuccess: { backgroundColor: colors.successLight },
  badgeDanger: { backgroundColor: colors.dangerLight },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeTextWarning: { color: colors.warning },
  badgeTextSuccess: { color: colors.success },
  badgeTextDanger: { color: colors.danger },
  serviceText: { color: colors.primary, fontSize: 13, fontWeight: '600', marginBottom: 8 },
  dateText: { fontSize: 12, color: colors.textGray, marginBottom: 2 },
  doctorText: { fontSize: 12, color: colors.textGray, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  rescheduleBtn: { flex: 1, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  rescheduleText: { color: colors.primary, fontWeight: '600', fontSize: 12 },
  cancelBtn: { flex: 1, borderWidth: 1, borderColor: colors.danger, borderRadius: 8, paddingVertical: 8, alignItems: 'center', backgroundColor: colors.dangerLight },
  cancelText: { color: colors.danger, fontWeight: '600', fontSize: 12 },
});