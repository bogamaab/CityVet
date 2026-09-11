import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';

export default function CreateAccountScreen({ navigation }) {
  const [userType, setUserType] = useState('cliente');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = () => {
    navigation.navigate(userType === 'cliente' ? 'ClientDashboard' : 'VetPanel');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>CitaVet</Text>
        <Text style={styles.title}>Crea tu cuenta</Text>

        <View style={styles.segmentWrap}>
          <TouchableOpacity
            style={[styles.segmentBtn, userType === 'cliente' && styles.segmentBtnActive]}
            onPress={() => setUserType('cliente')}
          >
            <Text style={[styles.segmentText, userType === 'cliente' && styles.segmentTextActive]}>
              Soy cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, userType === 'veterinaria' && styles.segmentBtnActive]}
            onPress={() => setUserType('veterinaria')}
          >
            <Text style={[styles.segmentText, userType === 'veterinaria' && styles.segmentTextActive]}>
              Soy veterinaria
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre y apellidos"
          placeholderTextColor={colors.textLightGray}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          placeholderTextColor={colors.textLightGray}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="+34 600 000 000"
          placeholderTextColor={colors.textLightGray}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
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

        <TouchableOpacity style={styles.primaryBtn} onPress={handleCreateAccount}>
          <Text style={styles.primaryBtnText}>
            {userType === 'cliente' ? 'Crear cuenta de cliente' : 'Crear cuenta de veterinaria'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Al crear cuenta aceptas los Términos de servicio y el Aviso de privacidad.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>¿Ya tienes una cuenta? Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.footerCaption}>
          {userType === 'cliente' ? 'Registro para clientes' : 'Registro para veterinarios'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 40 },
  logo: { fontSize: 22, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textDark, marginBottom: 24 },
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
    alignItems: 'center', marginBottom: 16,
  },
  primaryBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  termsText: { fontSize: 11, color: colors.textGray, textAlign: 'center', marginBottom: 16, lineHeight: 16 },
  loginLink: { fontSize: 13, color: colors.primary, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  footerCaption: { fontSize: 11, color: colors.textLightGray, textAlign: 'center' },
});