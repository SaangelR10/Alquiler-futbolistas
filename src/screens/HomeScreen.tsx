import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const funcionalidades = [
  {
    icon: <FontAwesome5 name="search" size={32} color="#6366f1" />,
    titulo: 'Buscar jugadores',
    desc: 'Encuentra futbolistas por posición, ciudad, precio y disponibilidad.',
  },
  {
    icon: <FontAwesome5 name="users" size={32} color="#6366f1" />,
    titulo: 'Buscar equipos',
    desc: 'Descubre equipos que buscan jugadores y únete fácilmente.',
  },
  {
    icon: <FontAwesome5 name="trophy" size={32} color="#eab308" />,
    titulo: 'Buscar torneos',
    desc: 'Explora torneos y participa con tu equipo o como jugador.',
  },
  {
    icon: <Ionicons name="ios-person-add" size={32} color="#22c55e" />,
    titulo: 'Crear tu equipo',
    desc: 'Crea y gestiona tu propio equipo, agrega integrantes y personaliza tu perfil.',
  },
  {
    icon: <FontAwesome5 name="handshake" size={32} color="#2563eb" />,
    titulo: 'Reservar jugadores',
    desc: 'Reserva futbolistas para tus partidos de forma segura y rápida.',
  },
  {
    icon: <FontAwesome name="star" size={32} color="#ec4899" />,
    titulo: 'Calificar y dejar reseñas',
    desc: 'Valora la experiencia y ayuda a otros usuarios con tus reseñas.',
  },
];

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#3730a3", "#2563eb", "#38bdf8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../assets/lottie/football-team-players.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
        <Text style={styles.title}>Alquiler de Futbolistas</Text>
        <Text style={styles.subtitle}>¡Encuentra, compara y alquila jugadores o equipos premium!</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Explorar ahora</Text>
        </TouchableOpacity>
        <View style={styles.funcContainer}>
          {funcionalidades.map((f, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.icon}>{f.icon}</View>
              <Text style={styles.cardTitle}>{f.titulo}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingBottom: 64,
  },
  lottieContainer: {
    width: width * 0.8,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e7ef',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#2563eb',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  funcContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    padding: 18,
    margin: 8,
    width: width * 0.42,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default HomeScreen; 