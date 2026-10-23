import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
  ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';
import { obtenerDias, obtenerHorarios, crearCita, reagendarCita } from '../services/citaService';

const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'ClientProfile' },
];

export default function SelectDateTimeScreen({ navigation, route }) {
  const {
    servicio = 'Consulta Médica', servicioId, mascotaId, mascotaNombre, citaId,
  } = route?.params || {};

  const [dias, setDias] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [diaSel, setDiaSel] = useState(null);   // fecha ISO, ej. "2026-10-23"
  const [horaSel, setHoraSel] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // 1) Cargar los próximos días
  useEffect(() => {
    const cargarDias = async () => {
      try {
        const lista = await obtenerDias();
        setDias(lista);
        setDiaSel(lista[0].fecha);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    cargarDias();
  }, []);

  // 2) Cada vez que cambia el día, cargar los horarios libres
  useEffect(() => {
    if (!diaSel) return;
    const cargarHorarios = async () => {
      try {
        setCargando(true);
        setHoraSel(null);
        const r = await obtenerHorarios(diaSel, servicioId);
        setHorarios(r.horarios);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setCargando(false);
      }
    };
    cargarHorarios();
  }, [diaSel]);

  const confirmar = async () => {
    if (!horaSel) {
      Alert.alert('Selecciona un horario', 'Elige una hora disponible');
      return;
    }
    try {
      setGuardando(true);
      if (citaId) {
        await reagendarCita(citaId, diaSel, horaSel);
      } else {
        await crearCita({ mascotaId, servicioId, fecha: diaSel, hora: horaSel });
      }
      navigation.navigate('MyAppointments');
    } catch (error) {
      Alert.alert('No se pudo agendar', error.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fecha y Hora</Text>
        <Ionicons name="notifications-outline" size={22} color={colors.textDark} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoBar}>
          <View>
            <Text style={styles.infoLabel}>Mascota: <Text style={styles.infoBold}>{mascotaNombre}</Text></Text>
            <Text style={styles.infoSub}>{servicio}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
        </View>

        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{dias[0] ? `${dias[0].mes} ${dias[0].anio}` : ''}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textDark} />
        </View>

        <View style={styles.daysRow}>
          {dias.map((d) => {
            const active = diaSel === d.fecha;
            return (
              <TouchableOpacity
                key={d.fecha}
                style={[styles.dayBtn, active && styles.dayBtnActive]}
                onPress={() => setDiaSel(d.fecha)}
              >
                <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{d.dia}</Text>
                <Text style={[styles.dayNumber, active && styles.dayLabelActive]}>{d.numero}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
        {cargando && <ActivityIndicator color={colors.primary} style={{ marginBottom: 12 }} />}
        <View style={styles.timeGrid}>
          {horarios.map((h) => {
            const active = horaSel === h.hora;
            return (
              <TouchableOpacity
                key={h.hora}
                disabled={!h.disponible}
                style={[styles.timeBtn, active && styles.timeBtnActive, !h.disponible && styles.timeBtnDisabled]}
                onPress={() => setHoraSel(h.hora)}
              >
                <Text style={[styles.timeText, active && styles.timeTextActive]}>{h.hora}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, guardando && { opacity: 0.6 }]}
          onPress={confirmar}
          disabled={guardando}
        >
          <Text style={styles.confirmBtnText}>{citaId ? 'Reagendar Cita' : 'Confirmar Cita'}</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: colors.primary },
  container: { padding: 20, paddingTop: 4 },
  infoBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.primaryLight, borderRadius: 10, padding: 14, marginBottom: 20,
  },
  infoLabel: { fontSize: 12, color: colors.textGray },
  infoBold: { fontWeight: '700', color: colors.textDark },
  infoSub: { fontSize: 12, color: colors.primary, marginTop: 2 },
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  monthText: { fontSize: 15, fontWeight: '700', color: colors.textDark },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  dayBtn: {
    alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10,
    borderRadius: 10, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
  },
  dayBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayLabel: { fontSize: 11, color: colors.textGray },
  dayNumber: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginTop: 2 },
  dayLabelActive: { color: colors.white },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginBottom: 12 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  timeBtn: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 8,
    paddingVertical: 12, paddingHorizontal: 18, backgroundColor: colors.white,
  },
  timeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeBtnDisabled: { opacity: 0.35 },
  timeText: { fontSize: 13, color: colors.textDark, fontWeight: '500' },
  timeTextActive: { color: colors.white },
  confirmBtn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
  confirmBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
});