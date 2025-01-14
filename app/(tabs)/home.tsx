// rnf
import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, RefreshControl } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import ProductCard from '@/components/ProductCard'
import CallAPIProduct from '@/api/product_api'
import { IMAGE_URL } from '@/utils/config';


type Product = {
  id: number
  name: string
  description: string
  barcode: string
  image: string
  stock: number
  price: number
  categoryId: number   
  statusId: number
  memberId: string
  createAt : string
  updateAt : string
}

export default function Home() {
  
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await CallAPIProduct.getProductsAPI()
        setProducts(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    // Fetch Data from API
    console.log('Fetching Data...')
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='px-4 bg-primary h-full'>
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
          <View className="flex my-6 px-4 space-y-6">
              <Text className="text-2xl font-semibold text-white">Products</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-white">No products found</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}
