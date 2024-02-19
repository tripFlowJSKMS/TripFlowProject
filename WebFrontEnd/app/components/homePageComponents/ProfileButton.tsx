import * as React from 'react';
import { Avatar } from 'react-native-paper';
import tw from "twrnc";

const ProfileButton = () => (
  <Avatar.Image size={69} source={require('../../assets/profile-button.jpg')} />
);
export default ProfileButton