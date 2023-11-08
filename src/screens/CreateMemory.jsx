import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/logo.png';
import { usePlayerStore } from '../store/playerStore';
import RequiredField from '../components/RequiredField';
import { format } from 'date-fns';
import EmotionPicker from '../components/EmotionPicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

// obtener el color de la memoria basado en la emocion
function getColorForEmotion(emotion) {
  return emociones[emotion] || "#000000";
}
const emociones = {
  emo1: "#F6EA7E",       
  emo2: "#FBBAA4",  
  emo3: "#C7A9D5",       
  emo4: "#FFC1D8",     
  emo5: "#F0CC8B",      
  emo6: "#B6BFD4",       
  emo7: "#FFC1D8",         
  emo8: "#FBBAA4",   
  emo9: "#F6EA7E",     
  emo10: "#9DE0D2",
  emo11: "#B6BFD4",
  emo12: "#F0CC8B",
  emo13: "#9DE0D2",
  emo14: "#C7A9D5",  
};
// aclarar un color hexadecimal
function aclararColor(hex, porcentaje=0.5) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.floor(r + (255 - r) * porcentaje);
  g = Math.floor(g + (255 - g) * porcentaje);
  b = Math.floor(b + (255 - b) * porcentaje);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
const CrearMemoria = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {setCurrentSong, currentSong} = usePlayerStore();

  const [selectedEmotion, setSelectedEmotion] = useState("emo1");
  const [selectedEmotionName, setSelectedEmotionName] = useState("emo1");
  const [showName, setShowName] = useState(true);

  const [isCreatingMemory, setIsCreatingMemory] = useState(false);
  const cooldownTime = 5000;


  const handleEmotionSelected = (emotion) => {
    setSelectedEmotion(emotion);
    setSelectedEmotionName(emotion);
    setShowName(true);
  };

  const handleDescriptionChange = (newText) => {
    const sanitizedText = newText.replace(/(\r\n|\n|\r)/g, '');
    setDescription(sanitizedText);
  };
  //para las iamgenes 
  const [imageUri, setImageUri] = useState(''); // para almacenar el URI local de la imagen seleccionada

  const selectImage = () => {
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de la imagen');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.uri);
      }
    });
  };

  //para subir la imagen a Firebase Storage y obtener la URL
  const uploadImageAndGetURL = async (localUri) => {
    const filename = localUri.substring(localUri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? localUri.replace('file://', '') : localUri;
    const storageRef = storage().ref(`images/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  //hasta aqui para seleccionar la imagen
  const onSubmit = async (data) => {
    if (isCreatingMemory) {
      return;
    }

    setIsCreatingMemory(true);

    const memoria = {
      title: data.tituloMemoria,
      description: data.descripcionMemoria,
      emotion: selectedEmotion,
      createDate: firestore.Timestamp.now(),
      memoryDate: firestore.Timestamp.fromDate(selectedDate),
      song: parseInt(currentSong.id), //debe ser un entero
      imageURL: imageUrl, 
    };

    try {
      await firestore().collection('memories').add(memoria);
      console.log('Memoria guardada correctamente.');
      showSuccessAlert();
    } catch (error) {
      console.error('Error al guardar la memoria: ', error);
    } finally {
      setTimeout(() => {
        setIsCreatingMemory(false); // Habilita la creación de memoria después del tiempo de cooldown
      }, cooldownTime);
    }
  };

  const playSong = async () => {
    navigation.navigate('Player', {currentSong, playlistFlow: false}); 
  };

  const showSuccessAlert = () => {
    Alert.alert(
      'Memoria creada con éxito',
      'La memoria se ha guardado correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => {
            navigation.navigate('Tus Memorias Musicales'); // Redirige a la vista "home"
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: aclararColor(getColorForEmotion(selectedEmotion))}]}>
    
      <Text style={styles.pageTitle}>Crear memoria musical</Text>

      <ScrollView>

        <RequiredField style={styles.label}>Título:</RequiredField>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              maxLength={50}
            />
          )}
          name="tituloMemoria"
          defaultValue=""
          rules={{
            required: 'Este campo es obligatorio',
            validate: {
              noSpecialChars: (value) => !/[^a-zA-Z0-9ñ\s]+/.test(value) || 'No se permiten caracteres especiales',
              noEmojis: (value) => !/\p{Extended_Pictographic}/u.test(value) || 'No se permiten caracteres especiales',
              noEmptySpaces: (value) => !/^\s+$/.test(value) || 'No se permiten crear memorias solo con espacios',
            },
          }}
        />
        {errors.tituloMemoria && <Text style={styles.error}>{errors.tituloMemoria.message}</Text>}


        <Text style={styles.label}>Descripción:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputDesc}
              value={value}
              onChangeText={(text) => {
                const sanitizedText = text.replace(/(\r\n|\n|\r)/g, '');
                onChange(sanitizedText);
              }}
              multiline
              maxLength={500}
              numberOfLines={5}
            />
          )}
          name="descripcionMemoria"
          defaultValue=""
        />

            <Text style={styles.label}>Fecha:</Text>
            <TextInput
              style={styles.input}
              value={format(selectedDate, 'dd/MM/yyyy')}
              onFocus={() => setShowDatePicker(true)}
              placeholder="dd/mm/aaaa"
              editable={true} //recordatorio cambiar a falso y usar un boton para cambiar el contenido
            />
            {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) {
                setSelectedDate(date);
                setShowDatePicker(false);
              }
            }}
            maximumDate={new Date()} // Establece la fecha máxima como la fecha actual
          />
        )}
        
        <Text style={styles.label}>Imagen:</Text>
          <Pressable style={styles.iconButton} onPress={() => {/* implementar luego, por ahora que solo se vea el boton xd */}}>
          <Ionicons name="image-outline" size={40} color="black" />
        </Pressable>

        <RequiredField style={styles.label}>Emoción:</RequiredField>
        <EmotionPicker onEmotionChange={handleEmotionSelected}/>
        
        <Text style={styles.label}>Canción vinculada:</Text>
        <View style={styles.marginBottom}>
          <ItemSong
            song={currentSong.title}
            artist={currentSong.artist}
            imageUri={currentSong.artwork || placeholderImage}
            onPlay={playSong}
          />
        </View>

        <Pressable title="Crear Memoria" onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight:'bold' }}>
            {isCreatingMemory ? 'Creando Memoria...' : 'Crear Memoria'}
            </Text>
        </Pressable>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
    color: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    fontFamily: 'Arial',
    color: 'black',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    fontFamily: 'Arial',
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',

  },

  inputDesc: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    fontFamily: 'Arial',
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
    textAlignVertical: 'top'
  },

  marginBottom: {
    marginTop: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontFamily: 'Arial',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20, // Ajusta el tamaño horizontal según tus preferencias
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  iconButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
  },
});

export default CrearMemoria;