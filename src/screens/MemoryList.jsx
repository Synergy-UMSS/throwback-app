import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MiniPlayer from '../components/MiniPlayer';
import EmotionWithMemory from '../components/EmotionWithMemory';



import { TouchableOpacity, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
// import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';


// NEW 
import { TextInput } from 'react-native';

import Emocion from '../components/Emotion';

const MemoryList = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // navegacion
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
  const [memories, setMemories] = useState([]);
  const [songs, setSongs] = useState([]);

  // Recuperar memorias
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
          // console.log(memoryData);
          console.log('>>>>>> Memories');
        },
        error => {
          console.log(error);
        },
      );
    return () => unsubscribeMemories();
  }, []);
  // Recuperar canciones
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
          // console.log(songData);
          console.log('>>>>>> Songs');
        },
        error => {
          console.log(error);
        },
      );
    return () => unsubscribeSongs();
  }, []);

  const findSongById = songId => {
    return songs.find(song => song.id === songId);
  };

  // Añadir listeners para el teclado
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
  const handleSearch = (term) => {
    // Implementar lógica de búsqueda aquí si es necesario
    setSearchTerm(term);
  };
  // Manejadores de eventos para el TextInput y los botones
  const handleClearSearch = () => {
    setSearchTerm('');
    Keyboard.dismiss();
  };


  // const inputAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     flex: isKeyboardOpen || searchTerm !== '' ? 0.8 : 1, // O ajusta estos valores como sea necesario
  //   };
  // });

  // control de lista vacia
  // if (true) {

  // if (memories.length === 0) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.messageText}>
  //         No tiene memorias musicales creadas.
  //       </Text>
  //       <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
  //     </View>
  //   );
  // }

  // const listaEmociones = ['worried', 'genial', 'tired',  'leisurely', 'no_trouble', 'sad','happy','confused', 'speechless', 'angry',  'pluff'];
  const listaEmociones = [
    'emo1',
    'emo2',
    'emo3',
    'emo4',
    'emo5',
    'emo6',
    'emo7',
    'emo8',
    'emo9',
    'emo10',
    'emo11',
    'emo12',
    'emo13',
    'emo14',
  ];

  // const filterMemories = (term) => {
  //   return memories.filter(memory =>
  //     memory.title.toLowerCase().includes(term.toLowerCase()) ||
  //     memory.description.toLowerCase().includes(term.toLowerCase())
  //   );
  // };


  const filterMemories = (term) => {
    const lowerCaseTerm = term.toLowerCase();

    const memoriesWithIndexAndSpace = memories.map(memory => {
      const titleIndex = memory.title.toLowerCase().indexOf(lowerCaseTerm);
      const descriptionIndex = memory.description.toLowerCase().indexOf(lowerCaseTerm);
      const isExactMatch = memory.title.toLowerCase() === lowerCaseTerm; // Verifica si es una coincidencia exacta
      const followsSpaceInTitle = memory.title.toLowerCase().startsWith(`${lowerCaseTerm} `, titleIndex); // Verifica si un espacio sigue al término de búsqueda en el título

      return {
        ...memory,
        titleIndex,
        descriptionIndex,
        isExactMatch, 
        followsSpaceInTitle 
      };
    });

    return memoriesWithIndexAndSpace
      .filter(memory => memory.titleIndex !== -1 || memory.descriptionIndex !== -1)
      .sort((a, b) => {
        // Primero verificar coincidencias exactas
        if (a.isExactMatch && !b.isExactMatch) return -1;
        if (!a.isExactMatch && b.isExactMatch) return 1;

        // Luego por la presencia del término en el título
        if (a.titleIndex !== -1 && b.titleIndex === -1) return -1;
        if (a.titleIndex === -1 && b.titleIndex !== -1) return 1;

        // Si ambos tienen el término en el título en la misma posición
        if (a.titleIndex === b.titleIndex) {
          // Dar prioridad si el término es seguido por un espacio en el título
          if (a.followsSpaceInTitle && !b.followsSpaceInTitle) return -1;
          if (!a.followsSpaceInTitle && b.followsSpaceInTitle) return 1;

          // Si ambos siguen un espacio, ordenar alfabéticamente
          if (a.followsSpaceInTitle && b.followsSpaceInTitle) {
            return a.title.localeCompare(b.title);
          }
        }
        // Continuar ordenando por la posición del término
        if (a.titleIndex !== b.titleIndex) {
          return a.titleIndex - b.titleIndex;
        }
        // Por último, ordenar alfabéticamente si todas las otras condiciones son iguales
        return a.title.localeCompare(b.title);
      });
  };

  const filteredMemories = searchTerm.length > 0 ? filterMemories(searchTerm) : memories;

  // const renderSearchBar = () => (
  //   <View style={styles.searchContainer}>
  //     {(isKeyboardOpen || searchTerm !== '') && (
  //       <TouchableOpacity onPress={handleClearSearch} style={styles.iconContainer}>
  //         <Animatable.View
  //           animation="slideInLeft"
  //           duration={700}
  //           style={styles.iconAnimationContainer}
  //         >
  //           <MaterialIcons name="arrow-back" size={30} color="gray" />
  //         </Animatable.View>
  //       </TouchableOpacity>
  //     )}
  //     <Animatable.View 
  //       style={[styles.inputContainer, { paddingLeft: isKeyboardOpen || searchTerm !== '' ? 50 : 10, width:'100%'}]} // 50 debe ser el ancho del icono más algún espacio extra
  //       transition="paddingLeft"
  //       duration={700}
  //     >
  //       <TextInput
  //         style={styles.input}
  //         onChangeText={handleSearch}
  //         value={searchTerm}
  //         placeholder="Buscar memorias..."
  //         onSubmitEditing={() => handleSearch(searchTerm)}
  //       />
  //     </Animatable.View>
  //   </View>
  // );
  // const inputWidth = isKeyboardOpen || searchTerm !== '' ? '80%' : '100%';

  return (
    <View style={styles.container}>
  
      {/* Asumiendo que necesitas ScrollView para otros props o comportamientos */}
      <FlatList
        data={filteredMemories}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              {(isKeyboardOpen || searchTerm !== '') && (
                <TouchableOpacity onPress={handleClearSearch} style={styles.iconContainer}>
                  <Animatable.View
                    animation="slideInLeft"
                    duration={700}
                    style={styles.iconAnimationContainer}
                  >
                    <MaterialIcons name="arrow-back" size={30} color="gray" />
                  </Animatable.View>
                </TouchableOpacity>
              )}
              <Animatable.View 
                style={[styles.inputContainer, { paddingLeft: isKeyboardOpen || searchTerm !== '' ? 50 : 10, width:'100%'}]}
                transition="paddingLeft"
                duration={700}
              >
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
        }
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          const songForMemory = findSongById(item.song);
          return (
            <EmotionWithMemory
              memoria={item}
              song={songForMemory}
              onPress={id => abrirDetalles(id, item, songForMemory, index)}
              index={index}
              alignment={index % 2 === 0 ? 'right' : 'left'}
              emotion={listaEmociones[index % listaEmociones.length]}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 22 }}
      />
  
      <View style={styles.miniPlayerContainer}>
        <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,    
  },

});

export default MemoryList;
