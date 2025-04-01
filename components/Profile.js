import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ onClose }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({ name: '', email: '', cellphone: '' });
    const navigation = useNavigation();
    const [loggedOut, setLoggedOut] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await AsyncStorage.getItem('userDetails');
                if (userDetails) {
                    const parsedUser = JSON.parse(userDetails);
                    setUser(parsedUser);
                    setProfileImage(parsedUser.profileImage || null);
                }
            } catch (error) {
                console.error("Error retrieving user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: () => {
                        setLoggedOut(true);
                        if (onClose) onClose();
                        navigation.navigate('Home');
                    },
                },
            ]
        );
    };

    const handleImageChange = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'You need to allow access to your photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newProfileImage = result.uri;
            setProfileImage(newProfileImage);
            setShowButtons(false);

            const updatedUser = { ...user, profileImage: newProfileImage };
            setUser(updatedUser);
            await AsyncStorage.setItem('userDetails', JSON.stringify(updatedUser));

            Alert.alert('Image Updated', 'Your profile image has been updated.');
        }
    };

    const removeImage = async () => {
        Alert.alert(
            'Remove Photo',
            'Are you sure you want to remove your profile picture?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        setProfileImage(null);
                        setShowButtons(false);

                        const updatedUser = { ...user, profileImage: null };
                        setUser(updatedUser);
                        await AsyncStorage.setItem('userDetails', JSON.stringify(updatedUser));

                        Alert.alert('Image Removed', 'Your profile picture has been removed.');
                    },
                },
            ]
        );
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setFormValues({
            name: user.name,
            email: user.email,
            cellphone: user.cellphone,
        });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return false;
        }

        if (formValues.cellphone && !/^\d+$/.test(formValues.cellphone)) {
            Alert.alert('Invalid Cellphone', 'Cellphone number must contain only digits.');
            return false;
        }

        return true;
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) return;

        const updatedUser = { ...formValues, profileImage };
        setUser(updatedUser);
        await AsyncStorage.setItem('userDetails', JSON.stringify(updatedUser));

        setIsEditing(false);
        Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
    };

    const handleFormChange = (key, value) => {
        setFormValues((prevValues) => ({ ...prevValues, [key]: value }));
    };

    return (
        <View style={styles.container}>
            {!isEditing ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profile</Text>
                        <TouchableOpacity onPress={handleEditClick} style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => profileImage && setShowButtons(!showButtons)}
                        style={styles.imageContainer}
                    >
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Text style={styles.defaultProfileIcon}>🙂</Text>
                        )}
                    </TouchableOpacity>
                    {showButtons && (
                        <View style={styles.buttonContainer}>
                            <Button title="Upload Photo" onPress={handleImageChange} />
                            <Button title="Remove Photo" onPress={removeImage} color="red" />
                        </View>
                    )}
                    <View style={styles.details}>
                        <Text><Text style={styles.label}>Username:</Text> {user.firstName || 'N/A'}</Text>
                        <Text><Text style={styles.label}>Email:</Text> {user.email || 'N/A'}</Text>
                        {user.cellphone && <Text><Text style={styles.label}>Cellphone:</Text> {user.cellphone}</Text>}
                    </View>
                    <Button title="Log Out" onPress={handleLogout} color="red" />
                </>
            ) : (
                <View style={styles.form}>
                    <Text style={styles.title}>Edit Profile</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={formValues.name}
                        onChangeText={(value) => handleFormChange('name', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={formValues.email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cellphone"
                        value={formValues.cellphone}
                        onChangeText={(value) => handleFormChange('cellphone', value)}
                    />
                    <Button title="Save Changes" onPress={handleFormSubmit} />
                    <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
    },
});

export default Profile;
