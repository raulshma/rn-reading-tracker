import React, { useContext } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar, Surface } from 'react-native-paper';
import { splashFlow } from '../../components/Splash';
import {
  DataContextModel,
  Context as DataContext,
} from '../../context/DataContext';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { BookSearchItem } from '../../common';

const height = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = Number(StatusBar.currentHeight);

const MySearchBar = (props: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const submit = () => props.search({ query: searchQuery });

  return (
    <Searchbar
      style={styles.search}
      onIconPress={submit}
      onSubmitEditing={submit}
      placeholder="Search"
      onChangeText={(text: string) => setSearchQuery(text)}
      value={searchQuery}
    />
  );
};

const AddBook = () => {
  const { state, searchQuery } = useContext<DataContextModel>(DataContext);

  if (!state.searchData)
    return (
      <View style={styles.searchContainer}>
        <MySearchBar search={searchQuery} />
        {state.loading && splashFlow()}
      </View>
    );
  return (
    <View style={styles.searchContainer}>
      <FlatList
        data={state.searchData.items}
        ListHeaderComponent={<MySearchBar search={searchQuery} />}
        keyExtractor={(item: any) => item.id}
        renderItem={({
          item,
          index,
        }: {
          item: BookSearchItem;
          index: number;
        }) => {
          const rating = item?.volumeInfo?.averageRating;
          const ratingCount = item?.volumeInfo?.ratingsCount;
          let ratingText;
          if (rating && ratingCount) {
            ratingText = `${rating}/5 (${ratingCount})`;
          }
          return (
            <Surface style={styles.itemContainer}>
              <Grid>
                <Row>
                  <Col size={75}>
                    <Text numberOfLines={1} style={styles.title}>
                      {item.volumeInfo.title} ({item.volumeInfo.language})
                    </Text>
                    {item?.volumeInfo?.description && (
                      <Text numberOfLines={3} style={styles.description}>
                        {item.volumeInfo.description}
                      </Text>
                    )}
                    {item.volumeInfo?.authors && (
                      <Text numberOfLines={1} style={styles.authors}>
                        - By {item.volumeInfo?.authors?.join(', ')}
                      </Text>
                    )}
                    <Row>
                      <Col>
                        <Text style={styles.bottomText}>
                          {item?.volumeInfo?.pageCount &&
                            `Pages ${item.volumeInfo.pageCount}`}
                        </Text>
                      </Col>
                      <Col style={styles.ratingCol}>
                        <Text style={styles.bottomText}>
                          {ratingText ?? null}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col size={25}>
                    {item?.volumeInfo?.imageLinks?.thumbnail && (
                      <Image
                        source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                        style={styles.image}
                      />
                    )}
                  </Col>
                </Row>
              </Grid>
            </Surface>
          );
        }}
      />
    </View>
  );
};

export { AddBook };

const styles = StyleSheet.create({
  search: { borderRadius: 10, margin: 6 },
  searchContainer: {
    top: STATUSBAR_HEIGHT,
    height: height - STATUSBAR_HEIGHT - 30,
  },
  itemContainer: {
    width: Dimensions.get('window').width - 20,
    height: 110,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    elevation: 2,
    flex: 0,
    flexDirection: 'row',
  },
  image: {
    width: '85%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    lineHeight: 11,
    marginBottom: 3,
    textAlign: 'justify',
    color: 'gray',
  },
  authors: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    color: '#59656f',
  },
  title: { fontSize: 13, marginBottom: 6 },
  ratingCol: {
    alignItems: 'flex-end',
  },
  bottomText: {
    color: 'gray',
    marginTop: 2,
    fontSize: 10,
  },
});
