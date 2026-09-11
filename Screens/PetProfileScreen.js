import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const VET_TABS = [
  { key: 'Control', label: 'Control', icon: 'grid-outline', route: 'VetPanel' },
  { key: 'Pacientes', label: 'Pacientes', icon: 'paw-outline', route: 'PetProfile' },
  { key: 'Perfil', label: 'Mi Perfil', icon: 'person-outline', route: 'VetAccount' },
];

const vacunas = [
  { id: '1', nombre: 'Vacuna Antialérgica', fecha: 'Ene 2024', estado: 'Al día', ok: true },
  { id: '2', nombre: 'Vacuna de la Rabia', fecha: 'Ene 2024', estado: 'Al día', ok: true },
  { id: '3', nombre: 'Desparasitante', fecha: 'Oct 2024', estado: 'Pendiente', ok: false },
];

export default function PetProfileScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.textGray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar paciente..."
          placeholderTextColor={colors.textLightGray}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.petCard}>
          <View style={styles.petHeader}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.petNameRow}>
                <Text style={styles.petName}>Coco</Text>
                <View style={styles.speciesBadge}>
                  <Text style={styles.speciesBadgeText}>Felino</Text>
                </View>
              </View>
              <Text style={styles.petBreed}>Macho (Castrado) · Maine Coon</Text>
            </View>
          </View>

          <View style={styles.petStatsRow}>
            <View>
              <Text style={styles.statLabel}>Edad</Text>
              <Text style={styles.statValue}>3 años y 2 meses</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Chip</Text>
              <Text style={styles.statValue}>900223004523118</Text>
            </View>
          </View>

          <View style={styles.estadoRow}>
            <Text style={styles.statLabel}>Estado general</Text>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoBadgeText}>Estable</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>TUTOR RESPONSABLE</Text>
        <View style={styles.card}>
          <Text style={styles.tutorName}>Sofia Martínez</Text>
          <Text style={styles.tutorContact}>+34 600 123 456</Text>
          <Text style={styles.tutorContact}>sofia.martinez@gmail.com</Text>
        </View>

        <Text style={styles.sectionTitle}>MEDICACIÓN ACTIVA</Text>
        <View style={styles.card}>
          <Text style={styles.medName}>Condroprotector Articular</Text>
          <Text style={styles.medDose}>1 comprimido / 24h · Diario permanente</Text>
        </View>

        <Text style={styles.sectionTitle}>VACUNAS Y DESPARASITACIÓN</Text>
        <View style={styles.card}>
          {vacunas.map((v, i) => (
            <View key={v.id} style={[styles.vacunaRow, i !== vacunas.length - 1 && styles.vacunaRowBorder]}>
              <View>
                <Text style={styles.vacunaName}>{v.nombre}</Text>
                <Text style={styles.vacunaFecha}>{v.fecha}</Text>
              </View>
              <View style={[styles.vacunaBadge, v.ok ? styles.badgeOk : styles.badgePending]}>
                <Text style={[styles.vacunaBadgeText, v.ok ? styles.badgeTextOk : styles.badgeTextPending]}>
                  {v.estado}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>HISTORIAL CLÍNICO</Text>
        <View style={styles.card}>
          <View style={styles.historialHeader}>
            <Text style={styles.historialFecha}>15 Sep 2024</Text>
            <Text style={styles.historialDoctor}>Dra. Sofia Martínez</Text>
          </View>
          <Text style={styles.historialTitle}>Control General</Text>
          <Text style={styles.historialDesc}>
            Paciente acude para revisión de control. Estado general bueno, mucosas sanas, pelaje brillante. Se recomienda mantener dieta rica en fibra.
          </Text>
        </View>
      </ScrollView>

      <BottomTabBar
        tabs={VET_TABS}
        activeKey="Pacientes"
        onPress={(key) => navigation.navigate(VET_TABS.find((t) => t.key === key).route)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    marginHorizontal: 20, marginTop: 14, marginBottom: 8, paddingHorizontal: 14, paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.textDark },
  container: { padding: 20, paddingTop: 8 },
  petCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginBottom: 20 },
  petHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.border },
  petNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  petName: { fontSize: 16, fontWeight: '700', color: colors.textDark },
  speciesBadge: { backgroundColor: colors.successLight, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  speciesBadgeText: { fontSize: 11, fontWeight: '700', color: colors.success },
  petBreed: { fontSize: 12, color: colors.textGray, marginTop: 2 },
  petStatsRow: { flexDirection: 'row', gap: 40, marginBottom: 14 },
  statLabel: { fontSize: 11, color: colors.textGray, marginBottom: 2 },
  statValue: { fontSize: 13, fontWeight: '600', color: colors.textDark },
  estadoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12,
  },
  estadoBadge: { backgroundColor: colors.successLight, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  estadoBadgeText: { fontSize: 12, fontWeight: '700', color: colors.success },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textGray, letterSpacing: 0.5, marginBottom: 10 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginBottom: 20 },
  tutorName: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginBottom: 4 },
  tutorContact: { fontSize: 12, color: colors.textGray, marginBottom: 2 },
  medName: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginBottom: 4 },
  medDose: { fontSize: 12, color: colors.textGray },
  vacunaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  vacunaRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  vacunaName: { fontSize: 13, fontWeight: '600', color: colors.textDark },
  vacunaFecha: { fontSize: 11, color: colors.textGray, marginTop: 2 },
  vacunaBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  badgeOk: { backgroundColor: colors.successLight },
  badgePending: { backgroundColor: colors.warningLight },
  vacunaBadgeText: { fontSize: 11, fontWeight: '700' },
  badgeTextOk: { color: colors.success },
  badgeTextPending: { color: colors.warning },
  historialHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  historialFecha: { fontSize: 12, fontWeight: '600', color: colors.textDark },
  historialDoctor: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  historialTitle: { fontSize: 13, fontWeight: '700', color: colors.textDark, marginBottom: 6 },
  historialDesc: { fontSize: 12, color: colors.textGray, lineHeight: 18 },
});