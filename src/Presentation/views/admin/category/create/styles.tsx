import { StyleSheet } from "react-native";

const AdminCategoryCreateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 50
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain'
    },
    form: {
        marginTop: 50,
        backgroundColor: 'white',
        height: '65%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        position: 'relative',
        bottom: 0
    },
    buttonContainer: {
        position: 'relative',
        bottom: 100,
        left: 50,
        right: 0,
        width: 300
    }
});

export default AdminCategoryCreateStyles;