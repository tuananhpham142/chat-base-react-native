/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
  ref?: React.Ref<any>;
}>;

function Section({children, title, ref}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer} ref={ref}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const viewRef = useRef<View>();

  // X
  const [x, setX] = useState<number>(0);

  // Y
  const [y, setY] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (y <= offsetY + 100) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [offsetY, y]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        onScroll={event => {
          setOffsetY(event.nativeEvent.contentOffset.y);
        }}
        stickyHeaderIndices={[0]}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Animated.View
          style={[
            {backgroundColor: 'red', height: 40, top: 50, width: '100%'},
          ]}>
          <Text
            style={{
              fontSize: 40,
            }}>
            Fading View!
          </Text>
        </Animated.View>

        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>{''}</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <Text>offsetY: {offsetY}</Text>
            <Text>y: {y}</Text>
          </Section>
          <View
            onLayout={() => {
              viewRef?.current?.measure((fromLeft, fromTop) => {
                setX(fromLeft);
                setY(fromTop);
              });
            }}
            style={{
              backgroundColor: 'green',
            }}
            //@ts-ignore
            ref={viewRef}>
            <Animated.View
              style={[
                {
                  // Bind opacity to animated value
                  opacity: fadeAnim,
                },
              ]}>
              <Text>Learn more</Text>
              <Text>X: {x}</Text>
              <Text>y: {y}</Text>
            </Animated.View>
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
