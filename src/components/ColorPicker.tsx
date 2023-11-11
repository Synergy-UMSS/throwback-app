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
  const [selectedColor, setSelectedColor] = useState<string>('red'); // Estado para el color seleccionado

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
              backgroundColor: color === selectedColor ? 'lightgray' : 'transparent', // Resalta el color seleccionado
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
  },
  colorImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ColorPickers;
