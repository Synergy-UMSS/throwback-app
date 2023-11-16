// Importa MemoryList y EditMemory
import MemoryList from './MemoryList';
import EditMemory from './EditMemory';

// Configura tus rutas
const EditMemoryNavigator = createStackNavigator({
  MemoryList: { screen: MemoryList },
  EditMemory: { screen: EditMemory }
});

// Crea y exporta el contenedor de navegación
export default createAppContainer(EditMemoryNavigator);