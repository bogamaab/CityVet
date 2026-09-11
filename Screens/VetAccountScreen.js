import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const VET_TABS = [
  { key: 'Control', label: 'Control', icon: 'grid-outline', route: 'VetPanel' },
  { key: 'Pacientes', label: 'Pacientes', icon: 'paw-outline', route: 'PetProfile' },
  { key: 'Perfil', label: 'Mi Perfil', icon: 'person-outline', route: 'VetAccount' },
];

export default function VetAccountScreen({ navigation }) {
  const [nombre, setNombre] = useState('Dr. Santiago Hortua');
  const [email, setEmail] = useState('sofia.martinez@vetcura.com');
  const [telefono, setTelefono] = useState('+34 612 345 678');
  const [direccion, setDireccion] = useState('Calle de la Vía 42, 3ºB - Madrid');
  const [recordatorios, setRecordatorios] = useState(true);
  const [alertas, setAlertas] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Cuenta</Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.photoRow}>
          <View style={styles.avatar} />
          <View>
            <View style={styles.photoLinks}>
              <TouchableOpacity>
                <Text style={styles.photoLink}>Cambiar Foto</Text>
              </TouchableOpacity>
              <Text style={styles.photoLinkDivider}>·</Text>
              <TouchableOpacity>
                <Text style={styles.photoLinkDisabled}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.photoCaption}>Formato JPG o PNG de max 2MB.</Text>
          </View>
        </View>

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

        <Text style={styles.sectionTitle}>PREFERENCIAS DE COMUNICACIÓN</Text>

        <View style={styles.prefRow}>
          <View style={styles.prefTextWrap}>
            <Text style={styles.prefTitle}>Recordatorios de Citas</Text>
            <Text style={styles.prefSubtitle}>Avisos por SMS y Email 24 horas antes.</Text>
          </View>
          <Switch
            value={recordatorios}
            onValueChange={setRecordatorios}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.prefRow}>
          <View style={styles.prefTextWrap}>
            <Text style={styles.prefTitle}>Alertas Sanitarias y Vacunas</Text>
            <Text style={styles.prefSubtitle}>Avisos importantes de brotes zonales.</Text>
          </View>
          <Switch
            value={alertas}
            onValueChange={setAlertas}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar
        tabs={VET_TABS}
        activeKey="Perfil"
        onPress={(key) => navigation.navigate(VET_TABS.find((t) => t.key === key).route)}
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.textDark },
  saveBtn: { backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  saveBtnText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  container: { padding: 20, paddingTop: 4 },
  photoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 24 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.border },
  photoLinks: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  photoLink: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  photoLinkDivider: { color: colors.textLightGray },
  photoLinkDisabled: { color: colors.textLightGray, fontWeight: '600', fontSize: 13 },
  photoCaption: { fontSize: 11, color: colors.textGray, marginTop: 4 },
  label: { fontSize: 13, color: colors.textDark, marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16, fontSize: 14,
  },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: colors.textGray, letterSpacing: 0.5,
    marginTop: 12, marginBottom: 12,
  },
  prefRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, padding: 14, marginBottom: 12,
  },
  prefTextWrap: { flex: 1, paddingRight: 12 },
  prefTitle: { fontSize: 14, fontWeight: '600', color: colors.textDark, marginBottom: 2 },
  prefSubtitle: { fontSize: 12, color: colors.textGray },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.danger,
  },
});