// app/screens/CatalogScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProducts } from '../api/DevTreeAPI'; // Asegúrate de que esta función esté adaptada para RN
import { Product } from '../types/product';

const CatalogScreen: React.FC = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    (searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.content}>
        {/* Filtro de Categoría y Buscador */}
        <View style={styles.filterRow}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={value => setSelectedCategory(value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar categoría" value="" />
              {
                // Extraemos las categorías únicas
                [...new Set(products.map(p => p.category))].map(category => (
                  <Picker.Item key={category} label={category} value={category} />
                ))
              }
            </Picker>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Buscar productos..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Tarjetas de Productos */}
        <View style={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <View key={product.name} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <TouchableOpacity
                    style={styles.detailButton}
                   
                  >
                    <Text style={styles.detailButtonText}>Ver detalle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noProducts}>No se encontraron productos.</Text>
          )}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  pickerContainer: { flex: 1, marginRight: 8, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8 },
  picker: { height: 50, width: '100%' },
  searchContainer: { flex: 2 },
  searchInput: {
    height: 50,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  productsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: {
    backgroundColor: '#fff',
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: { width: '100%', height: 120, resizeMode: 'cover' },
  productInfo: { padding: 8 },
  productName: { fontSize: 16, fontWeight: '600', color: '#333' },
  productDescription: { fontSize: 14, color: '#555', marginVertical: 4 },
  detailButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  detailButtonText: { color: '#fff', fontSize: 14 },
  noProducts: { textAlign: 'center', color: '#555', fontSize: 16, marginTop: 20 },
});

export default CatalogScreen;
