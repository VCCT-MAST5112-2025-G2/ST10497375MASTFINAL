import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

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
  
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <StatusBar style="auto" />
    </View>
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
