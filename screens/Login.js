import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const ToggleButton = () => {
    const [pestañaActiva, setPestañaActiva] = useState('clientes');
  }

  function loginApp(user) {
    navigation.navigate('registroMascotas');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CityVet</Text>
      {/* Acceso Clientes */}
      <TouchableOpacity style={[styles.tab, pestañaActiva == 'clientes' && styles.pestañaActiva]}>
        <Text style={[styles.textoPestaña, pestañaActiva === 'clientes' && styles.textoPestañaActiva]}>
          Accesos Clientes
        </Text>
      </TouchableOpacity >
      {/* Personal Medico */}
      <TouchableOpacity
        style={[styles.tab, pestañaActiva == 'medico' && styles.pestañaActiva]}
        onPress={() => setPestañaActiva('medico')}
        activeOpacity={0.8}
      >
        <Text style={[styles.textoPestaña, activeTab === 'medico' && styles.textoPestañaActiva]}>
          Personal Médico
        </Text>
      </TouchableOpacity >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFCFB',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: '900',
    color: '#157D6B',
    marginBottom: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F9F7',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  pestañaActiva: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textoPestaña: {
    fontSize: 14,
    color: '#6E828A',
    fontWeight: '500',
  },
  textoPestañaActiva: {
    color: '#157D6B',
    fontWeight: 'bold',
  }

})
