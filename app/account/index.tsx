import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Account
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                  
        justifyContent: 'center', 
        alignItems: 'center',     
        backgroundColor: '#222',  
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
