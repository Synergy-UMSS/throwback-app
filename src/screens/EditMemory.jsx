{/*
  const [formData, setFormData] = useState({
    username: 'UsuarioInicial',
    email: 'correo@ejemplo.com',
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre de usuario"
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );*/}

import React, { useState, useEffect } from 'react';
import storage from '@react-native-firebase/storage';
import { Image, View, Text, TextInput, StyleSheet, Alert, Pressable, Modal, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import firabase from '@react-native-firebase/app';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/logo.png';
import RequiredField from '../components/RequiredField';
import { format } from 'date-fns';
import EmotionPicker from '../components/EmotionPicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



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
function aclararColor(hex, porcentaje = 0.5) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.floor(r + (255 - r) * porcentaje);
  g = Math.floor(g + (255 - g) * porcentaje);
  b = Math.floor(b + (255 - b) * porcentaje);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const emotions = {
  emo1: { name: 'Feliz' },
  emo2: { name: 'Enojado' },
  emo3: { name: 'Frustrado' },
  emo4: { name: 'Cariñoso' },
  emo5: { name: 'No emotivo' },
  emo6: { name: 'Indeciso' },
  emo7: { name: 'Agradecido' },
  emo8: { name: 'Enamorado' },
  emo9: { name: 'Juguetón' },
  emo10: { name: 'Relajado' },
  emo11: { name: 'Confundido' },
  emo12: { name: 'Alegre' },
  emo13: { name: 'Triste' },
};

const EditMemory = ({ navigation, route }) => {
  const { datos } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedEmotion, setSelectedEmotion] = useState("emo1");
  const [selectedEmotionName, setSelectedEmotionName] = useState(emotions["emo1"].name);
  const [showName, setShowName] = useState(true);

  const [updatingMemory, setUpdatingMemory] = useState(false);
  const cooldownTime = 5000;

  const [isModalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const setInitialFormValues = () => {
    setValue('tituloMemoria', datos.title || ''); // Set title field
    setValue('descripcionMemoria', datos.description || ''); 

    if (datos.imageURL) {
      setImageUri(datos.imageURL); // Set imageUri if there is an existing imageURL
    }

    setSelectedDate(datos.memoryDate.toDate());
    setSelectedEmotion(datos.emotion);
    setSelectedEmotionName(emotions[datos.emotion].name);
    setShowName(true);
    // ... (set other state variables based on your memoria structure)
  };
  useEffect(() => {
    setInitialFormValues();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEmotionSelected = (emotion) => {
    setSelectedEmotion(emotion);
    setSelectedEmotionName(emotion);
    setShowName(true);
  };

  // para la alertita de eliminar
  const confirmImageRemoval = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => setImageUri(null),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDescriptionChange = (newText) => {
    const sanitizedText = newText.replace(/(\r\n|\n|\r)/g, '');
    setDescription(sanitizedText);
  };
  //para las iamgenes 
  const [imageUri, setImageUri] = useState(null); // para almacenar el URI local de la imagen seleccionada

  const selectImage = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de la imagen');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        const fileSize = response.assets[0].fileSize;  //para el tamaño del archivo



        // Verificar si la extensión es jpg, jpeg o png
        if (/\.(jpg|jpeg|png)$/i.test(source.uri)) {
          // Verificar si el archivo es mayor de 7 MB
          if (fileSize <= 7 * 1024 * 1024) { // 7 MB 
            setImageUri(source.uri);
          } else {
            Alert.alert(
              'Archivo demasiado grande',
              'Por favor, elige uno menor a 7 MB.',
              [{ text: 'Aceptar' }]
            );
          }
        } else {
          Alert.alert('Achivo no válido', 'Por favor, usa JPG, JPEG o PNG.',
            [{ text: 'Aceptar' }]
          );
        }
      }
    });
  };

  //para subir la imagen a Firebase Storage y obtener la URL
  const uploadImageAndGetURL = async (localUri) => {
    if (!localUri) {
      console.error('No se proporcionó URI para la imagen Dx');
      return null;
    }
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
    if (updatingMemory) {
      return;
    }

    setUpdatingMemory(true);

    let uploadedImageUrl = null;
    if (imageUri) {
      uploadedImageUrl = await uploadImageAndGetURL(imageUri);
      if (!uploadedImageUrl) {
        console.error('No se pudo obtener la URL de la imagen cargada');
      }
    }

    const memoria = {
      id: datos.id,
      userKey: firabase.auth().currentUser?.uid,
      title: data.tituloMemoria,
      description: data.descripcionMemoria,
      emotion: selectedEmotion,
      createDate: firestore.Timestamp.now(),
      memoryDate: firestore.Timestamp.fromDate(selectedDate),
      song: parseInt(datos.song), //debe ser un entero
      imageURL: uploadedImageUrl || '', // null si no hay imagen
    };

    try {
      await firestore().collection('memories').doc(memoria.id).update(memoria);
      console.log('Memoria actualizada correctamente.');
      showSuccessAlert();
    } catch (error) {
      console.error('Error al actualizar la memoria: ', error);
    } finally {
      setUpdatingMemory(false);
    }
};

  const showSuccessAlert = () => {
    Alert.alert(
      'Memoria actualizada con éxito',
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

    // función para solicitar permisos en tiempo de ejecución
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          if (
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('You can use the camera and photos');
            return true;
          } else {
            console.log('Camera permission denied');
            return false;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      }
      return true;
    };

    const handlePressImagePicker = async () => {
      const hasPermissions = await requestCameraPermission();
      if (hasPermissions) {
        selectImage();
      } else {
        Alert.alert('Permisos Requeridos', 'Se necesitan permisos de cámara y almacenamiento para esta funcionalidad.'); //mensajito para el permiso
      }
    };
    //hasta aqui los permisos



  };


  return (
    <View style={[styles.container, { backgroundColor: aclararColor(getColorForEmotion(selectedEmotion)) }]}>

      <Text style={styles.pageTitle}>Editar memoria musical</Text>

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
              editable={false}
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
        {/* Condición para mostrar el botón solo si imageUri es null */}
        {!imageUri && (
          <Pressable style={styles.button} onPress={selectImage}>
            <Text style={styles.buttonText}>Añadir</Text>
          </Pressable>
        )}

        {/* Modal para mostrar la imagen en pantalla completa */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.fullScreenContainer}>
            <Pressable style={styles.backIcon} onPress={closeModal}>
              <Ionicons name="arrow-back-outline" size={30} color="white" />    
            </Pressable>
            <Image source={{ uri: imageUri }} style={styles.fullScreenImage} />
            <Pressable style={styles.closeModalButton} onPress={closeModal}>
              <Text style={styles.closeModalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>

        {/* Vista previa de la imagen con Pressable para abrir el modal */}
        {imageUri && (
          <View style={styles.containerImage}>
            <View style={styles.previewContainer}>
              <Pressable onPress={openModal}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              </Pressable>
              <Pressable
                style={styles.closeButton}
                onPress={confirmImageRemoval} //alertita 
              >
                <Ionicons name="close-circle-outline" size={28} color="black" />
              </Pressable>
            </View>
          </View>
        )}

        <Text style={styles.label}>Emoción:</Text>
        <EmotionPicker
          emotion={datos.emotion}
          onEmotionChange={handleEmotionSelected}
          isEditing={true}
        />

        <Text style={styles.label}>Canción vinculada:</Text>
        <View style={styles.marginBottom}>
          <ItemSong
            song={datos.title}
            artist={datos.artist}
            imageUri={datos.coverURL || placeholderImage}
          />
        </View>

        <Pressable title="Editar Memoria" onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {updatingMemory ? 'Editando Memoria...' : 'Editar Memoria'}
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

  buttonText: {   //para el boton de añadir
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 3,
    width: 250,
    height: 250,
  },

  previewImage: { //para la previsualizacion
    borderRadius: 20,
    width: 250,
    height: 250,
    backgroundColor: '#ccc', // Un color de fondo en caso de que la imagen no cargue
  },

  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // semitransparente :o
    borderRadius: 12,
    padding: 3,
  },

  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 10, // Asegúrate de que el icono esté por encima de otros elementos
  },
});

export default EditMemory;