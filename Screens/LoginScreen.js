import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';

export default function LoginScreen({ navigation }) {
  const [userType, setUserType] = useState('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate(userType === 'cliente' ? 'ClientDashboard' : 'VetPanel');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>CitaVet</Text>

        <View style={styles.segmentWrap}>
          <TouchableOpacity
            style={[styles.segmentBtn, userType === 'cliente' && styles.segmentBtnActive]}
            onPress={() => setUserType('cliente')}
          >
            <Text style={[styles.segmentText, userType === 'cliente' && styles.segmentTextActive]}>
              Acceso Clientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, userType === 'medico' && styles.segmentBtnActive]}
            onPress={() => setUserType('medico')}
          >
            <Text style={[styles.segmentText, userType === 'medico' && styles.segmentTextActive]}>
              Personal Médico
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@vetcare.com"
          placeholderTextColor={colors.textLightGray}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordWrap}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••••••"
            placeholderTextColor={colors.textLightGray}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
          <Text style={styles.primaryBtnText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.secondaryBtnText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>O ingresar con</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="logo-google" size={18} color={colors.textDark} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="logo-apple" size={18} color={colors.textDark} />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 40 },
  logo: { fontSize: 26, fontWeight: '700', color: colors.primary, marginBottom: 40 },
  segmentWrap: {
    flexDirection: 'row', backgroundColor: colors.primaryLight,
    borderRadius: 10, padding: 4, marginBottom: 24,
  },
  segmentBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: colors.white },
  segmentText: { color: colors.primary, fontWeight: '500', fontSize: 13 },
  segmentTextActive: { fontWeight: '700' },
  label: { fontSize: 13, color: colors.textDark, marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18, fontSize: 14,
  },
  passwordWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 14, marginBottom: 24,
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 14 },
  primaryBtn: {
    backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14,
    alignItems: 'center', marginBottom: 12,
  },
  primaryBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  secondaryBtn: {
    borderWidth: 1.5, borderColor: colors.primary, borderRadius: 10,
    paddingVertical: 14, alignItems: 'center', marginBottom: 24,
  },
  secondaryBtnText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  orText: { textAlign: 'center', color: colors.textGray, fontSize: 12, marginBottom: 16 },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: {
    flex: 1, flexDirection: 'row', gap: 8, justifyContent: 'center',
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, paddingVertical: 12,
  },
  socialText: { fontSize: 14, fontWeight: '500', color: colors.textDark },
});