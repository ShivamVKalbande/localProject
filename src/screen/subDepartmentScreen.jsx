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
import React, {useEffect, useState} from 'react';
import {colors} from '../utils/color';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SubDepartmentScreen = ({route}) => {
  const {departmentId} = route.params; // Get the departmentId from route params
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [originalData, setOriginalData] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getApiData = async () => {
    const url = `https://mobileapi.mahagenco.in/api/sublistdepart?id=${departmentId}`;
    try {
      const response = await axios.get(url);
      setData(response.data.Department);
      setOriginalData(response.data.Department);
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
      item.Depart_Name.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filteredData);
  };

  const handleProfile = id => {
    navigation.navigate('PROFILE', {profileId: id});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={colors.gray} size={25} />
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
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
          <View key={item.id} style={styles.card}>
            {/* Department Name */}
            <View style={styles.cardHeader}>
              <Text style={styles.departmentName}>{item.Depart_Name}</Text>
            </View>

            {/* Employees */}
            {item.Employees.map(employee => (
              <TouchableOpacity
                key={employee.id}
                style={styles.employeeContainer}
                onPress={() => handleProfile(employee.id)}>
                <View style={styles.circleIcon}>
                  <Text style={styles.iconText}>
                    {employee.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.employeeInfo}>
                  <Text style={styles.employeeName}>{employee.name}</Text>
                  <Text style={styles.employeeNumber}>{employee.number}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>No Data found.</Text>
      )}
    </ScrollView>
  );
};

export default SubDepartmentScreen;

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
    height: 45,
    backgroundColor: colors.white,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.skyblue,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circleIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.skyblue,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexWrap: 'wrap',
    width: '80%',
  },
  employeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
    paddingTop: 8,
  },
  employeeInfo: {
    marginLeft: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  employeeNumber: {
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
