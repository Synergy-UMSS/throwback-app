// React y componentes de React Native
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
// Importaciones de recursos (como imágenes)
import header from '../assets/header/image1.png';
import ImageFullWidth from '../components/ImageFullWidth';

// Importaciones de tus componentes personalizados
import MiniPlayer from '../components/MiniPlayer';
import EmotionWithMemory from '../components/EmotionWithMemory';
import Emocion from '../components/Emotion';

// Importaciones de módulos externos
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import TermsList from '../components/TermsList';


const MemoryList = ({ navigation }) => {

  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  // Función para abrir detalles
  const abrirDetalles = (id, item, songForMemory, index) => {
    emotionWrapp = listaEmociones[index % listaEmociones.length];
    navigation.navigate('MemoryDetail', {
      memoriaId: id,
      memorie: item,
      song: songForMemory,
      index: index,
      emotion: emotionWrapp,
    });
  };

  // Estados para almacenar datos
  const [memories, setMemories] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState('Todo');

  // Efecto para cargar recuerdos desde Firestore
  useEffect(() => {
    const unsubscribeMemories = firestore()
      .collection('memories')
      .orderBy('createDate', 'desc')
      .onSnapshot(
        querySnapshot => {
          const memoryData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMemories(memoryData);
          // console.log('>>>>>> Memories');
        },
        error => {
          console.log(error);
        },
      );
    return () => unsubscribeMemories();
  }, []);

  // Efecto para cargar canciones desde Firestore
  useEffect(() => {
    const unsubscribeSongs = firestore()
      .collection('songs')
      .onSnapshot(
        querySnapshot => {
          const songData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSongs(songData);
          // console.log('>>>>>> Songs');
        },
        error => {
          console.log(error);
        },
      );
    return () => unsubscribeSongs();
  }, []);

  // Función para encontrar una canción por su ID
  const findSongById = songId => {
    return songs.find(song => song.id === songId);
  };

  // Efectos para detectar el teclado y su estado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Función para esperar una cantidad de milisegundos
  const wait = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  // Función para limpiar la búsqueda y ocultar el teclado
  const handleClearSearch = async () => {
    // Puedes usar wait() aquí si deseas una pausa antes de limpiar la búsqueda
    setSearchTerm('');
    Keyboard.dismiss();
  };

  // Lista de emociones
  const listaEmociones = [
    'emo1', 'emo2', 'emo3',
    'emo4', 'emo5', 'emo6',
    'emo7', 'emo8', 'emo9',
    'emo10','emo11','emo12',
    'emo13','emo14',
  ];

  // Función para filtrar recuerdos basados en el término de búsqueda
  // const filterMemories = (term) => {
  //   // Convertir el término de búsqueda a minúsculas
  //   const lowerCaseTerm = term.toLowerCase();

  //   // Mapear los recuerdos y agregar información de búsqueda
  //   const memoriesWithIndexAndSpace = memories.map(memory => {
  //     const titleIndex = memory.title.toLowerCase().indexOf(lowerCaseTerm);
  //     const descriptionIndex = memory.description.toLowerCase().indexOf(lowerCaseTerm);
  //     const isExactMatch = memory.title.toLowerCase() === lowerCaseTerm;
  //     const followsSpaceInTitle = memory.title.toLowerCase().startsWith(
  //       `${lowerCaseTerm} `,
  //       titleIndex
  //     );

  //     return {
  //       ...memory,
  //       titleIndex,
  //       descriptionIndex,
  //       isExactMatch,
  //       followsSpaceInTitle
  //     };
  //   });

  //   // Filtrar y ordenar los recuerdos en función de los resultados de búsqueda
  //   return memoriesWithIndexAndSpace
  //     .filter(memory => memory.titleIndex !== -1 || memory.descriptionIndex !== -1)
  //     .sort((a, b) => {
  //       if (a.isExactMatch && !b.isExactMatch) return -1;
  //       if (!a.isExactMatch && b.isExactMatch) return 1;
  //       if (a.titleIndex !== -1 && b.titleIndex === -1) return -1;
  //       if (a.titleIndex === -1 && b.titleIndex !== -1) return 1;
  //       if (a.titleIndex === b.titleIndex) {
  //         if (a.followsSpaceInTitle && !b.followsSpaceInTitle) return -1;
  //         if (!a.followsSpaceInTitle && b.followsSpaceInTitle) return 1;
  //         if (a.followsSpaceInTitle && b.followsSpaceInTitle) {
  //           return a.title.localeCompare(b.title);
  //         }
  //       }
  //       if (a.titleIndex !== b.titleIndex) {
  //         return a.titleIndex - b.titleIndex;
  //       }
  //       return a.title.localeCompare(b.title);
  //     });
  // };

  const filterMemories = (term) => {
    // Convertir el término de búsqueda a minúsculas
    const lowerCaseTerm = term.toLowerCase();

    // Mapear los recuerdos y agregar información de búsqueda
    const memoriesWithIndexAndSpace = memories.map(memory => {
        const titleIndex = memory.title.toLowerCase().indexOf(lowerCaseTerm);
        const descriptionIndex = memory.description.toLowerCase().indexOf(lowerCaseTerm);
        const isExactMatch = memory.title.toLowerCase() === lowerCaseTerm;
        const followsSpaceInTitle = memory.title.toLowerCase().startsWith(
            `${lowerCaseTerm} `,
            titleIndex
        );

        return {
            ...memory,
            titleIndex,
            descriptionIndex,
            isExactMatch,
            followsSpaceInTitle
        };
    });

    // Filtrar basado en el término de búsqueda
    // let filteredBySearch = memoriesWithIndexAndSpace
    //     .filter(memory => memory.titleIndex !== -1 || memory.descriptionIndex !== -1);

    // // Filtro adicional por emoción
    // let finalFilteredMemories;
    // if (selectedEmotion === 'todo') {
    //     finalFilteredMemories = filteredBySearch;
    // } else {
    //     finalFilteredMemories = filteredBySearch
    //         .filter(memory => memory.emotion === selectedEmotion);
    // }
    let filteredBySearch = lowerCaseTerm 
        ? memoriesWithIndexAndSpace.filter(memory => memory.titleIndex !== -1 || memory.descriptionIndex !== -1)
        : memoriesWithIndexAndSpace;

    // Filtro adicional por emoción
    let finalFilteredMemories = selectedEmotion === 'Todo'
        ? filteredBySearch
        : filteredBySearch.filter(memory => memory.emotion === selectedEmotion);

        if (selectedEmotion === 'Todo' && !lowerCaseTerm) {
          // Ordenar por fecha de creación si la emoción es "todo" y no hay término de búsqueda
          finalFilteredMemories.sort((a, b) => new Date(b.memoryDate) - new Date(a.memoryDate));
      } else {
    // Ordenamiento final
    finalFilteredMemories.sort((a, b) => {
        if (a.isExactMatch && !b.isExactMatch) return -1;
        if (!a.isExactMatch && b.isExactMatch) return 1;
        if (a.titleIndex !== -1 && b.titleIndex === -1) return -1;
        if (a.titleIndex === -1 && b.titleIndex !== -1) return 1;
        if (a.titleIndex === b.titleIndex) {
            if (a.followsSpaceInTitle && !b.followsSpaceInTitle) return -1;
            if (!a.followsSpaceInTitle && b.followsSpaceInTitle) return 1;
            if (a.followsSpaceInTitle && b.followsSpaceInTitle) {
                return a.title.localeCompare(b.title);
            }
        }
        if (a.titleIndex !== b.titleIndex) {
            return a.titleIndex - b.titleIndex;
        }
        return a.title.localeCompare(b.title);
    });
  }
  return finalFilteredMemories;
};


  // Filtrar los recuerdos en función del término de búsqueda actual
  // const filteredMemories = searchTerm.length > 0 ? filterMemories(searchTerm) : memories;
  const filteredMemories = filterMemories(searchTerm);

  // Estructura de datos que incluye el tipo de elemento (búsqueda o recuerdo) y los datos correspondientes
  const dataWithSearch = [
    { type: 'search' },
    ...filteredMemories.map(memory => ({ type: 'memory', data: memory })),
  ];

  const handleTermSelect = (selectedTerm) => {
    console.log('Selected Term:', selectedTerm);
    setSelectedEmotion(selectedTerm);
  };
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
    <View style={styles.container}>
      <FlatList
        data={dataWithSearch}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        ListHeaderComponent={
          <>
          <View>
          {/* <Emocion nombre="emo5" />
          <Emocion nombre="emo5" /> */}
          <ImageFullWidth source={header} />
          </View>
          </>
        }
        stickyHeaderIndices={[1]}
        renderItem={({ item, index }) => {
          if (item.type === 'search') {
            return (
              <>
              <TermsList onTermSelect={handleTermSelect} />
              <View style={styles.searchContainer}>
                
              {(isKeyboardOpen || searchTerm !== '') && (
                <TouchableOpacity onPress={handleClearSearch} style={styles.iconContainer}>
                  <Animatable.View
                    animation="slideInLeft"
                    duration={300}
                    style={styles.iconAnimationContainer}
                  >
                    <MaterialIcons name="arrow-back" size={30} color="gray" />
                  </Animatable.View>
                </TouchableOpacity>
              )}
              <Animatable.View 
                style={[styles.inputContainer, { paddingLeft: isKeyboardOpen || searchTerm !== '' ? 50 : 10, width:'100%'}]}
                transition="paddingLeft"
                duration={300}
              >
                <MaterialIcons name="search" size={25} color="gray" style={styles.iconLupa} />
                <TextInput
                  style={styles.input}
                  onChangeText={handleSearch}
                  value={searchTerm}
                  placeholder="Buscar memorias..."
                  onSubmitEditing={() => handleSearch(searchTerm)}
                />
              </Animatable.View>
              </View>
              </>
            );
          } else if (item.type === 'memory') {
            const songForMemory = findSongById(item.data.song);
            return (
              <EmotionWithMemory
                memoria={item.data}
                song={songForMemory}
                onPress={id => abrirDetalles(id, item.data, songForMemory, index)}
                index={index - 1}
                alignment={index % 2 === 0 ? 'right' : 'left'}
                emotion={listaEmociones[(index - 1) % listaEmociones.length]}
              />
            );
          }
        }}
        contentContainerStyle={{ paddingBottom: 22 }}
      />
      <View style={styles.miniPlayerContainer}>
        <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
      </View>
    </View>
    //{/* </TouchableWithoutFeedback> */}
  );
  
};

const styles = StyleSheet.create({
  iconLupa: {
    marginRight: -38,
    marginLeft: 15, // Espacio entre el ícono y el texto
  },
  container: {
    flex: 1,
    padding: 0,
    color: 'black',
  },
  messageText: {
    fontFamily: 'Arial',
    fontSize: 18,
    marginLeft: 18,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    height: 60,
    backgroundColor: '#fcf4e7',
    marginBottom:15,
    // backgroundColor:'yellow',
  },
  iconContainer: {
    justifyContent: 'center',
    zIndex: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    // flex: 1,
    // width: 900,
  },
  input: {
    flex: 1,
    paddingHorizontal: 45,
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.9)',    
  },

});

export default MemoryList;
