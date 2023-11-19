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
  const [selectedColor, setSelectedColor] = useState<string>('#FBBAA4');

  const colorImages: ColorIcons = {
    '#FBBAA4': require('../assets/colors/red.png'),
    '#F0CC8B': require('../assets/colors/orange.png'),
    '#F6EA7E': require('../assets/colors/yellow.png'),
    '#CDF4C9': require('../assets/colors/menta.png'),
    '#C7A9D5': require('../assets/colors/purple.png'),
    '#FFC1D8': require('../assets/colors/pink.png'),
    '#9DE0D2': require('../assets/colors/cian.png'),
    defaultColor: '#FBBAA4',
  };

  const colors = ["#FBBAA4", "#F0CC8B", "#F6EA7E", "#CDF4C9", "#C7A9D5", "#FFC1D8", "#9DE0D2"];

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
            source={colorImages[color]}
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
    marginBottom: 20, // Ajusta este valor según tus preferencias
  },
  colorPicker: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    borderWidth: 2, 
    borderColor: 'transparent', 
    borderRadius: 15,
    overflow: 'hidden',
  },
  colorImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default ColorPickers;
