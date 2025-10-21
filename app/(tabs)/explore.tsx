import React, { useEffect, useRef } from 'react';
import { Animated, Platform, ScrollView, StatusBar, StyleSheet } from 'react-native';

import { Image } from 'expo-image';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  // Animations for fade-in on mount
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingTop: STATUSBAR_HEIGHT }]}
      accessibilityLabel="Explore screen scrollable content"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <ThemedView style={styles.titleContainer} accessibilityRole="header">
          <ThemedText
            type="title"
            style={styles.titleText}
          >
            Explore
          </ThemedText>
        </ThemedView>

        <ThemedText style={styles.paragraph}>
          This app includes example code to help you get started.
        </ThemedText>

        <Collapsible title="File-based routing">
          <ThemedText style={styles.paragraph}>
            This app has two screens:{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            The layout file in{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText> sets up the tab
            navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Android, iOS, and web support">
          <ThemedText style={styles.paragraph}>
            You can open this project on Android, iOS, and the web. To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Images">
          <ThemedText style={styles.paragraph}>
            For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText>{' '}
            and <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
            different screen densities.
          </ThemedText>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.image}
            accessibilityLabel="React logo"
            resizeMode="contain"
          />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Light and dark mode components" accessibilityRole="button">
          <ThemedText style={styles.paragraph}>
            This template has light and dark mode support. The{' '}
            <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
            what the user's current color scheme is, and so you can adjust UI colors accordingly.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Animations">
          <ThemedText style={styles.paragraph}>
            This template includes an example of an animated component. The{' '}
            <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
            the powerful{' '}
            <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
              react-native-reanimated
            </ThemedText>{' '}
            library to create a waving hand animation.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText style={styles.paragraph}>
                The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
                component provides a parallax effect for the header image.
              </ThemedText>
            ),
          })}
        </Collapsible>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  titleText: {
    fontFamily: Fonts.rounded,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 20,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 12,
    marginVertical: 12,
  },
});
