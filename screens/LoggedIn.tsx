import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  Caption,
  Subheading,
  Surface,
  TouchableRipple,
} from 'react-native-paper';
import {
  Context as DataContext,
  DataContextModel,
} from '../context/DataContext';
import BookDetails from './BookDetails';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ITEM_HEIGHT = 150;
const ITEM_PADDING = 8;
const ITEM_WIDTH = (width / 100) * 25;
const ITEM2_WIDTH = (width / 100) * 75 - ITEM_PADDING * 2;
const IMAGE_HEIGHT = ITEM_HEIGHT - ITEM_PADDING * 2;
const LINE_HEIGHT = 14;
const DESC_HEIGHT = LINE_HEIGHT * 5;

const STATUSBAR_HEIGHT = Number(StatusBar.currentHeight);

const Stack = createStackNavigator();

export default function LoggedInStack({ navigation }: any) {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="Listbooks">
        <Stack.Screen
          name="Listbooks"
          options={{ headerShown: false }}
          component={ListBooks}
        />
        <Stack.Screen
          name="BookDetails"
          options={{ headerTitle: 'Details' }}
          component={BookDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ListBooks({ navigation }: any) {
  const { state, getBooks } = useContext<DataContextModel>(DataContext);

  React.useEffect(() => {
    getBooks();
  }, []);
  if (!state.books) return <Text>Loading...</Text>;
  return (
    <View style={{ top: STATUSBAR_HEIGHT }}>
      <FlatList
        data={state.books}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Surface style={styles.surface}>
              <TouchableRipple
                borderless
                onPress={() => navigation.navigate('BookDetails', { id: item._id })}
              >
                <Image source={{ uri: item.coverUrl }} style={styles.image} />
              </TouchableRipple>
              <View style={styles.info}>
                <Subheading style={styles.title}>{item.title}</Subheading>
                <Caption style={styles.author}>By {item.author}</Caption>
                <Caption
                  style={{ lineHeight: LINE_HEIGHT, height: DESC_HEIGHT }}
                >
                  {item.description}
                </Caption>
              </View>
            </Surface>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: ITEM_PADDING,
    height: ITEM_HEIGHT,
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 4,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    marginBottom: 0,
  },
  author: { fontStyle: 'italic' },
  image: {
    height: IMAGE_HEIGHT,
    width: ITEM_WIDTH,
    resizeMode: 'center',
    borderRadius: 10,
  },
  info: { height: IMAGE_HEIGHT, width: ITEM2_WIDTH, overflow: 'hidden' },
});
