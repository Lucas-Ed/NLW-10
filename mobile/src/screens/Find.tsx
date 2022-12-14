import { useState } from 'react'
import { Heading, VStack, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { api } from '../services/api'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/button'

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          title: 'Insira o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      await api.post('/pools/join', { code })
      toast.show({
        title: 'Bolão acessado com sucesso!',
        placement: 'top',
        bgColor: 'yellow.500'
      })
      navigate('pools')
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      if (error.response?.data?.message === 'Pool not found.') {
        return toast.show({
          title: 'Algo deu errado, bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (error.response?.data?.message === 'You already joined this pool.') {
        return toast.show({
          title: 'Você já participa desse bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Bolão não encontrado',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          value={code}
          autoCapitalize="characters"
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  )
}
