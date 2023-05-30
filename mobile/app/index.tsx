import { Switch, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NLWLogo from "../src/assets/nlw-logo.svg";
import { Link } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Feather";
import { useState } from "react";
export default function newMemory() {
  const { bottom, top } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);
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
        <TouchableOpacity className="items-center justify-center h-32 border border-gray-500 border-dashed rounded-lg bg-b/20">
          <View className="flex-row items-center gap-2">
            <Icon name="image" color={"#FFF"} />
            <Text className="text-gray-200 test-sm font-body">
              Adicionar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
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
