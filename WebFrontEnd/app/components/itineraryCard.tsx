import * as React from 'react';
import { View } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const handlePress = () => {
    // This is a placeholder for the function that will be called when the card is pressed
    console.log("Card pressed");
};

type ItineraryCardProps = {
    title: string;
    image_url: string
};

const ItineraryCard: React.FC<ItineraryCardProps>= ({ title, image_url }) => (
    <TouchableRipple onPress={handlePress} style={tw`p-4`}>
        <Card style={tw`p-4`}>
            <Card.Content style={tw`mb-3`}>
            <Text variant="titleLarge">{title}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: image_url }} />
        </Card>
    </TouchableRipple>
);

export default ItineraryCard;