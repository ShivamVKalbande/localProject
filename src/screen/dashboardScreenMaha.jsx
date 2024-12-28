import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/color';
import { fonts } from '../utils/fonts';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSubDepartment = id => {
    navigation.navigate('SUBDEPARTMENT', { departmentId: id });
  };

  const handleContact = () => {
    navigation.navigate('CONTACT');
  };

  const getApiData = async () => {
    const url = 'https://mobileapi.mahagenco.in/api/departmentlist';
    try {
      const response = await axios.get(url);
      setData(response.data.depart);
      setOriginalData(response.data.depart);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const searchDepartment = text => {
    if (text === '') {
      setData(originalData);
      return;
    }
    const filteredData = originalData.filter(item =>
      item.departments.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filteredData);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/mahaLogo.png')}
            style={styles.logo}
          />
        </View>
        <TextInput
          style={styles.SearchBar}
          placeholder="Search"
          placeholderTextColor={'#888'}
          onChangeText={searchDepartment}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.skyblue} />
        ) : error ? (
          <Text style={styles.loadingText}>{error}</Text>
        ) : data.length ? (
          data.map(item => (
            <View key={item.id} style={styles.tableStyle}>
              <View style={styles.textContainer}>
                <Image
                  source={require('../assets/user.png')}
                  style={styles.departmentLogo}
                />
                <Text style={styles.departmentName}>
                  {item.departments} {'\n'}{' '}
                  <Text style={styles.address}>({item.address})</Text>{' '}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.contacts}>
                  {item.contacts} {'\n'}{' '}
                  <Text style={styles.contacts}>Contacts</Text>
                </Text>
                <TouchableOpacity
                  style={styles.arrowIcon}
                  onPress={() => handleSubDepartment(item.id)}>
                  <SimpleLineIcons
                    name={'arrow-right'}
                    size={25}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>No Data found.</Text>
        )}
      </ScrollView>
      <View style={styles.Buttomcontainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name={'home'}
            size={22}
            color={colors.white}
          />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContact}>
          <AntDesign
            name={'contacts'}
            size={22}
            color={colors.white}
          />
          <Text style={styles.text}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name={'star-sharp'}
            size={22}
            color={colors.white}
          />
          <Text style={styles.text}>Favorite</Text>
        </ TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    height: 60,
    width: 130,
  },
  tableStyle: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentLogo: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  departmentName: {
    fontSize: 18,
    marginVertical: 10,
    flexShrink: 1,
  },
  address: {
    fontSize: 16,
    color: colors.secondary,
  },
  contacts: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  SearchBar: {
    borderColor: colors.LightSilver,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 45,
    backgroundColor: colors.white,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  Buttomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.skyblue,
    paddingVertical: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});