import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: number;
};


export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  const courseOptions = ['Starter', 'Main', 'Dessert', 'Beverage'];
  // this is to add a new menu item if needed
  const addMenuItem = () => {
    if (!name || !description || !price) return;
    const newItem: MenuItem = {
      name,
      description,
      course,
      price: parseFloat(price),
    };
    setMenu((prev) => [...prev, newItem]);
    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };
  
  //calculate both total and average price of menu items
  const calculateStats = () => {
    let total = 0;
    let i = 0;
    while (i < menu.length) {
      total += menu[i].price;
      i++;
    }
    const average = menu.length > 0 ? total / menu.length : 0;
    return { totalItems: menu.length, average };
  };

  const {totalItems, average } = calculateStats();

  //course picker using a for loop
  const renderCourseOptions = () => {
    const options = [];
    for (let i = 0; i < courseOptions.length; i++) {
      options.push(
        <Picker.Item key={i} label={courseOptions[i]} value={courseOptions[i]} />
      );
    }
    return options;
  }

  // a little bit of animation for the menu items
  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text>{item.name} - ${item.price.toFixed(2)}</Text>
        <Text>{item.description}</Text>
      </Animated.View>
    );
  }

  const getDetails = (item: MenuItem) => {
    let details = "";
    for (const key in item) {
      details += `${(item as any)[key]} `;
    }
    return details;
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text>Menu items: {totalItems} — Avg: ${average.toFixed(2)}</Text>
      <StatusBar style="auto" />
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
