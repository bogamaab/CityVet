import React, { useCallback, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { actualizarPerfil } from '../services/authService';
import { obtenerMascotas } from '../services/mascotaService';

export const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'ClientProfile' },
];

export default function ClientProfileScreen({ navigation }) {
  const { usuario, actualizarUsuario, logout } = useAuth();

  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.correo || '');
  const [telefono, setTelefono] = useState(usuario?.telefono || '');
  const [direccion, setDireccion] = useState(usuario?.direccion || '');
  const [recordatorios, setRecordatorios] = useState(usuario?.recordatorios ?? true);
  const [alertas, setAlertas] = useState(usuario?.alertas ?? true);
  const [mascota, setMascota] = useState(null);

  useFocusEffect(
    useCallback(() => {
      obtenerMascotas()
        .then((lista) => setMascota(lista[0] || null))
        .catch(() => {});
    }, [])
  );

  const guardar = async () => {
    try {
      const actualizado = await actualizarPerfil({
        nombre, correo: email, telefono, direccion, recordatorios, alertas,
      });
      actualizarUsuario(actualizado);
      Alert.alert('Perfil actualizado', 'Tus datos se guardaron correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const cerrarSesion = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Tarjeta Principal: Mi Cuenta */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderTitle}>MI CUENTA</Text>
            <TouchableOpacity style={styles.saveBtn} onPress={guardar}>
              <Text style={styles.saveBtnText}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.photoRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color={colors.textLightGray} />
            </View>
            <View style={styles.photoActions}>
              <View style={styles.photoButtonsRow}>
                <TouchableOpacity style={styles.changePhotoBtn}>
                  <Text style={styles.changePhotoText}>Cambiar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deletePhotoBtn}>
                  <Text style={styles.deletePhotoText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.photoCaption}>Formato JPG o PNG de máx 2MB.</Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Teléfono Móvil</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Dirección Física</Text>
            <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />
          </View>
        </View>

        {/* Detalles de la mascota */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderTitle}>DETALLES DE MI MASCOTA</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterPet')}>
              <Text style={styles.headerActionLink}>+ Agregar</Text>
            </TouchableOpacity>
          </View>

          {!mascota ? (
            <Text style={styles.prefSubtitle}>Aún no tienes mascotas registradas.</Text>
          ) : (
            <View style={styles.petCardInner}>
              <View style={styles.petHeader}>
                <View style={styles.petAvatar}>
                  <Ionicons name="paw" size={24} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.petNameRow}>
                    <Text style={styles.petName}>{mascota.nombre}</Text>
                    <View style={styles.speciesBadge}>
                      <Text style={styles.speciesBadgeText}>{mascota.especieTexto}</Text>
                    </View>
                  </View>
                  <Text style={styles.petBreed}>{mascota.raza}</Text>
                </View>
              </View>

              <View style={styles.petStatsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Edad</Text>
                  <Text style={styles.statValue}>{mascota.edad}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Chip</Text>
                  <Text style={styles.statValue}>{mascota.chip}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Estado de Salud</Text>
                  <View style={styles.healthBadge}>
                    <Text style={styles.healthBadgeText}>{mascota.estado}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.petActionsRow}>
                <TouchableOpacity
                  style={styles.petActionBtn}
                  onPress={() => navigation.navigate('MyAppointments')}
                >
                  <Ionicons name="calendar-outline" size={14} color={colors.primary} />
                  <Text style={styles.petActionBtnText}>Ver Citas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.petActionBtn}
                  onPress={() => navigation.navigate('SelectService', { mascota })}
                >
                  <Ionicons name="add-circle-outline" size={14} color={colors.primary} />
                  <Text style={styles.petActionBtnText}>Agendar Cita</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Preferencias de Comunicación */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>PREFERENCIAS DE COMUNICACIÓN</Text>

          <View style={styles.prefRow}>
            <View style={styles.prefTextWrap}>
              <Text style={styles.prefTitle}>Recordatorios de Citas</Text>
              <Text style={styles.prefSubtitle}>Avisos por SMS y Email 24 horas antes.</Text>
            </View>
            <Switch
              value={recordatorios}
              onValueChange={setRecordatorios}
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={[styles.prefRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.prefTextWrap}>
              <Text style={styles.prefTitle}>Alertas Sanitarias y Vacunas</Text>
              <Text style={styles.prefSubtitle}>Avisos importantes de brotes zonales.</Text>
            </View>
            <Switch
              value={alertas}
              onValueChange={setAlertas}
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutBtn} onPress={cerrarSesion}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar
        tabs={CLIENT_TABS}
        activeKey="Perfil"
        onPress={(key) => navigation.navigate(CLIENT_TABS.find((t) => t.key === key).route)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F7' },
  container: { padding: 16, paddingTop: 16, paddingBottom: 24 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 20, padding: 18, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardHeaderTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', letterSpacing: 0.5 },
  headerActionLink: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  saveBtn: { backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 7 },
  saveBtnText: { color: colors.white, fontWeight: '600', fontSize: 13 },
  photoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  avatar: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  photoActions: { flex: 1 },
  photoButtonsRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  changePhotoBtn: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.white },
  changePhotoText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  deletePhotoBtn: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#FAFAFA' },
  deletePhotoText: { fontSize: 12, fontWeight: '500', color: '#9CA3AF' },
  photoCaption: { fontSize: 11, color: colors.textGray },
  fieldGroup: { gap: 4 },
  label: { fontSize: 12, color: '#374151', marginTop: 8, marginBottom: 4, fontWeight: '600' },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: colors.textDark },
  // Detalles de la mascota
  petCardInner: { backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  petHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  petAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  petNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  petName: { fontSize: 15, fontWeight: '700', color: colors.textDark },
  speciesBadge: { backgroundColor: colors.primaryLight, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  speciesBadgeText: { fontSize: 11, fontWeight: '700', color: colors.primary },
  petBreed: { fontSize: 12, color: colors.textGray, marginTop: 2 },
  petStatsGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#E5E7EB', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', marginBottom: 10 },
  statItem: { flex: 1 },
  statLabel: { fontSize: 10, color: colors.textGray, marginBottom: 2, textTransform: 'uppercase', fontWeight: '500' },
  statValue: { fontSize: 12, fontWeight: '700', color: colors.textDark },
  healthBadge: { alignSelf: 'flex-start', backgroundColor: colors.successLight, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  healthBadgeText: { fontSize: 11, fontWeight: '700', color: colors.success },
  petActionsRow: { flexDirection: 'row', gap: 8 },
  petActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: colors.white, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingVertical: 8 },
  petActionBtnText: { fontSize: 12, fontWeight: '600', color: colors.primary },
  // Preferencias
  prefRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  prefTextWrap: { flex: 1, paddingRight: 12 },
  prefTitle: { fontSize: 13, fontWeight: '600', color: colors.textDark, marginBottom: 2 },
  prefSubtitle: { fontSize: 11, color: colors.textGray },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.danger, borderRadius: 14, paddingVertical: 14, marginTop: 8 },
  logoutBtnText: { fontSize: 14, fontWeight: '700', color: colors.danger },
});