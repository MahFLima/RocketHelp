import React, { useState } from "react";
import { Envelope, Key } from "phosphor-react-native";
import Logo from "../assets/logo_primary.svg";
import auth from "@react-native-firebase/auth";
// import {} from "@expo/vector-icons"

import { VStack, Heading, Icon, useTheme } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Please enter your e-mail and password");
    }
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false)

        if(error.code === 'auth/invalid-email'){
          return Alert.alert('Entrar', "E-mail incorrect")
        }

        if(error.code === 'auth/wrong-password'){
          return Alert.alert('Entrar', 'E-mail or password incorrect')
        }

        if(error.code === 'auth/user-not-found'){
          return Alert.alert('Entrar', 'E-mail or password incorrect')
        }

         return Alert.alert('Entrar', 'Não foi possivel acessar')
      });

     
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
