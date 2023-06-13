import Icon from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NLWLogo from "../src/assets/nlw-logo.svg";
import { api } from "../src/lib/api";
import { MemoryProps } from "./props";
import dayjs from "dayjs";
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr);

export default function newMemory() {
  const [memories, setMemories] = useState<MemoryProps[]>([])
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();

  async function signOut() {
    await SecureStore.deleteItemAsync('token');

    router.push('/');
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token');

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemories(response.data);
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return(
    <ScrollView
    className="flex-1 px-8"
    contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
  >
    <View className="flex-row items-center justify-between mt-4">
      <NLWLogo />

      <View className="flex-row gap-2">
      <TouchableOpacity 
        className="items-center justify-center w-10 h-10 bg-red-500 rounded-full"
        onPress={signOut}
      >
          <Icon name="log-out" size={16} color={'#000'} />
        </TouchableOpacity>
      <Link href="/new" asChild>
        <TouchableOpacity className="items-center justify-center w-10 h-10 bg-green-500 rounded-full">
          <Icon name="plus" size={16} color={'#000'} />
        </TouchableOpacity>
      </Link>

      </View>
    </View>

    <View className="mt-6 space-y-10">
      {memories.map((memory) => {
        return (
          <View  key={memory.id}className="space-y-4">
            <View className="flex-row items-center gap-2">
              <View className="w-5 h-px bg-gray-50" />
              <Text className="text-xs text-gray-100 font-body">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>
            <View className="px-8 space-y-4">
              <Image source={{
                uri: memory.coverUrl
              }}
              className="w-full rounded-lg aspect-video"
              alt=''
              />
              <Text className="text-base leading-relaxed text-gray-100 font-body">
                {memory.excerpt}
              </Text>
              <Link href={'/memories/id'} asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="text-sm text-gray-200 font-body">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0"/>
                </TouchableOpacity>
              </Link>
            </View>

          </View>

        )

      })}
    </View>
  </ScrollView>
  )
}