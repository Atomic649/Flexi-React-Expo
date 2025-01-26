import React, { useEffect, useState } from "react";
import { FlatList, View, Text, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";
import CallAPIProduct from "@/api/product_api";
import { IMAGE_URL } from "@/utils/config";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass, useTextColorClass } from "@/utils/themeUtils";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await CallAPIProduct.getProductsAPI();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch Data from API
    console.log("Fetching Data...");
    setRefreshing(false);
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
            productimage={IMAGE_URL + item.image}
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
    </SafeAreaView>
  );
}
