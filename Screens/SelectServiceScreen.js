import React from 'react';
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

const services = [
  { id: '1', nombre: 'Consulta médica', detalle: '30 min', precio: '$25 - $40' },
  { id: '2', nombre: 'Urgencias', detalle: 'Atención inmediata', precio: '$80+', highlight: true },
  { id: '3', nombre: 'Baño y pelaje', detalle: '1 hora', precio: '$15 - $30' },
  { id: '4', nombre: 'Cirugías', detalle: '1 - 3 horas', precio: 'Sujeto a evaluación' },
  { id: '5', nombre: 'Peluquería canina', detalle: '45 min', precio: '$20 - $35' },
  { id: '6', nombre: 'Exámenes médicos', detalle: '20 min', precio: '$30 - $80' },
];

export default function SelectServiceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seleccionar Servicio</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.petBar}>
          <Text style={styles.petBarLabel}>Agendando para:</Text>
          <View style={styles.petBadge}>
            <Text style={styles.petBadgeText}>Max</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {services.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.card, s.highlight && styles.cardHighlight]}
              onPress={() => navigation.navigate('SelectDateTime', { servicio: s.nombre })}
            >
              <Text style={[styles.cardTitle, s.highlight && styles.cardTitleHighlight]}>{s.nombre}</Text>
              <Text style={[styles.cardDetail, s.highlight && styles.cardDetailHighlight]}>{s.detalle}</Text>
              <Text style={[styles.cardPrice, s.highlight && styles.cardDetailHighlight]}>{s.precio}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  petBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 },
  petBarLabel: { fontSize: 13, color: colors.textGray },
  petBadge: { backgroundColor: colors.primaryLight, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 4 },
  petBadgeText: { color: colors.primary, fontWeight: '700', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, padding: 14, marginBottom: 14,
  },
  cardHighlight: { backgroundColor: colors.danger, borderColor: colors.danger },
  cardTitle: { fontWeight: '700', fontSize: 14, color: colors.textDark, marginBottom: 4 },
  cardTitleHighlight: { color: colors.white },
  cardDetail: { fontSize: 12, color: colors.textGray, marginBottom: 8 },
  cardDetailHighlight: { color: '#FDEDE9' },
  cardPrice: { fontSize: 13, fontWeight: '700', color: colors.primary },
});