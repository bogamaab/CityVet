import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'Login' },
];

const dias = [
  { dia: 'Lun', numero: 23 }, { dia: 'Mar', numero: 24 }, { dia: 'Mié', numero: 25 },
  { dia: 'Jue', numero: 26 }, { dia: 'Vie', numero: 27 }, { dia: 'Sáb', numero: 28 },
];

const horarios = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00'];

export default function SelectDateTimeScreen({ navigation, route }) {
  const servicio = route?.params?.servicio || 'Consulta Médica';
  const [diaSel, setDiaSel] = useState(24);
  const [horaSel, setHoraSel] = useState('10:00');

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
            <Text style={styles.infoLabel}>Mascota: <Text style={styles.infoBold}>Max</Text></Text>
            <Text style={styles.infoSub}>{servicio}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
        </View>

        <View style={styles.monthRow}>
          <Text style={styles.monthText}>Octubre 2024</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textDark} />
        </View>

        <View style={styles.daysRow}>
          {dias.map((d) => {
            const active = diaSel === d.numero;
            return (
              <TouchableOpacity
                key={d.numero}
                style={[styles.dayBtn, active && styles.dayBtnActive]}
                onPress={() => setDiaSel(d.numero)}
              >
                <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{d.dia}</Text>
                <Text style={[styles.dayNumber, active && styles.dayLabelActive]}>{d.numero}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
        <View style={styles.timeGrid}>
          {horarios.map((h) => {
            const active = horaSel === h;
            return (
              <TouchableOpacity
                key={h}
                style={[styles.timeBtn, active && styles.timeBtnActive]}
                onPress={() => setHoraSel(h)}
              >
                <Text style={[styles.timeText, active && styles.timeTextActive]}>{h}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.navigate('MyAppointments')}>
          <Text style={styles.confirmBtnText}>Confirmar Cita</Text>
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
  timeText: { fontSize: 13, color: colors.textDark, fontWeight: '500' },
  timeTextActive: { color: colors.white },
  confirmBtn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
  confirmBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
});