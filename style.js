import { StyleSheet } from 'react-native';
import styles from "./style";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',


    },
    TextInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        width: '80%',
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        marginVertical: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})