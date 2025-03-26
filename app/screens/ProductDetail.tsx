// app/screens/ProductDetail.tsx
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/product';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
  
}
const ProductDetail: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { product } = route.params;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Carrito', `Producto "${product.name}" añadido al carrito.`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    Alert.alert('Compra', `Has comprado el producto "${product.name}".`);
  };

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image || 'https://via.placeholder.com/600x400?text=No+Image' }}
            style={styles.image}
            resizeMode="contain"
            onError={() => console.log('Error loading image')}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>
          
          <View style={styles.priceRatingContainer}>
            <Text style={styles.price}>
              {product.price ? `$${product.price.toFixed(2)}` : '$0.00'}
            </Text>
            
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="star" size={20} color="#FFD700" style={styles.starIcon} />
              ))}
              <Text style={styles.ratingText}>(5.0)</Text>
            </View>
          </View>

          <View style={styles.metaContainer}>
            {product.brand && (
              <Text style={styles.metaText}>
                <Text style={styles.bold}>Marca:</Text> {product.brand}
              </Text>
            )}
            {product.category && (
              <Text style={styles.metaText}>
                <Text style={styles.bold}>Categoría:</Text> {product.category}
              </Text>
            )}
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, styles.cartButton]} onPress={handleAddToCart}>
              <Icon name="shopping-cart" size={20} color="white" />
              <Text style={styles.buttonText}>Añadir al carrito</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={handleBuyNow}>
              <Text style={styles.buttonText}>Comprar ahora</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.viewCartButton]} onPress={handleViewCart}>
              <Text style={styles.buttonText}>Ver carrito</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {product.description ? (
            <Text style={styles.description}>{product.description}</Text>
          ) : (
            <Text style={styles.noDescription}>Sin descripción disponible.</Text>
          )}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 8,
    color: '#6b7280',
    fontSize: 14,
  },
  metaContainer: {
    marginBottom: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 5,
  },
  bold: {
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 150,
  },
  cartButton: {
    backgroundColor: '#3b82f6',
    flex: 1,
  },
  buyButton: {
    backgroundColor: '#10b981',
  },
  viewCartButton: {
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  noDescription: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});

export default ProductDetail;