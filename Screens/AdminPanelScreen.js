import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import AdminTabBar from '../components/AdminTabBar';
import AppointmentsVsCostsChart from '../components/AppointmentsVsCostsChart';

const mesesRegistro = [
  {
    id: '1',
    mes: 'JULIO',
    area: 'Cirugía General',
    citas: 74,
    costos: '$4,250',
    asistencia: '96%',
  },
  {
    id: '2',
    mes: 'AGOSTO',
    area: 'Consulta & Grooming',
    citas: 112,
    costos: '$5,890',
    asistencia: '92%',
  },
  {
    id: '3',
    mes: 'SEPTIEMBRE',
    area: 'Exámenes & Lab',
    citas: 98,
    costos: '$6,420',
    asistencia: '95%',
  },
];

export default function AdminPanelScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Panel');
  const [selectedMes, setSelectedMes] = useState(null);

  const handleVerDetalle = (item) => {
    setSelectedMes(selectedMes?.id === item.id ? null : item);
  };

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === 'Especialistas') {
      navigation.navigate('AdminSpecialists');
    } else if (tabKey === 'Config') {
      Alert.alert(
        'Configuración de Administrador',
        '¿Deseas cerrar sesión de administrador y regresar al login?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Cerrar Sesión', style: 'destructive', onPress: () => navigation.navigate('Login') },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerSubtitle}>Panel de Administración</Text>
            <Text style={styles.headerTitle}>Coordinador VetCare</Text>
          </View>
          <TouchableOpacity
            style={styles.exitBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de Métricas */}
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

        {/* Título de la Sección de Meses */}
        <Text style={styles.sectionTitle}>Resgistro de citas mes anterior y actual</Text>

        {/* Lista de Tarjetas de Meses */}
        <View style={styles.monthsList}>
          {mesesRegistro.map((item) => {
            const isSelected = selectedMes?.id === item.id;
            return (
              <View key={item.id} style={styles.monthCardWrap}>
                <View style={styles.monthCard}>
                  <View>
                    <Text style={styles.monthName}>{item.mes}</Text>
                    <Text style={styles.monthArea}>{item.area}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.detailBtn, isSelected && styles.detailBtnActive]}
                    onPress={() => handleVerDetalle(item)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.detailBtnText,
                        isSelected && styles.detailBtnTextActive,
                      ]}
                    >
                      {isSelected ? 'Ocultar' : 'Ver a detalle'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Desglose opcional al tocar Ver a detalle */}
                {isSelected && (
                  <View style={styles.detailExpand}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Citas registradas</Text>
                      <Text style={styles.detailValue}>{item.citas}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Costos operativos</Text>
                      <Text style={styles.detailValue}>{item.costos}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Asistencia</Text>
                      <Text style={styles.detailValue}>{item.asistencia}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Gráfica Citas vs Costos */}
        <AppointmentsVsCostsChart />
      </ScrollView>

      {/* Barra de navegación inferior para Admin */}
      <AdminTabBar
        activeKey={activeTab}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  exitBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  monthsList: {
    gap: 10,
  },
  monthCardWrap: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    overflow: 'hidden',
  },
  monthCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  monthName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  monthArea: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  detailBtn: {
    backgroundColor: '#E5F2EF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  detailBtnActive: {
    backgroundColor: colors.primary,
  },
  detailBtnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  detailBtnTextActive: {
    color: colors.white,
  },
  detailExpand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
});