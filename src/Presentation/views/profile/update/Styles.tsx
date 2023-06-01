import { StyleSheet } from "react-native";

const ProfileUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '10%',
        alignItems: 'center'
    },
    logoImage: {
        width: 100,
        height: 100
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    loading: {
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        position: 'absolute'
    },
});

export default ProfileUpdateStyles;