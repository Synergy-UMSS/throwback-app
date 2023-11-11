import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface ColorPickersProps {
  onSelectColor: (color: string) => void;
}

interface ColorIcons {
  [key: string]: any;
  defaultColor: string;
}

const ColorPickers: React.FC<ColorPickersProps> = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState<string>('red');

  const colorIcons: ColorIcons = {
    red: require('../assets/colors/red.png'),
    orange: require('../assets/colors/orange.png'),
    yellow: require('../assets/colors/yellow.png'),
    menta: require('../assets/colors/menta.png'),
    purple: require('../assets/colors/purple.png'),
    pink: require('../assets/colors/pink.png'),
    cyan: require('../assets/colors/cian.png'),
    defaultColor: 'red',
  };

  const colors = ["red", "orange", "yellow", "menta", "purple", "pink", "cyan"];

  return (
    <View style={styles.colorPickerContainer}>
      {colors.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorPicker,
            {
              borderColor: color === selectedColor ? 'black' : 'transparent',
              borderWidth: color === selectedColor ? 1 : 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: color === selectedColor ? 1 : 0,
              shadowRadius: 4,
            },
          ]}
          onPress={() => {
            setSelectedColor(color);
            onSelectColor(color);
          }}
        >
          <Image
            source={colorIcons[color]}
            style={styles.colorImage}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  colorPickerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorPicker: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  colorImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ColorPickers;
