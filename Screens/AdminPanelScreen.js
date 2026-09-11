import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const ADMIN_TABS = [
  { key: 'Panel', label: 'Panel', icon: 'grid-outline', route: 'AdminPanel' },
  { key: 'Especialistas', label: 'Especialistas', icon: 'people-outline', route: 'AdminPanel' },
  { key: 'Config', label: 'Config', icon: 'settings-outline', route: 'AdminPanel' },
];

const especialistas = [
  { id: '1', nombre: 'Dra. Clara Fuentes', area: 'Cirugía General', ubicacion: 'Quirófano A' },
  { id: '2', nombre: 'Dr. Fernando Ruiz', area: 'Consulta & Grooming', ubicacion: 'Consultorio 2' },
  { id: '3', nombre: 'Dra. Julia Santos', area: 'Exámenes & Lab', ubicacion: 'Laboratorio B' },
];

const recursos = [
  { id: '1', nombre: 'Rayos X - Quirófano 1', estado: 'DISPONIBLE', ok: true },
  { id: '2', nombre: 'Ultrasonido portátil', estado: 'EN USO (Sala 3)', ok: false },
];

export default function AdminPanelScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerSmall}>Panel de Administración</Text>
        <Text style={styles.headerTitle}>Coordinador VetCare</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statNumber}>24</Text><Text style={styles.statLabel}>Citas Hoy</Text></View>
          <View style={styles.statCard}><Text style={styles.statNumber}>6</Text><Text style={styles.statLabel}>Vets Activos</Text></View>
          <View style={styles.statCard}><Text style={styles.statNumber}>18</Text><Text style={styles.statLabel}>Completadas</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Especialistas y Salas</Text>
        {especialistas.map((e) => (
          <View key={e.id} style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>{e.nombre}</Text>
              <Text style={styles.rowSubtitle}>{e.area}</Text>
            </View>
            <View style={styles.badge}><Text style={styles.badgeText}>{e.ubicacion}</Text></View>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Recursos & Equipos</Text>
        {recursos.map((r) => (
          <View key={r.id} style={styles.row}>
            <Text style={styles.rowTitle}>{r.nombre}</Text>
            <Text style={[styles.estadoText, { color: r.ok ? colors.success : colors.danger }]}>{r.estado}</Text>
          </View>
        ))}
      </ScrollView>

      <BottomTabBar
        tabs={ADMIN_TABS}
        activeKey="Panel"
        onPress={(key) => navigation.navigate(ADMIN_TABS.find((t) => t.key === key).route)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20 },
  headerSmall: { fontSize: 12, color: colors.textGray, marginBottom: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, alignItems: 'center', paddingVertical: 16 },
  statNumber: { fontSize: 20, fontWeight: '700', color: colors.textDark },
  statLabel: { fontSize: 11, color: colors.textGray, marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 14, marginBottom: 10 },
  rowTitle: { fontWeight: '700', fontSize: 13, color: colors.textDark },
  rowSubtitle: { fontSize: 12, color: colors.textGray, marginTop: 2 },
  badge: { backgroundColor: colors.primaryLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  estadoText: { fontSize: 12, fontWeight: '700' },
});