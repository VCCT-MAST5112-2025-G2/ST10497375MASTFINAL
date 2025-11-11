import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
// defining the menu item types in order to be able to use them


export default function MenuScreen({ navigation, menu = [], setMenu = () => {} }) {

  
  // stating all the variables used for the menu items
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const courseOptions = ["Appetizer", "Main course", "Dessert", "Drinks"];
  
  //allows the chef to add menu items
  const addMenuItem = () => {
    if (!name || !description || !course || !price) return;
    const parsed = parseFloat(price);
    if (isNaN(parsed)) return;
    
    const newItem = {
      name,
      description,
      course,
      price: parsed,
    };
    setMenu([...menu, newItem]);
    clearInputs();
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setCourse("");
    setPrice("");
  };

  //calculate the average price using a while loop
  const getAveragePrice = () => {
    if (menu.length === 0) return 0;
    let total = 0;
    let i = 0;
    while (i < menu.length) {
      total += menu[i].price;
      i++;
    }
    return total / menu.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Chef's menu</Text>

      {/* input fields for the menu items which helps the user add all necessary info where it needs to be*/}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Course" value={course} onChangeText={setCourse} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />

      {/* display and buttons to add items */}
      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.courseOContainer}>
        {courseOptions.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setCourse(item)}
            style={[styles.courseButton, course === item && styles.selectedCourse]}
          >
            <Text style={[styles.courseText, course === item && styles.selectedCourseText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.homeButtonText}>Back Home</Text>
      </TouchableOpacity>

          {/* this helps to calculate the average price of the total items */}
      <Text style={styles.label}>
        Menu ({menu.length}) — Avg price: R{getAveragePrice().toFixed(2)}
      </Text>
          {/* scrol view helps to display everything the user adds to the menu */}
      <ScrollView style={styles.menuList}>
        {menu.map((m, idx) => (
          <View key={idx} style={styles.menuItem}>
            <Text style={styles.menuName}>
              {m.name} — R{m.price.toFixed(2)}
            </Text>
            <Text style={styles.menuCourse}>
              {m.course} • {m.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
     padding: 16, 
     backgroundColor: "#fff" 
    },


  title: { fontSize: 24,
     fontWeight: "bold",
      marginBottom: 12 
    },
  
  
    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },


  label: { fontSize: 16,
     marginVertical: 8 
    },

  courseOContainer: { 
    flexDirection: "row",
     flexWrap: "wrap",
      marginBottom: 12 
    },

  courseButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#888",
    marginRight: 8,
    marginBottom: 8,
  },
  
  selectedCourse: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  
  courseText: { color: "#000"

   },
  
   selectedCourseText: { 
    color: "#fff"
   },
  
  
   addButton: {
    backgroundColor: "#236cc6ff",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },


  addButtonText: { 
    color: "#fff", 
    fontWeight: "600"
   },
  
   menuList: { 
    flex: 1 
  },
  
  menuItem: { padding: 10,
     borderBottomWidth: 1,
      borderBottomColor: "#eee" 
    },

  menuName: { fontWeight: "600" 
  },


  menuCourse: { color: "#555",
     marginTop: 4 
    },

  });

