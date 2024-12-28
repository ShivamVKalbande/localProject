import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
  ImageBackground,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {colors} from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({route, navigation}) => {
  const {profileId} = route.params;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const url = `https://mobileapi.mahagenco.in/api/listofuser?id=${profileId}`;
      try {
        const response = await axios.get(url);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const handleCall = number => {
    Linking.openURL(`tel:${number}`);
  };

  const handleMessage = number => {
    Linking.openURL(`sms:${number}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Contact ${profileData.name}: ${profileData.number}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleFavorite = () => {
    alert(`${profileData.name} has been added to favorites!`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No profile data found.</Text>
      </View>
    );
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Gradient Background */}
      <ImageBackground style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={handleGoBack}>
          <Ionicons name={'arrow-back-outline'} color={colors.gray} size={25} />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profileData.name
              ? profileData.name.substring(0, 2).toUpperCase()
              : ''}
          </Text>
        </View>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.designation}>{profileData.designation}</Text>
        <Text style={styles.address}>{profileData.address}</Text>
      </ImageBackground>

      {/* Bottom Container for Action Icons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => handleCall(profileData.number)}>
          <Ionicons name="call" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => handleMessage(profileData.number)}>
          <Ionicons name="chatbubble" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon} onPress={handleShare}>
          <Ionicons name="share-social" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon} onPress={handleFavorite}>
          <Ionicons name="star" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Contact Details */}
      <View style={styles.card}>
        <DetailItem
          label="Mobile"
          value={profileData.number}
          icon="call"
          onPress={() => handleCall(profileData.number)}
        />
        <DetailItem
          label="Alternate Mobile"
          value={profileData.alternate_num}
          icon="call"
          onPress={() => handleCall(profileData.alternate_num)}
        />
        <DetailItem label="Office" value={profileData.office_num} icon="call" />
        <DetailItem label="Email" value={profileData.email} icon="mail" />
      </View>
    </ScrollView>
  );
};

const DetailItem = ({label, value, icon, onPress}) => (
  <TouchableOpacity style={styles.detailItem} onPress={onPress}>
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    {icon && <Ionicons name={icon} size={20} color={colors.primary} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyblue,
    position: 'relative',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 40,
    left: 20,
    height: 40,
    width: 40,
    backgroundColor: '#EAF1FB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  designation: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  address: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: colors.skyblue,
    elevation: 1,
  },
  actionIcon: {
    padding: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopleftRadius: 20,
    // margin: 15,
    padding: 15,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  label: {
    fontSize: 14,
    color: colors.gray,
  },
  value: {
    fontSize: 16,
    color: colors.black,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.red,
    marginTop: 50,
  },
});

export default ProfileScreen;
