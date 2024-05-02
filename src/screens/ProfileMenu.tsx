import useAppTheme from '@hooks/useAppTheme';
import useNavigationHook from '@hooks/useNavigation';
import authService from '@services/EmployeeService/auth.service';
import { setClose, setOpen } from '@slices/popup.slice';
import { selectorStation } from '@slices/station.slice';
import { textVariants } from '@theme/TextStyles';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const theme = useAppTheme();
  const navigation = useNavigationHook();
  const station = useSelector(selectorStation);

  const handleLogout = () => {
    dispatch(
      setOpen({
        title: 'Notification',
        contents: 'Sign out of your account?',
        iconColor: theme.colors.warning,
        buttons: {
          confirm: {
            label: 'Yes',
            onPress: async () => {
              await authService.logOutUser(
                dispatch,
                station?.station?.stationId
              );
              dispatch(setClose());
            },
          },
          close: {
            label: 'No',
            buttonColor: theme.colors.primaryContainer,
            textColor: theme.colors.primary,
            onPress: () => dispatch(setClose()),
          },
        },
      })
    );
  };

  return (
    <View className='flex-1'>
      <Divider bold />
      <View className='mb-12'>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileInformationScreen')}
        >
          <View className='flex-row justify-between items-center py-4'>
            <Text className={`${textVariants.textMd} font-semibold`}>
              General
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
          <View className='flex-row justify-between items-center py-4'>
            <Text className={`${textVariants.textMd} font-semibold`}>
              Reviews
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>
        <TouchableOpacity>
          <View className='flex-row justify-between items-center py-4 '>
            <Text className={`${textVariants.textMd} font-semibold`}>
              Points History
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>
        <TouchableOpacity>
          <View className='flex-row justify-between items-center py-4'>
            <Text className={`${textVariants.textMd} font-semibold`}>
              Withdraw Money
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>
        <TouchableOpacity>
          <View className='flex-row justify-between items-center py-4'>
            <Text className={`${textVariants.textMd} font-semibold`}>
              Analystics
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>


        <TouchableOpacity  onPress={() => navigation.navigate('ReportStationScreen')}>
          <View className='flex-row justify-between items-center py-4'>
            <Text className={`${textVariants.textMd} font-semibold`}>
              Report
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>
        {__DEV__ && (
          <TouchableOpacity onPress={() => navigation.navigate('SecurityScreen')}>
            <View className='flex-row justify-between items-center py-4'>
              <Text className={`${textVariants.textMd} font-semibold`}>
              Security
              </Text>
              <Icon source='chevron-right' size={20} color='black' />
            </View>
            <Divider bold />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('OfflineScreen')}>
          <View className='flex-row justify-between items-center py-4'>
            <Text className={`${textVariants.textMd} font-semibold`}>
              Log Screen
            </Text>
            <Icon source='chevron-right' size={20} color='black' />
          </View>
          <Divider bold />
        </TouchableOpacity>
      </View>

      <View className='flex-row justify-between items-center py-4'>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            className={`${textVariants.textMd} font-bold`}
            style={{
              color: theme.colors.primary,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChangePasswordScreen');
          }}
        >
          <Text
            className={`${textVariants.textMd} font-bold`}
            style={{
              color: theme.colors.primary,
            }}
          >
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
