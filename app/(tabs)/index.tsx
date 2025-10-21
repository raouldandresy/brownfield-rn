import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  // Anim values
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;

  const slideAnim2 = useRef(new Animated.Value(-50)).current; // slide from left
  const slideAnim3 = useRef(new Animated.Value(50)).current;  // slide from right
  const scaleAnim4 = useRef(new Animated.Value(0.8)).current;  // zoom in scale

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.parallel([
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim2, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim3, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim4, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(scaleAnim4, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3, fadeAnim4, slideAnim2, slideAnim3, scaleAnim4]);

  return (
    <LinearGradient colors={['#f8f9fa', '#e0e0e0']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: STATUSBAR_HEIGHT }]}>
        
        <Animated.View style={[styles.header, { opacity: fadeAnim1 }]}>
          <Ionicons name="planet" size={36} color="#6366f1" />
          <ThemedText type="title">Welcome to Your App</ThemedText>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim2,
              transform: [{ translateX: slideAnim2 }],
            },
          ]}
        >
          <ThemedText type="subtitle">🚀 Step 1: Try it out</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Use{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: 'cmd + d', android: 'cmd + m', web: 'F12' })}
            </ThemedText>{' '}
            for dev tools.
          </ThemedText>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim3,
              transform: [{ translateX: slideAnim3 }],
            },
          ]}
        >
          <ThemedText type="subtitle">🧭 Step 2: Explore</ThemedText>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="defaultSemiBold" style={styles.link}>
                Open Modal →
              </ThemedText>
            </Link.Trigger>
          </Link>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim4,
              transform: [{ scale: scaleAnim4 }],
            },
          ]}
        >
          <ThemedText type="subtitle">🧼 Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            Run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to clean up the{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory.
          </ThemedText>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: 8,
  },
  link: {
    marginTop: 8,
    color: '#2563eb',
  },
});
