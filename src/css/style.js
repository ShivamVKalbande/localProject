import {
    StyleSheet,
  } from 'react-native';
  import {colors} from '../utils/color';
  import {fonts} from '../utils/fonts';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  bannerImage: {
    marginVertical: 30,
    height: 90,
    width: 150,
  },
  logo: {
    marginVertical: 30,
    height: 40,
    width: 90,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.primary,
  },
  title2: {
    fontSize: 31,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.primary,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.primary,
    fontFamily: fonts.Medium,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    width: '80%',
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 98,
    borderColor:colors.white,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  TextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgetPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  errorText:{
    color: 'red',
  },
});