import * as React from 'react';
import { StatusBar, Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import Animated, { Extrapolation, interpolate, useSharedValue, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated';
import chroma from 'chroma-js';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_600SemiBold, Inter_900Black, Inter_400Regular } from '@expo-google-fonts/inter';

const colors = chroma.scale(['hotpink', '#673CF6']).mode('lch').colors(30);

// Function to generate random data
const generateRandomData = (colors) => {
  return colors.map(color => {
    return {
      key: `${color}-${Math.random().toString(36).substr(2, 9)}`, // Unique key
      bg: color, // Background color
      height: Math.round(Math.random() * 150) + 100, // Random height between 100 and 250
    };
  });
};

const _data = generateRandomData(colors);

const _spacing = 20;
const _logoHeight = 30;
const _logoWidth = _logoHeight * 2;
const _stickyHeaderHeight = 400;

const StickyHeaderComponent = ({ scrollY }) => {
  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, _stickyHeaderHeight], [_stickyHeaderHeight, _logoHeight + _spacing * 2], Extrapolation.CLAMP),
    };
  });

  const footerStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, _stickyHeaderHeight], [1, 0], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, _stickyHeaderHeight], [0, -_stickyHeaderHeight / 3], Extrapolation.CLAMP),
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      left: interpolate(scrollY.value, [0, _stickyHeaderHeight], [0, _logoWidth + _spacing], Extrapolation.CLAMP),
      top: interpolate(scrollY.value, [0, _stickyHeaderHeight], [_logoHeight + _spacing, 0], Extrapolation.CLAMP),
    };
  });

  return <View style={{  backgroundColor: 'white', marginBottom: _spacing, borderBottomLeftRadius: _spacing, borderBottomRightRadius: _spacing}}><Animated.View style={[{height: _stickyHeaderHeight, backgroundColor: colors[colors.length - 1], borderRadius: _spacing, padding: _spacing, overflow: 'hidden'}, stylez]}>
    <View
      style={{flexDirection: 'row', alignItems: 'center'}}
    >
      <Image
      source={{uri: 'https://cdn-icons-png.flaticon.com/128/5968/5968151.png'}}
      style={{width: _logoWidth, height: _logoHeight, opacity: .3}}
    />
    <Animated.View style={[{position: 'absolute', right: 0, zIndex: 9, height: '100%', justifyContent: 'center'}, textStyle]}>
      <Text style={[styles.regular, {color: '#fff', fontSize: 22, letterSpacing: 3}]} numberOfLines={1} adjustsFontSizeToFit={1}>**** **** **** 5521</Text>
    </Animated.View>
    </View>
    <View
      style={{height: _logoHeight + _spacing * 2}}
      // style={{flex: 1, backgroundColor: 'green'}}
    />
    <Animated.View style={[{flexDirection: 'row', justifyContent: 'space-between'}, footerStylez]}>
      <View>
        <Text style={[styles.regular, {textTransform: 'uppercase', fontSize: 18, letterSpacing: -1, color: '#fff', opacity: .8, marginBottom: _spacing / 4}]}>Valid thru</Text>
        <Text style={[styles.bold, {color: '#fff', }]}>06/22</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={[styles.regular, {textTransform: 'uppercase', fontSize: 18, letterSpacing: -1, color: '#fff', opacity: .8, marginBottom: _spacing / 4}]}>Card holder</Text>
        <Text style={[styles.bold, {color: '#fff'}]}>Catalin Miron</Text>
      </View>
    </Animated.View>
    <Animated.View style={[{flexDirection: 'row', justifyContent: 'space-between'}, footerStylez]}>
      <View>
        <Text style={[styles.regular, {textTransform: 'uppercase', fontSize: 18, letterSpacing: -1, color: '#fff', opacity: .8, marginBottom: _spacing / 4}]}>Valid thru</Text>
        <Text style={[styles.bold, {color: '#fff', }]}>06/22</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={[styles.regular, {textTransform: 'uppercase', fontSize: 18, letterSpacing: -1, color: '#fff', opacity: .8, marginBottom: _spacing / 4}]}>Card holder</Text>
        <Text style={[styles.bold, {color: '#fff'}]}>Catalin Miron</Text>
      </View>
    </Animated.View>
    
  </Animated.View>
  </View>
}

export default function App() {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(ev => {
    scrollY.value = ev.contentOffset.y;
  });

  let [fontsLoaded] = useFonts({
    interBold: Inter_900Black,
    interSemiBold: Inter_600SemiBold,
    interRegular: Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
    
  }

  return (
    
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={_data}
        keyExtractor={item => item.key}
        scrollEventThrottle={32}
        contentContainerStyle={{ padding: _spacing }}
        stickyHeaderIndices={[0]}
        onScroll={onScroll}
        ListHeaderComponent={() => <StickyHeaderComponent scrollY={scrollY} />}
        renderItem={({ item }) => {

       
          return (
            <View key={item.key} style={{ height: item.height, backgroundColor: item.bg, marginBottom: _spacing, borderRadius: _spacing, padding: _spacing, justifyContent: 'flex-end' }}>
              <Text style={[styles.regular, { fontSize: 16, color: '#fff' }]}>Section {item.bg}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'interBold',
  },
  semiBold: {
    fontFamily: 'interSemiBold',
  },
  regular: {
    fontFamily: 'interRegular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight ,
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
