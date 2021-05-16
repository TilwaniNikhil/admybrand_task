// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import {
  FlatList,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import filter from 'lodash.filter'
import { ApplicationProvider, Text, Avatar, Input } from '@ui-kitten/components'
import { mapping, light as lightTheme } from '@eva-design/eva'
const mockData = [
    { id: '1', text: 'Expo 2020' },
    { id: '2', text: 'is' },
    { id: '3', text: 'Awesome!' },
    {id:'4',text:'bread'},
    {id:'5',text:'butter'},
    {id:'6',text:'jam'},
    {id:'7',text:'coffee'},
    {id:'8',text:'tea'},
    {id:'9',text:'breakfast'},
    {id:'10',text:'dinner'}
  ]

class HomeScreen extends React.Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    query: '',
    fullData: []
  }

  additem=()=>{
      var datanew=mockData[Math.floor(Math.random() * mockData.length)]
      if(!this.state.data.includes(datanew)){
        this.state.data.push(datanew);
      }
      this.state.fullData = this.state.data
      this.setState({});
  }

  handleSearch = text => {
    const formattedQuery = text.toLowerCase()
    let searchdata=this.state.fullData
    const data=searchdata.filter(x => String(x.text.toLowerCase()).includes(formattedQuery));
    this.setState({ data, query: text })
  }

  renderHeader = () => (
    <View 
      style={{
          flexDirection:"row",
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Input
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={this.handleSearch}
        status='info'
        placeholder='Search'
        style={{
          borderRadius: 25,
          borderColor: '#333',
          backgroundColor: '#fff',
          flex:6
        }}
        textStyle={{ color: '#000' }}
        clearButtonMode='always'
      />
      <IconButton
      style={{flex:1,backgroundColor: '#fff',}}
    icon="plus"
    color={Colors.blue600}
    size={25}
    onPress={this.additem}
  />
      {/* <Button
      style={{flex:2}}
      icon={
        <Icon
          name="plus"
          size={15}
          color="white"
        />
      }
      title="add"
          onPress={this.additem}
        /> */}
    </View>
  )

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    )
  }

  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  }

  render() {
    
    return (
        
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 40
        }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            
              <View
                style={{
                  flexDirection: 'row',
                  padding: 16,
                  alignItems: 'center'
                }}>
                
                <Text
                  category='s1'
                  style={{
                    color: '#000'
                  }}>{`${item.text}`}</Text>
              </View>
            
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    )
  }
}

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <HomeScreen />
  </ApplicationProvider>
)

export default App