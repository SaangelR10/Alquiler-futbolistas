import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated, Image, TextInput, Keyboard, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import footballTeamPlayers from './assets/lottie/football-team-players.json';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

function useAnimatedButtons(num) {
  const animatedValues = Array.from({ length: num }, () => useRef({ y: new Animated.Value(-200), opacity: new Animated.Value(0) }).current);
  useFocusEffect(
    React.useCallback(() => {
      // Reinicia los valores
      animatedValues.forEach(v => {
        v.y.setValue(-200);
        v.opacity.setValue(0);
      });
      Animated.stagger(160, animatedValues.map((v) =>
        Animated.parallel([
          Animated.spring(v.y, { toValue: 0, useNativeDriver: true, speed: 18, bounciness: 12 }),
          Animated.timing(v.opacity, { toValue: 1, duration: 350, useNativeDriver: true })
        ])
      )).start();
    }, [])
  );
  return animatedValues;
}

function HomeScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [funcY, setFuncY] = useState(0);
  const animatedValues = useAnimatedButtons(3);
  const snapHeight = height * 0.58;
  const handleScrollToFuncionalidades = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: funcY, animated: true });
    }
  };
  return (
    <LinearGradient
      colors={["#3730a3", "#2563eb", "#38bdf8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ alignItems: 'center', paddingTop: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          snapToOffsets={[0, funcY]}
          decelerationRate="fast"
          snapToEnd={false}
          snapToStart={false}
        >
          <View style={styles.lottieContainerCentered}>
            <LottieView
              source={footballTeamPlayers}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
          <View style={styles.mainButtonsContainerHome}>
            <MainButton
              text="¿Qué puedes hacer aquí?"
              color="#fff"
              textColor="#2563eb"
              onPress={handleScrollToFuncionalidades}
              animatedStyle={{ transform: [{ translateY: animatedValues[0].y }], opacity: animatedValues[0].opacity }}
              textCenter
            />
            <MainButton
              text="¡Crea tu equipo!"
              color="#22c55e"
              textColor="#fff"
              onPress={() => navigation.navigate('Crear')}
              animatedStyle={{ transform: [{ translateY: animatedValues[1].y }], opacity: animatedValues[1].opacity }}
              textCenter
            />
            <MainButton
              text="¿Cómo funciona?"
              color="#6366f1"
              textColor="#fff"
              onPress={() => navigation.navigate('Como')}
              animatedStyle={{ transform: [{ translateY: animatedValues[2].y }], opacity: animatedValues[2].opacity }}
              textCenter
            />
          </View>
          <View style={{ width: '100%', marginTop: snapHeight }} onLayout={e => setFuncY(e.nativeEvent.layout.y)}>
            <Text style={styles.title}>¡Encuentra futbolistas para tu equipo!</Text>
            <Text style={styles.subtitle}>Reserva jugadores profesionales y amateurs en tu ciudad de forma fácil, segura y rápida.</Text>
            <FuncionalidadesBlock />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function BuscarScreen({ navigation }) {
  const animatedValues = useAnimatedButtons(3);
  return (
    <SafeAreaView style={styles.safeAreaBuscar} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#3730a3", "#2563eb", "#38bdf8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.buscarContainer}>
        <Text style={styles.buscarTitle}>¿Qué quieres buscar?</Text>
        <Text style={styles.buscarSubtitle}>Elige una opción para empezar</Text>
        <View style={styles.buscarButtonsBlock}>
          <BuscarButton
            icon={<FontAwesome5 name="user-friends" size={24} color="#2563eb" />}
            text="Jugadores"
            color="#fff"
            textColor="#2563eb"
            onPress={() => navigation.navigate('BuscarJugadores')}
            animatedStyle={{ transform: [{ translateY: animatedValues[0].y }], opacity: animatedValues[0].opacity }}
          />
          <BuscarButton
            icon={<FontAwesome5 name="users" size={24} color="#fff" />}
            text="Equipos"
            color="#22c55e"
            textColor="#fff"
            onPress={() => {}}
            animatedStyle={{ transform: [{ translateY: animatedValues[1].y }], opacity: animatedValues[1].opacity }}
          />
          <BuscarButton
            icon={<FontAwesome5 name="trophy" size={24} color="#eab308" />}
            text="Torneos"
            color="#6366f1"
            textColor="#fff"
            onPress={() => {}}
            animatedStyle={{ transform: [{ translateY: animatedValues[2].y }], opacity: animatedValues[2].opacity }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function BuscarButton({ icon, text, color, textColor, onPress, animatedStyle }) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  // Fusionar todos los estilos animados en un solo array
  const combinedAnimatedStyle = [
    { transform: [{ scale }] },
    animatedStyle,
    { width: '100%' },
  ];
  return (
    <Animated.View style={combinedAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.buscarButtonTouchable, { backgroundColor: color }]}
      >
        <View style={styles.buscarButtonIcon}>{icon}</View>
        <Text style={[styles.buscarButtonText, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function TribunaScreen() {
  return <View style={styles.center}><Text style={styles.tabText}>Tribuna</Text></View>;
}
function CrearScreen() {
  return <View style={styles.center}><Text style={styles.tabText}>Crear equipo</Text></View>;
}
function ComoScreen() {
  return <View style={styles.center}><Text style={styles.tabText}>¿Cómo funciona?</Text></View>;
}
function SesionScreen() {
  return <View style={styles.center}><Text style={styles.tabText}>Sesión</Text></View>;
}

function MainButton({ text, color, textColor, onPress, animatedStyle, textCenter }) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  const combinedAnimatedStyle = [
    { transform: [{ scale }] },
    animatedStyle,
    { width: '100%' },
  ];
  return (
    <Animated.View style={combinedAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.mainButtonTouchableHome, { backgroundColor: color }]}
      >
        <Text style={[
          styles.mainButtonTextHome,
          { color: textColor },
          textCenter && { textAlign: 'center', width: '100%' }
        ]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function FuncionalidadesBlock() {
  const funcionalidades = [
    {
      icon: <FontAwesome5 name="search" size={28} color="#6366f1" />,
      titulo: 'Buscar jugadores',
      desc: 'Encuentra futbolistas por posición, ciudad, precio y disponibilidad.',
    },
    {
      icon: <FontAwesome5 name="users" size={28} color="#6366f1" />,
      titulo: 'Buscar equipos',
      desc: 'Descubre equipos que buscan jugadores y únete fácilmente.',
    },
    {
      icon: <FontAwesome5 name="trophy" size={28} color="#eab308" />,
      titulo: 'Buscar torneos',
      desc: 'Explora torneos y participa con tu equipo o como jugador.',
    },
    {
      icon: <Ionicons name="ios-person-add" size={28} color="#22c55e" />,
      titulo: 'Crear tu equipo',
      desc: 'Crea y gestiona tu propio equipo, agrega integrantes y personaliza tu perfil.',
    },
    {
      icon: <FontAwesome5 name="handshake" size={28} color="#2563eb" />,
      titulo: 'Reservar jugadores',
      desc: 'Reserva futbolistas para tus partidos de forma segura y rápida.',
    },
    {
      icon: <FontAwesome name="star" size={28} color="#ec4899" />,
      titulo: 'Calificar y dejar reseñas',
      desc: 'Valora la experiencia y ayuda a otros usuarios con tus reseñas.',
    },
  ];
  return (
    <View style={styles.funcContainerList}>
      {funcionalidades.map((f, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.85}
          style={styles.cardListTouchable}
        >
          <BlurView intensity={60} tint="light" style={styles.cardList}>
            <View style={styles.iconList}>{f.icon}</View>
            <View style={styles.textListBlock}>
              <Text style={styles.cardTitleList}>{f.titulo}</Text>
              <Text style={styles.cardDescList}>{f.desc}</Text>
            </View>
          </BlurView>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const jugadoresEjemplo = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    posicion: 'Delantero',
    experiencia: 'Profesional',
    ciudad: 'Bogotá',
    departamento: 'Cundinamarca',
    precio: 50,
    disponibilidad: ['Lunes', 'Miércoles', 'Viernes'],
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    nombre: 'Carlos López',
    posicion: 'Portero',
    experiencia: 'Amateur',
    ciudad: 'Medellín',
    departamento: 'Antioquia',
    precio: 40,
    disponibilidad: ['Martes', 'Jueves', 'Sábado'],
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 3,
    nombre: 'Miguel Torres',
    posicion: 'Defensa',
    experiencia: 'Semi-profesional',
    ciudad: 'Cali',
    departamento: 'Valle del Cauca',
    precio: 35,
    disponibilidad: ['Lunes', 'Jueves', 'Domingo'],
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
];

function BuscarJugadoresScreen() {
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);
  const [vista, setVista] = useState('tarjetas');
  const [filtros, setFiltros] = useState({ departamento: '', ciudad: '', posicion: '', fecha: '', precio: [0, 100], nombre: '' });
  const [showFiltros, setShowFiltros] = useState(true);
  const scrollRef = useRef(null);
  const limpiarFiltros = () => setFiltros({ departamento: '', ciudad: '', posicion: '', fecha: '', precio: [0, 100], nombre: '' });

  // Lógica de filtrado básica
  const jugadoresFiltrados = jugadoresEjemplo.filter(j =>
    (!filtros.nombre || j.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
    (!filtros.departamento || j.departamento === filtros.departamento) &&
    (!filtros.ciudad || j.ciudad === filtros.ciudad) &&
    (!filtros.posicion || j.posicion === filtros.posicion) &&
    (j.precio >= filtros.precio[0] && j.precio <= filtros.precio[1])
  );

  // Ocultar filtros al hacer scroll hacia abajo
  const handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    setShowFiltros(y < 10);
  };

  return (
    <SafeAreaView style={styles.safeAreaBuscar} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#3730a3", "#2563eb", "#38bdf8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.buscarJugadoresContainer}>
        <Text style={styles.buscarJugadoresTitle}>Buscar jugadores</Text>
        <Text style={styles.buscarJugadoresSubtitle}>Encuentra futbolistas por posición, ciudad, precio y disponibilidad.</Text>
        {showFiltros && (
          <View style={styles.filtrosBlockPro}>
            <View style={styles.filtrosRowPro}>
              <FiltroSelect
                label="Departamento"
                value={filtros.departamento}
                onValueChange={v => setFiltros(f => ({ ...f, departamento: v }))}
                options={[ '', 'Cundinamarca', 'Antioquia', 'Valle del Cauca' ]}
                icon={<Ionicons name="location-outline" size={18} color="#64748b" />}
              />
              <FiltroSelect
                label="Ciudad"
                value={filtros.ciudad}
                onValueChange={v => setFiltros(f => ({ ...f, ciudad: v }))}
                options={[ '', 'Bogotá', 'Medellín', 'Cali' ]}
                icon={<Ionicons name="business-outline" size={18} color="#64748b" />}
              />
            </View>
            <View style={styles.filtrosRowPro}>
              <FiltroSelect
                label="Posición"
                value={filtros.posicion}
                onValueChange={v => setFiltros(f => ({ ...f, posicion: v }))}
                options={[ '', 'Delantero', 'Mediocampista', 'Defensa', 'Portero' ]}
                icon={<FontAwesome5 name="user-tag" size={16} color="#64748b" />}
              />
              <FiltroInputText
                label="Nombre"
                value={filtros.nombre}
                onChangeText={v => setFiltros(f => ({ ...f, nombre: v }))}
                placeholder="Nombre..."
                icon={<Ionicons name="person-outline" size={18} color="#64748b" />}
              />
            </View>
            {mostrarFiltrosAvanzados && (
              <View style={styles.filtrosRowPro}>
                <FiltroInputText
                  label="Fecha"
                  value={filtros.fecha}
                  onChangeText={v => setFiltros(f => ({ ...f, fecha: v }))}
                  placeholder="Selecciona"
                  icon={<Ionicons name="calendar-outline" size={18} color="#64748b" />}
                />
                <FiltroInputText
                  label="Precio"
                  value={`$${filtros.precio[0]} - $${filtros.precio[1]}`}
                  onChangeText={() => {}}
                  placeholder="Rango"
                  icon={<Ionicons name="pricetag-outline" size={18} color="#64748b" />}
                  editable={false}
                />
              </View>
            )}
            <View style={styles.filtrosActionsRowPro}>
              <TouchableOpacity
                style={[styles.filtrosToggleBtnPro, mostrarFiltrosAvanzados && styles.filtrosToggleBtnActivePro]}
                activeOpacity={0.85}
                onPress={() => setMostrarFiltrosAvanzados(v => !v)}
              >
                <Ionicons name={mostrarFiltrosAvanzados ? 'chevron-up' : 'chevron-down'} size={18} color={mostrarFiltrosAvanzados ? '#fff' : '#2563eb'} />
                <Text style={[styles.filtrosToggleBtnTextPro, mostrarFiltrosAvanzados && styles.filtrosToggleBtnTextActivePro]}>{mostrarFiltrosAvanzados ? 'Ocultar filtros' : 'Más filtros'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filtrosClearBtnPro}
                activeOpacity={0.85}
                onPress={limpiarFiltros}
              >
                <Ionicons name="close-circle" size={18} color="#64748b" />
                <Text style={styles.filtrosClearBtnTextPro}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.toggleVistaBlock}>
          <TouchableOpacity
            style={[styles.toggleVistaBtn, vista === 'tarjetas' && styles.toggleVistaBtnActive]}
            onPress={() => setVista('tarjetas')}
            activeOpacity={0.85}
          >
            <Ionicons name="grid-outline" size={18} color={vista === 'tarjetas' ? '#fff' : '#64748b'} />
            <Text style={[styles.toggleVistaBtnText, vista === 'tarjetas' && styles.toggleVistaBtnTextActive]}>Tarjetas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleVistaBtn, vista === 'mapa' && styles.toggleVistaBtnActive]}
            onPress={() => setVista('mapa')}
            activeOpacity={0.85}
          >
            <Ionicons name="map-outline" size={18} color={vista === 'mapa' ? '#fff' : '#64748b'} />
            <Text style={[styles.toggleVistaBtnText, vista === 'mapa' && styles.toggleVistaBtnTextActive]}>Mapa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultadosBlock}>
          {vista === 'tarjetas' ? (
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={{ paddingVertical: 12 }}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              keyboardShouldPersistTaps="handled"
            >
              {jugadoresFiltrados.length === 0 ? (
                <Text style={{ color: '#64748b', textAlign: 'center', marginTop: 32, fontSize: 16 }}>No hay jugadores que coincidan con los filtros.</Text>
              ) : (
                jugadoresFiltrados.map(j => <JugadorCard key={j.id} jugador={j} />)
              )}
            </ScrollView>
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 220 }}>
              <Ionicons name="map" size={64} color="#2563eb" style={{ opacity: 0.18 }} />
              <Text style={{ color: '#64748b', marginTop: 12, fontSize: 16, fontWeight: '600' }}>Mapa próximamente</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function FiltroSelect({ label, value, onValueChange, options, icon }) {
  return (
    <View style={styles.filtroInputBlockPro}>
      <Text style={styles.filtroLabelPro}>{label}</Text>
      <View style={styles.filtroSelectGlassPro}>
        {icon && <View style={styles.filtroIconPro}>{icon}</View>}
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.filtroPickerPro}
          dropdownIconColor="#2563eb"
          mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
        >
          {options.map(opt => (
            <Picker.Item key={opt} label={opt === '' ? 'Selecciona' : opt} value={opt} color={opt === '' ? '#b6b6b6' : '#1e293b'} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

function FiltroInputText({ label, value, onChangeText, placeholder, icon, editable = true }) {
  return (
    <View style={styles.filtroInputBlockPro}>
      <Text style={styles.filtroLabelPro}>{label}</Text>
      <View style={styles.filtroSelectGlassPro}>
        {icon && <View style={styles.filtroIconPro}>{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#b6b6b6"
          style={styles.filtroInputTextPro}
          editable={editable}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    </View>
  );
}

function JugadorCard({ jugador }) {
  return (
    <TouchableOpacity activeOpacity={0.92} style={styles.jugadorCardTouchable}>
      <BlurView intensity={60} tint="light" style={styles.jugadorCardGlassPro}>
        <View style={styles.jugadorCardRowPro}>
          <Image source={{ uri: jugador.foto }} style={styles.jugadorCardFotoPro} />
          <View style={styles.jugadorCardInfoPro}>
            <View style={styles.jugadorCardHeaderPro}>
              <Text style={styles.jugadorCardNombrePro}>{jugador.nombre}</Text>
              <View style={styles.jugadorCardBadgePro}><Text style={styles.jugadorCardBadgeTextPro}>{jugador.posicion}</Text></View>
              <View style={styles.jugadorCardBadgeExpPro}><Text style={styles.jugadorCardBadgeTextExpPro}>{jugador.experiencia}</Text></View>
            </View>
            <Text style={styles.jugadorCardCiudadPro}>{jugador.ciudad}</Text>
            <Text style={styles.jugadorCardPrecioPro}>{jugador.precio} €/hora</Text>
            <Text style={styles.jugadorCardDisponibilidadPro}>Disponible: {jugador.disponibilidad.join(', ')}</Text>
            <TouchableOpacity style={styles.jugadorCardReservarBtnPro} activeOpacity={0.85}>
              <Ionicons name="calendar" size={16} color="#fff" />
              <Text style={styles.jugadorCardReservarBtnTextPro}>Reservar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderTopWidth: 0,
            elevation: 0,
            height: 70,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 12,
          },
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={focused ? '#2563eb' : '#64748b'} />;
            } else if (route.name === 'Buscar') {
              return <Ionicons name={focused ? 'search' : 'search-outline'} size={28} color={focused ? '#2563eb' : '#64748b'} />;
            } else if (route.name === 'Tribuna') {
              return <FontAwesome5 name="futbol" size={26} color={focused ? '#22c55e' : '#64748b'} />;
            } else if (route.name === 'Crear') {
              return <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={28} color={focused ? '#2563eb' : '#64748b'} />;
            } else if (route.name === 'Como') {
              return <Ionicons name={focused ? 'help-circle' : 'help-circle-outline'} size={28} color={focused ? '#2563eb' : '#64748b'} />;
            } else if (route.name === 'Sesion') {
              return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={28} color={focused ? '#2563eb' : '#64748b'} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Buscar" component={BuscarScreen} />
        <Tab.Screen name="Tribuna" component={TribunaScreen} />
        <Tab.Screen name="Crear" component={CrearScreen} />
        <Tab.Screen name="Como" component={ComoScreen} />
        <Tab.Screen name="Sesion" component={SesionScreen} />
        <Tab.Screen name="BuscarJugadores" component={BuscarJugadoresScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  lottieContainer: {
    width: width * 0.8,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 48,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ef',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  tabText: {
    fontSize: 22,
    color: '#2563eb',
    fontWeight: '700',
  },
  mainButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  mainButtonsContainerHome: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    gap: 22,
  },
  funcContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lottieContainerCentered: {
    width: width * 0.8,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 120,
  },
  funcContainerGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cardGrid: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
    width: (width - 60) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  icon: {
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  funcContainerList: {
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 20,
    gap: 0,
  },
  cardListTouchable: {
    marginBottom: 18,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  iconList: {
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99,102,241,0.08)',
  },
  textListBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitleList: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  cardDescList: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  buscarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buscarTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  buscarSubtitle: {
    fontSize: 16,
    color: '#e0e7ef',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  buscarButtonsBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 18,
  },
  buscarButtonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 28,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  buscarButtonIcon: {
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99,102,241,0.08)',
  },
  buscarButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  safeAreaBuscar: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainButtonTouchableHome: {
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 12,
    width: '90%',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Centrado horizontal
  },
  mainButtonTextHome: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  buscarJugadoresContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buscarJugadoresTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
    marginTop: 8,
  },
  buscarJugadoresSubtitle: {
    fontSize: 16,
    color: '#e0e7ef',
    textAlign: 'center',
    marginBottom: 22,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  filtrosBlock: {
    width: '100%',
    marginBottom: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    padding: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  resultadosBlock: {
    flex: 1,
    width: '100%',
    marginTop: 0,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.10)',
    padding: 0,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  filtrosRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  filtroInputBlock: {
    flex: 1,
    marginRight: 0,
  },
  filtroLabel: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '700',
    marginBottom: 4,
    marginLeft: 2,
  },
  filtroSelectGlass: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 38,
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filtroSelectText: {
    fontSize: 15,
    color: '#1e293b',
  },
  filtrosAvanzadosBlock: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  filtrosActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  filtrosToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filtrosToggleBtnActive: {
    backgroundColor: 'rgba(34,197,94,0.13)',
  },
  filtrosToggleBtnText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  filtrosClearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filtrosClearBtnText: {
    color: '#64748b',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  filtrosBlockPro: {
    width: '100%',
    marginBottom: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    padding: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  filtrosRowPro: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 12,
  },
  filtroInputBlockPro: {
    flex: 1,
    marginRight: 0,
  },
  filtroLabelPro: {
    fontSize: 13,
    color: '#22292f',
    fontWeight: '700',
    marginBottom: 4,
    marginLeft: 2,
    opacity: 0.85,
  },
  filtroSelectGlassPro: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filtroIconPro: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtroSelectTextPro: {
    fontSize: 15,
    color: '#1e293b',
  },
  filtrosActionsRowPro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  filtrosToggleBtnPro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filtrosToggleBtnActivePro: {
    backgroundColor: 'rgba(30,41,59,0.92)', // azul oscuro translúcido
  },
  filtrosToggleBtnTextPro: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  filtrosToggleBtnTextActivePro: {
    color: '#fff',
  },
  filtrosClearBtnPro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filtrosClearBtnTextPro: {
    color: '#64748b',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  toggleVistaBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    gap: 10,
  },
  toggleVistaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 2,
  },
  toggleVistaBtnActive: {
    backgroundColor: '#22c55e', // verde Apple-like
  },
  toggleVistaBtnText: {
    color: '#64748b',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  toggleVistaBtnTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  jugadorCardTouchable: {
    marginBottom: 22,
    alignSelf: 'center',
    width: '98%',
  },
  jugadorCardGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  jugadorCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  jugadorCardFoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#2563eb22',
  },
  jugadorCardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  jugadorCardNombre: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 2,
  },
  jugadorCardPosicion: {
    fontSize: 15,
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: 2,
  },
  jugadorCardCiudad: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  jugadorCardPrecio: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '700',
    marginBottom: 8,
  },
  jugadorCardReservarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  jugadorCardReservarBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  filtroPickerPro: {
    flex: 1,
    color: '#1e293b',
    backgroundColor: 'transparent',
    marginLeft: -8,
    marginRight: -8,
    height: 38,
},
filtroInputTextPro: {
  flex: 1,
  fontSize: 15,
  color: '#1e293b',
  backgroundColor: 'transparent',
  borderWidth: 0,
  paddingVertical: 0,
  marginLeft: 0,
},
jugadorCardGlassPro: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.92)',
  borderRadius: 28,
  padding: 20,
  shadowColor: '#2563eb',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.10,
  shadowRadius: 16,
  elevation: 3,
},
jugadorCardRowPro: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
},
jugadorCardFotoPro: {
  width: 74,
  height: 74,
  borderRadius: 37,
  marginRight: 18,
  borderWidth: 2,
  borderColor: '#2563eb22',
},
jugadorCardInfoPro: {
  flex: 1,
  justifyContent: 'center',
},
jugadorCardHeaderPro: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 2,
  gap: 8,
},
jugadorCardNombrePro: {
  fontSize: 18,
  fontWeight: '800',
  color: '#1e293b',
  marginRight: 4,
},
jugadorCardBadgePro: {
  backgroundColor: '#2563eb',
  borderRadius: 10,
  paddingHorizontal: 8,
  paddingVertical: 2,
  marginRight: 4,
  alignItems: 'center',
},
jugadorCardBadgeTextPro: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 13,
},
jugadorCardBadgeExpPro: {
  backgroundColor: '#22c55e',
  borderRadius: 10,
  paddingHorizontal: 8,
  paddingVertical: 2,
  alignItems: 'center',
},
jugadorCardBadgeTextExpPro: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 13,
},
jugadorCardCiudadPro: {
  fontSize: 14,
  color: '#64748b',
  marginBottom: 2,
},
jugadorCardPrecioPro: {
  fontSize: 16,
  color: '#22c55e',
  fontWeight: '700',
  marginBottom: 2,
},
jugadorCardDisponibilidadPro: {
  fontSize: 13,
  color: '#2563eb',
  marginBottom: 8,
},
jugadorCardReservarBtnPro: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#2563eb',
  borderRadius: 14,
  paddingVertical: 7,
  paddingHorizontal: 18,
  alignSelf: 'flex-start',
  marginTop: 2,
},
jugadorCardReservarBtnTextPro: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 15,
  marginLeft: 8,
},
});
