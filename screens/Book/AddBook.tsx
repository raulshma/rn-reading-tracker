import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import localData from './tempdata.json';

const AddBook = () => {
  const [data, setData] = useState();
  useEffect(() => {
    async function search() {
      console.log(localData.items.length);
      setData(localData as any);
      // fetch(
      //   'https://www.googleapis.com/books/v1/volumes?q=the+alchemist+inauthor:Paulo+Coelho'
      // )
      //   .then((e) => e.json())
      //   .then((e) => {
      //     setData(e);
      //   })
      //   .catch((e) => console.log(e));
    }
    search();
  }, []);
  if (!data) return null;
  return (
    <View
      style={{
        top: StatusBar.currentHeight,
        marginBottom: Number(StatusBar.currentHeight) * 2,
        bottom:  StatusBar.currentHeight
      }}
    >
      <FlatList
        data={data.items}
        scrollEnabled
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator
        alwaysBounceHorizontal
        keyExtractor={(item: any) => item.id}
        renderItem={({ item, index }: any) => {
          return (
            <View
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 25,
              }}
            >
              <Text style={{ fontSize: 32, textAlign: 'center' }}>
                {item.volumeInfo.title}
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 15 }}>
                {item.volumeInfo?.authors?.join(', ')}
              </Text>
              <Text
                style={{
                  maxHeight: 14 * 5,
                  lineHeight: 14,
                  marginBottom: 15,
                  textAlign: 'justify',
                }}
              >
                {item.volumeInfo.description}
              </Text>
              <Text>
                {item?.volumeInfo?.pageCount &&
                  `Pages: ${item.volumeInfo.pageCount}`}
              </Text>
              {item?.volumeInfo?.imageLinks?.thumbnail && (
                <Image
                  source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                  style={{
                    height: 194,
                    width: 128,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                    marginTop: 15,
                  }}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export { AddBook };

const styles = StyleSheet.create({});
