import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Alquiler de Futbolistas</Text>
        <Text style={styles.subtitle}>¡Encuentra, compara y alquila jugadores o equipos premium!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explorar ahora</Text>
        </TouchableOpacity>
        {/* Aquí puedes agregar una animación Lottie o imagen destacada */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 