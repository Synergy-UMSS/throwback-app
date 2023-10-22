import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-core';
import { SearchBox } from '../components/SearchBox';
import { InfiniteHits } from '../components/InfiniteHits';

const searchClient = algoliasearch('WR0BZC2M09', 'ca754dea094fcaa1920155862a92d9d7');

export default function SearchAlgolia() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="songs_throwback">
          <SearchBox />
          <InfiniteHits hitComponent={Hit} />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
}

function Hit({ hit }) {
  return (
    <View>
      <Text>{hit.title}</Text>
      <Image source="gs://synergy-umss.appspot.com/covers/A Head Full of Dreams.jpeg" />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
});
