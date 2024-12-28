import {
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
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ContactScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getApiData = async () => {
    const url = `https://mobileapi.mahagenco.in/api/ContactList`;
    try {
      const response = await axios.get(url);
      setData(response.data.conatctlist);
      setOriginalData(response.data.conatctlist);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
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
      item.name.toLowerCase().includes(text.toLowerCase()), // Adjusted to filter by name
    );
    setData(filteredData);
  };

  const handleProfile = id => {
    navigation.navigate('PROFILE', { profileId: id });
  };

  // Define an array of colors
  const colorsArray = ['#FF5733', '#008000', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C', '#3498DB'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={colors.gray} size={25} />
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Contacts"
        placeholderTextColor={'#888'}
        onChangeText={searchDepartment}
      />

      {/* Data List */}
      {loading ? ( // Show loading indicator while fetching data
        <ActivityIndicator size="large" color={colors.skyblue} />
      ) : data.length ? (
        data.map((item, index) => (
          <TouchableOpacity key={item.id} style={styles.card} onPress={() => handleProfile(item.id)}>
            <View style={styles.cardHeader}>
              <View style={[styles.circleIcon, { backgroundColor: colorsArray[index % colorsArray.length] }]}>
                <Text style={styles.iconText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.employeeInfo}>
                <Text style={styles.departmentName}>{item.name}</Text>
                <Text style={styles.departmentNumber}>{item.number}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.loadingText}>No contacts found.</Text>
      )}
    </ScrollView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  backButtonWrapper: {
    marginBottom: 10,
    height: 40,
    width: 40,
    backgroundColor: '#EAF1FB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderColor: colors.LightSilver,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    height:45,
    backgroundColor: colors.white,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  departmentNumber: {
    fontSize: 14,
    color: '#888',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});