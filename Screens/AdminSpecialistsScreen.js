import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { colors } from '../Theme/colors';
import AdminTabBar from '../components/AdminTabBar';

const especialistas = [
  {
    id: '1',
    nombre: 'Dr.Santiago Hortua',
    area: 'Cirugía General',
    ubicacion: 'Quirófano A',
  },
  {
    id: '2',
    nombre: 'Dr. Fernando Ruiz',
    area: 'Consulta & Grooming',
    ubicacion: 'Consultorio 2',
  },
  {
    id: '3',
    nombre: 'Dra. Julia Santos',
    area: 'Exámenes & Lab',
    ubicacion: 'Laboratorio B',
  },
];

const recursos = [
  {
    id: '1',
    nombre: 'Rayos X - Quirófano 1',
    estado: 'DISPONIBLE',
    color: colors.primary,
  },
  {
    id: '2',
    nombre: 'Ultrasonido portátil',
    estado: 'EN USO (Sala 3)',
    color: '#E8674F',
  },
];

export default function AdminSpecialistsScreen({ navigation }) {
  const handleTabPress = (tabKey) => {
    if (tabKey === 'Panel') {
      navigation.navigate('AdminPanel');
    } else if (tabKey === 'Config') {
      Alert.alert(
        'Configuración de Administrador',
        '¿Deseas cerrar sesión de administrador y regresar al login?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Cerrar Sesión',
            style: 'destructive',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Tarjetas de Métricas Superiores */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Citas Hoy</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Vets Activos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
        </View>

        {/* Sección Especialistas y Salas */}
        <Text style={styles.sectionTitle}>Especialistas y Salas</Text>
        <View style={styles.specialistsList}>
          {especialistas.map((item) => (
            <View key={item.id} style={styles.specialistCard}>
              <View>
                <Text style={styles.specialistName}>{item.nombre}</Text>
                <Text style={styles.specialistArea}>{item.area}</Text>
              </View>
              <View style={styles.roomBadge}>
                <Text style={styles.roomBadgeText}>{item.ubicacion}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Sección Recursos & Equipos */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recursos & Equipos</Text>
        <View style={styles.resourcesCard}>
          {recursos.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.resourceRow,
                index !== recursos.length - 1 && styles.resourceRowDivider,
              ]}
            >
              <Text style={styles.resourceName}>{item.nombre}</Text>
              <Text style={[styles.resourceStatus, { color: item.color }]}>
                {item.estado}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <AdminTabBar
        activeKey="Especialistas"
        onPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  specialistsList: {
    gap: 12,
  },
  specialistCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  specialistName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  specialistArea: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  roomBadge: {
    backgroundColor: '#E5F2EF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  roomBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  resourcesCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  resourceRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resourceName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  resourceStatus: {
    fontSize: 12,
    fontWeight: '800',
  },
});
