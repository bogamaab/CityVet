import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const VET_TABS = [
  { key: 'Control', label: 'Control', icon: 'grid-outline', route: 'VetPanel' },
  { key: 'Pacientes', label: 'Pacientes', icon: 'paw-outline', route: 'PetProfile' },
  { key: 'Perfil', label: 'Mi Perfil', icon: 'person-outline', route: 'VetAccount' },
];

const agenda = [
  { id: '1', hora: '09:00', horaFin: '09:30', mascota: 'Toby', detalle: 'Criollo • Peluquería', color: colors.primary },
  { id: '2', hora: '10:00', horaFin: '10:30', mascota: 'Max', detalle: 'Golden Retriever • Consulta Médica', color: colors.primary, selected: true },
  { id: '3', hora: '11:30', horaFin: '12:00', mascota: 'Luna', detalle: 'Gato Persa • Cirugía', color: colors.danger },
];

export default function VetPanelScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerSmall}>Agenda del Día</Text>
            <Text style={styles.headerTitle}>Dr. Fernando Ruiz</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.weekLink}>Semana</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dateText}>Jueves, 24 de Octubre</Text>

        <View style={{ marginTop: 16 }}>
          {agenda.map((item) => (
            <View
              key={item.id}
              style={[styles.agendaCard, { borderLeftColor: item.color }, item.selected && styles.agendaCardSelected]}
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
        activeKey="Agenda"
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
  agendaCardSelected: { borderWidth: 1.5, borderColor: colors.primary },
  agendaHora: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  agendaHoraFin: { fontSize: 11, color: colors.textGray },
  agendaInfo: { justifyContent: 'center' },
  agendaMascota: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  agendaDetalle: { fontSize: 12, color: colors.textGray, marginTop: 2 },
});