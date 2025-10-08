import {View, Text, Button} from 'react-native';
import axios from 'axios';

export default function ReviewPage({ route, navigation }) {
    const { formData } = route.params;

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://192.168.30.114:8000/registration/api/register/", formData
            );
        }catch (error) {
            console.error(error.response?.data || error.message);
        }

    };

    return (
        <View>
            <Text>Review Successful!</Text>
            <Text>First Name: {formData.first_name}</Text>
            <Text>Last Name: {formData.last_name}</Text>
            <Text>Email: {formData.email}</Text>    
            <Text>Gender: {formData.gender}</Text>
            <Text>Password: {formData.password}</Text>

        <View>
        <Button title="Go Back to Edit" onPress={() => navigation. goBack()} />
        </View>
        <View>
        <Button title="Submit" onPress={handleSubmit} />
        </View>
        </View>

    );
}