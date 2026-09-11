import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';
import BottomTabBar from '../components/BottomTabBar';

const CLIENT_TABS = [
  { key: 'Inicio', label: 'Inicio', icon: 'home-outline', route: 'ClientDashboard' },
  { key: 'Mascotas', label: 'Mascotas', icon: 'paw-outline', route: 'RegisterPet' },
  { key: 'Citas', label: 'Citas', icon: 'calendar-outline', route: 'MyAppointments' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline', route: 'ClientProfile' },
];

export default function RegisterPetScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('perro');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [notas, setNotas] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar Mascota</Text>
        <Ionicons name="notifications-outline" size={22} color={colors.textDark} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.photoBox}>
          <Text style={styles.photoText}>Subir foto de tu mascota</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Max, Toby"
          placeholderTextColor={colors.textLightGray}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Especie</Text>
        <View style={styles.speciesRow}>
          {[
            { key: 'perro', label: 'Perro' },
            { key: 'gato', label: 'Gato' },
            { key: 'otro', label: 'Otro' },
          ].map((s) => {
            const active = especie === s.key;
            return (
              <TouchableOpacity
                key={s.key}
                style={[styles.speciesBtn, active && styles.speciesBtnActive]}
                onPress={() => setEspecie(s.key)}
              >
                <Ionicons name="paw" size={16} color={active ? colors.white : colors.textGray} />
                <Text style={[styles.speciesText, active && styles.speciesTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Raza</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Golden Retriever"
              placeholderTextColor={colors.textLightGray}
              value={raza}
              onChangeText={setRaza}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Edad (años)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 2"
              placeholderTextColor={colors.textLightGray}
              value={edad}
              onChangeText={setEdad}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Notas médicas / Alergias</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Indica si toma algún medicamento o sufre de alergias..."
          placeholderTextColor={colors.textLightGray}
          value={notas}
          onChangeText={setNotas}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate('ClientDashboard')}>
          <Text style={styles.saveBtnText}>Guardar Mascota</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar
        tabs={CLIENT_TABS}
        activeKey="Mascotas"
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
  photoBox: {
    borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed',
    borderRadius: 12, paddingVertical: 24, alignItems: 'center',
    backgroundColor: colors.white, marginBottom: 20,
  },
  photoText: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  label: { fontSize: 13, color: colors.textDark, marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16, fontSize: 14,
  },
  textarea: { height: 90, textAlignVertical: 'top' },
  speciesRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  speciesBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1,
    borderColor: colors.border, borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 8, backgroundColor: colors.white,
  },
  speciesBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  speciesText: { fontSize: 13, color: colors.textGray, fontWeight: '500' },
  speciesTextActive: { color: colors.white },
  row: { flexDirection: 'row' },
  saveBtn: {
    backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14,
    alignItems: 'center', marginTop: 8, marginBottom: 20,
  },
  saveBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
});