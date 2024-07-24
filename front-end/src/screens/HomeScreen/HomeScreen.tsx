import { GluestackUIProvider, ImageBackground, SafeAreaView, Text } from '@gluestack-ui/themed';
import React from "react";
import { ImageAssets } from '../../assets/img/ImageAssets';
import { View } from '@gluestack-ui/themed';

export default function HomeScreen() {
  return (
    <View h="100%" w="100%">
      <ImageBackground
        source={ImageAssets.homeImage}
        style={{ flex: 1, justifyContent: "center" }}
      >
      </ImageBackground>
    </View>
  );
}
