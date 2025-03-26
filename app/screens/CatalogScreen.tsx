// app/screens/CatalogScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Platform, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProducts } from '../api/DevTreeAPI';
import { Product } from '../types/product';

const CatalogScreen: React.FC = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchSearch = searchQuery ? 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchCategory = selectedCategory ? 
      product.category === selectedCategory : true;
    const matchBrand = selectedBrand ? 
      product.brand === selectedBrand : true;
    const price = product.price || 0;
    const matchMin = minPrice ? price >= parseFloat(minPrice) : true;
    const matchMax = maxPrice ? price <= parseFloat(maxPrice) : true;
    
    return matchSearch && matchCategory && matchBrand && matchMin && matchMax;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
             style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        {item.brand && <Text style={styles.brandText}>Marca: {item.brand}</Text>}
        {item.price && <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Catálogo</Text>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar productos..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        {/* Botones de Filtros y Categoría */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => setShowCategoryModal(true)}
          >
            <Icon name="th-large" size={16} color="white" />
            <Text style={styles.buttonText}>Categoría</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Icon name="filter" size={16} color="white" />
            <Text style={styles.buttonText}>Filtros</Text>
          </TouchableOpacity>
        </View>

        {/* Categoría seleccionada */}
        {selectedCategory && (
          <View style={styles.selectedCategoryContainer}>
            <Text style={styles.selectedCategoryText}>
              Categoría seleccionada: {selectedCategory}
            </Text>
            <TouchableOpacity onPress={() => setSelectedCategory('')}>
              <Icon name="times-circle" size={18} color="#666" />
            </TouchableOpacity>
          </View>
        )}

        {/* Loading */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.loadingText}>Cargando productos...</Text>
          </View>
        ) : (
          <>
            {/* Lista de Productos */}
            <FlatList
              data={currentProducts}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              numColumns={2}
              columnWrapperStyle={styles.productsContainer}
              ListEmptyComponent={
                <Text style={styles.noProducts}>No se encontraron productos</Text>
              }
            />

            {/* Paginación */}
            {totalPages > 1 && (
              <View style={styles.pagination}>
                <TouchableOpacity
                  onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={[styles.pageButton, currentPage === 1 && styles.disabled]}
                >
                  <Icon name="arrow-left" size={16} color="#2563EB" />
                  <Text style={styles.pageText}>Anterior</Text>
                </TouchableOpacity>

                <Text style={styles.pageCount}>
                  Página {currentPage} de {totalPages}
                </Text>

                <TouchableOpacity
                  onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={[styles.pageButton, currentPage === totalPages && styles.disabled]}
                >
                  <Text style={styles.pageText}>Siguiente</Text>
                  <Icon name="arrow-right" size={16} color="#2563EB" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Modal Categorías */}
      <Modal isVisible={showCategoryModal} onBackdropPress={() => setShowCategoryModal(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategoryItem
              ]}
              onPress={() => {
                setSelectedCategory(prev => (prev === category ? '' : category) || '');
                setShowCategoryModal(false);
              }}
            >
              <Text style={styles.categoryItemText}>{category}</Text>
              {selectedCategory === category && (
                <Icon name="check" size={16} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowCategoryModal(false)}
          >
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal Filtros */}
      <Modal isVisible={showFilterModal} onBackdropPress={() => setShowFilterModal(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtros Avanzados</Text>
          
          <Text style={styles.filterLabel}>Marca:</Text>
          <Picker
            selectedValue={selectedBrand}
            onValueChange={setSelectedBrand}
            style={styles.modalPicker}
          >
            <Picker.Item label="Todas las marcas" value="" />
            {brands.map(brand => (
              <Picker.Item key={brand} label={brand} value={brand} />
            ))}
          </Picker>

          <Text style={styles.filterLabel}>Rango de Precio:</Text>
          <View style={styles.priceRow}>
            <TextInput
              style={styles.priceInput}
              placeholder="Mínimo"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Máximo"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowFilterModal(false)}
          >
            <Text style={styles.modalButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  selectedCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedCategoryText: {
    color: '#475569',
    fontWeight: '500',
  },
  productsContainer: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#F8FAFC',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  noProducts: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
  pageText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  pageCount: {
    color: '#666',
  },
  disabled: {
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  selectedCategoryItem: {
    backgroundColor: '#f1f5f9',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#334155',
  },
  modalButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  filterLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    marginTop: 12,
  },
  modalPicker: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#333',
  },
  priceSeparator: {
    color: '#666',
    fontSize: 16,
  },
});

export default CatalogScreen;