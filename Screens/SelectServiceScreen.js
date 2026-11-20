import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
  ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';
import { obtenerServicios } from '../services/citaService';
import { obtenerMascotas } from '../services/mascotaService';

const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'ClientProfile' },
];

export default function SelectServiceScreen({ navigation, route }) {
  const [services, setServices] = useState([]);
  const [mascota, setMascota] = useState(route?.params?.mascota || null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        setServices(await obtenerServicios());
        // Si no llegó una mascota por parámetro, usa la primera del cliente
        if (!mascota) {
          const lista = await obtenerMascotas();
          setMascota(lista[0] || null);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const elegir = (s) => {
    if (!mascota) {
      Alert.alert('Sin mascotas', 'Primero registra una mascota.');
      navigation.navigate('RegisterPet');
      return;
    }
    navigation.navigate('SelectDateTime', {
      servicio: s.nombre,
      servicioId: s.id,
      mascotaId: mascota.id,
      mascotaNombre: mascota.nombre,
    });
  };

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
            <Text style={styles.petBadgeText}>{mascota?.nombre || '—'}</Text>
          </View>
        </View>

        {cargando && <ActivityIndicator color={colors.primary} />}

        <View style={styles.grid}>
          {services.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.card, s.highlight && styles.cardHighlight]}
              onPress={() => elegir(s)}
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