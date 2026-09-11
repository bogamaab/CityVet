import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'ClientProfile' },
];

const mascotas = [
  { id: '1', nombre: 'Max', raza: 'Golden Retriever', cita: 'Cita: Mañana 10:00' },
  { id: '2', nombre: 'Luna', raza: 'Gato Persa', cita: 'Sin citas próximas' },
];

export default function ClientDashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>¡Hola, María!</Text>
        <Text style={styles.subGreeting}>¿Cómo están tus mascotas?</Text>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Reserva una cita hoy mismo</Text>
          <Text style={styles.heroSubtitle}>Elige especialidad, doctor y horario en minutos.</Text>
          <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.navigate('SelectService')}>
            <Text style={styles.heroBtnText}>Agendar Cita</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis Mascotas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterPet')}>
            <Text style={styles.sectionLink}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mascotas.map((m) => (
            <View key={m.id} style={styles.petCard}>
              <Text style={styles.petName}>{m.nombre}</Text>
              <Text style={styles.petBreed}>{m.raza}</Text>
              <Text style={styles.petAppointment}>{m.cita}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Consejos de Salud</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Cuidado con el calor</Text>
          <Text style={styles.tipText}>Mantén a tus mascotas hidratadas durante el mediodía.</Text>
        </View>
      </ScrollView>

      <BottomTabBar
        tabs={CLIENT_TABS}
        activeKey="Inicio"
        onPress={(key) => navigation.navigate(CLIENT_TABS.find((t) => t.key === key).route)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20 },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.textDark },
  subGreeting: { fontSize: 14, color: colors.textGray, marginBottom: 20 },
  heroCard: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, marginBottom: 24 },
  heroTitle: { color: colors.white, fontSize: 16, fontWeight: '700', marginBottom: 6 },
  heroSubtitle: { color: '#DDEEE9', fontSize: 13, marginBottom: 16 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.white,
    alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10,
  },
  heroBtnText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.textDark },
  sectionLink: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  petCard: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, padding: 14, marginRight: 12, width: 160,
  },
  petName: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  petBreed: { fontSize: 12, color: colors.textGray, marginTop: 2 },
  petAppointment: { fontSize: 12, color: colors.primary, marginTop: 8, fontWeight: '500' },
  tipCard: { backgroundColor: colors.warningLight, borderRadius: 12, padding: 16, marginTop: 12 },
  tipTitle: { fontWeight: '700', color: colors.textDark, marginBottom: 4, fontSize: 14 },
  tipText: { fontSize: 13, color: colors.textGray },
});