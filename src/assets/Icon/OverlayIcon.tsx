import React from "react";
import { View } from "react-native";
import { Path, Svg } from "react-native-svg";

export function OverlayIcon() {
  return (
    <View pointerEvents="none" className="absolute right-0 top-0">
      <Svg width={65} height={65} viewBox="0 0 65 65" fill="none">
        <Path
          d="M0 -31H96V65V65C42.9807 65 0 22.0193 0 -31V-31Z"
          fill="#008378"
          fillOpacity={0.2}
        />
      </Svg>
    </View>
  );
}
