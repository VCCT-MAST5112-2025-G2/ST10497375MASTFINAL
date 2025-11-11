import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';


export default function HomeScreen({ navigation, menu = [], setMenu = () => {} }) {
    
    const removeItem = (index) => {
        const newMenu = menu.filter((_, i) => i !== index);
        setMenu(newMenu);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Christoffel!</Text>

            <TouchableOpacity style={styles.button}

            onPress={() => navigation.navigate("Menu")}
            >
                <Text style={styles.buttonText}>Let's Begin!</Text>
            </TouchableOpacity>

            <FlatList
                data={menu}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemText}>Course: {item.course}</Text>
                            <Text style={styles.itemText}>Price: R{item.price}</Text>
                            <Text style={styles.itemText}>Description: {item.description}</Text>
                            <Text style={styles.itemText}>
                                {item.name} - R{item.price?.toFixed(2)}
                            </Text>
                            <TouchableOpacity onPress={() => removeItem(index)}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                style={styles.flatlist}
            />
            </View>
    );
}
        


                
            
            
      

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
    },
    
    title: {
         fontSize: 24, 
         marginBottom: 16
    }, 

    menuButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 6,
        marginBottom: 30,
    },

    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 6,
    },

    buttonText: {
         color: "#fff",
          fontWeight: "bold"
    },

    flatlist: {
        alignSelf: "stretch",
    },

    itemText : {
        fontSize: 20,
        marginBottom: 2,
        color: "#333",
    },

    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    itemDetails: {
        flex: 1,
        paddingRight: 10,
    },

    itemName: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 4,
    },



    removeButtonText : {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
    },

    noItemsText : {
        fontSize: 18,
        color: "#555",
        marginTop: 20,
    },
});