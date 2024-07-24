import {

  Avatar,
  AvatarBadge,
  AvatarImage,
  Box,

  Divider,

  HStack,

  Icon,

  Image,
  SafeAreaView,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { User } from '../../models/User';
import React, { useState } from "react";
import { RightIcon } from './RightIcon';
import { View } from '@gluestack-ui/themed';
import { Edit2Icon, Pen, Pencil } from 'lucide-react-native';
import { CurrencyIcon, EditIcon, InformationIcon, LanguageIcon, LocationIcon, NotificationsIcon, PolicyIcon, ShareIcon } from '../../Icons/Icons';
import { OptionItem } from './OptionItem';
import ModalImage from './ModalImage';

export default function ProfileScreen({ navigation }: any) {
  const { user }: { user: User | null } = useAppSelector(state => state.auth);
  const [isOpenModalImage, setIsOpenModalImage] = useState(false);
  return (
    <SafeAreaView
      flex={1} p={10} bg='#fff' >
      <ModalImage isOpen={isOpenModalImage} onClose={() => setIsOpenModalImage(false)} />
      <HStack >
        <TouchableOpacity onPress={() => setIsOpenModalImage(true)}>
          <View>
            <Avatar size='xl'>
              <AvatarImage
                alt="avatar"
                source={{
                  uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
                }}

              />
              <AvatarBadge
                bg='#ccc'
                alignItems='center'
                justifyContent='center'
              >
                <Icon as={EditIcon} size='xs' color='#fff' />
              </AvatarBadge>

            </Avatar>


          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AppNavigator', { screen: "EditProfile", params: { user: user } })}>
          <VStack h={96} marginLeft={20} paddingLeft='$4' justifyContent='center'>
            <Text mt={5} fontWeight="$bold">{user?.firstName}</Text>
            <Text mt={5}>{user?.email}</Text>
          </VStack>
        </TouchableOpacity>
      </HStack>

      <Box bg='#F4F5F4' mt={20} paddingTop={20} paddingBottom={12}>
        <Text marginLeft={20} size='lg' fontWeight={500} color='gray'>Account</Text>
      </Box>

      { /* //NotificationIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={NotificationsIcon} title="Push Notifications" color="#FFADF2" />
        <Switch alignItems="baseline" />
      </HStack>
      <Divider my="$0.5" />

      { /* //CurrencyIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={CurrencyIcon} title="Currency" color="#FAD291" />
        <RightIcon text="USD" title="Currency" />
      </HStack>
      <Divider my="$0.5" />


      { /* //LocationIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={LocationIcon} title="Location" color="#57DCE7" />
        <RightIcon text="Viet Nam" title="Location" />
      </HStack>
      <Divider my="$0.5" />

      { /* //LanguageIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={LanguageIcon} title="Language" color="#FEA8A1" />
        <RightIcon text="VietNamese" title="Language" />
      </HStack>


      <Box bg='#F4F5F4' paddingTop={20} paddingBottom={12}>
        <Text marginLeft={20} size='lg' fontWeight={500} color='gray'>More</Text>
      </Box>

      { /* //InformationIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={InformationIcon} title="About Us" color="#A4C8F0" />
        <RightIcon title="InFormation" />
      </HStack>
      <Divider my="$0.5" />

      { /* PolicyIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={PolicyIcon} title="Terms and Policies" color="#C6C7C6" />
        <RightIcon title="Policies" />
      </HStack>
      <Divider my="$0.5" />

      { /* ShareIcon */}
      <HStack h={50} alignItems='center' justifyContent="space-between">
        <OptionItem icon={ShareIcon} title="Share App" color="#C47EFF" />
        <RightIcon title="Share" />
      </HStack>
      <Divider my="$0.5" />


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 75,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  inforLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});
