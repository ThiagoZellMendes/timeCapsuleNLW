import { Image, Switch, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NLWLogo from "../src/assets/nlw-logo.svg";
import { Link, useRouter } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Feather";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';
import { api } from "../src/lib/api";

export default function newMemory() {
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.assets[0]) {
        setPreview(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token');

    let coverUrl = '';

    if(preview) {
      const uploadFormData = new FormData();

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)
      
      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data', // obrigatorio no android.
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories', 
      {
        content,
        isPublic,
        coverUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    router.push('/memories')
  }
  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between mt-4">
        <NLWLogo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="items-center justify-center w-10 h-10 bg-purple-500 rounded-full">
            <Icon name="arrow-left" size={16} color={"#FFF"} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: "#767577", true: "#372568" }}
            thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
          />
          <Text className="text-base text-gray-200 font-body">
            Tornar memória pública
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="items-center justify-center h-32 border border-gray-500 border-dashed rounded-lg bg-b/20"
        >
          {preview ? (
            <Image source={{ uri: preview }} className="object-cover w-full h-full rounded-lg" />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color={"#FFF"} />
              <Text className="text-gray-200 test-sm font-body">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          textAlignVertical="top"
          className="p-0 text-lg font-body text-gray-50"
          placeholderTextColor={"#56565a"}
          placeholder="Fiquei livre para adicionar fotos, vídeos e relatos sobre suas experiencias"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center px-5 py-2 bg-green-500 rounded-full "
        >
          <Text className="text-sm text-black uppercase font-alt">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
