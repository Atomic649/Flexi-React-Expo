import React, { useEffect, useState } from "react";
import { FlatList, View, Text, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";
import CallAPIProduct from "@/api/product_api";
import { IMAGE_URL } from "@/utils/config";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass, useTextColorClass } from "@/utils/themeUtils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getMemberId } from "@/utils/utility";

type Product = {
  id: number;
  name: string;
  description: string;
  barcode: string;
  image: string;
  stock: number;
  price: number;
  categoryId: number;
  statusId: number;
  memberId: string;
  createAt: string;
  updateAt: string;
};

export default function Home() {
  const { theme } = useTheme();
  const textColorClass = useTextColorClass();
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const memberId = await getMemberId();
        if (memberId) {
          const response = await CallAPIProduct.getProductsAPI(memberId);
          setProducts(response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch Data from API
    console.log("Fetching Data...");
    setRefreshing(false);
  };

  const getImageUri = (image: string) => {
    return image.startsWith("file://") ? image : IMAGE_URL + image;
  };

  return (
    <SafeAreaView 
    className={`h-full ${useBackgroundColorClass()}`}
    >
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            productname={item.name}
            productprice={item.price}
            productimage={getImageUri(item.image)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className={`text-xl font-semibold  ${textColorClass}`}>
              Products
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className={`text-center ${textColorClass}`}>
            No products found
          </Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 65,
          right: 30,
          backgroundColor: theme === 'dark' ? '#04eccd' : '#04eccd',
          borderRadius: 50,
          padding: 15,
          elevation: 5,
        }}
        onPress={() => {
          router.push("createproduct");
        }}
      >
        <Ionicons name="add" size={24} color={theme === 'dark' ? '#444541' : '#444541'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
