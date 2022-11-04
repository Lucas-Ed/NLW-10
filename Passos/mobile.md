# Passo a Passo 
### Todos os comandos e instalações necessários para o projeto mobile.

# Aula 01
## Criando o projeto
[Criar o expo:](https://bit.ly/3U83pN6)
```bash
npx create-expo-app
```
---

Mudar o expo de js para tsx:
1° mudar a extensão do arquivo app.js para tsx
2° Criar o arquivo *tsconfig.json* dentro da pasta principal, e deixa-lo vazio.
3° rodar o expo.

```bash
npx  expo start
```
---

[Tutorial rodar ExpoGo via USB, aqui.](http://bit.ly/3SYlJXv)
Executar o projeto via usb com o app expoGo.
```bash
npm run android
```
---
### Criar pasta SRC e  pasta assets dentro da SRC.
na pasta assets dentro de SRC colocar o logo.svg.
Na pasta asset no direório principal colocar a tela de splash, icons e arquivos png.
---
### Configuração da splash screem.

no arquivo app.json configurar cores da splash
em:

```bash
"splash": {}
```
alterar também além da cor do background alterar:
```bash
"resizeMode": "contain,
```
Para:

```bash
"resizeMode": "cover"
```
que preenche a tela toda
---
### Instalando o Native Base (Bliblioteca UI de components)
[veja a documentação aqui.](http://bit.ly/3U9FcpF)

Para a instalação Typescript rode o seguinte comando no terminal:
```bash
npm install native-base
```
Para poder utilizar svg na aplicação
```bash
npx expo install react-native-svg@12.1.1
```

```bash
npx expo install react-native-safe-area-context@3.3.2
```
---
## Configuração do pakage.json
 adicionar a seguinte propriedad antes de "private".
 isso é para prevenir conflitos  com a versão
```bash
 "overrides": {
    "react": "18.0.0"
  },
```
Fazer a importação do native base no App.tsx
```bash
import { NativeBaseProvider } from "native-base";
```
Continuando dentro do arquivo app.tsx, envolver o retono do html com a tag:
```bash
 <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
```
tudo que estiver entre as tag do native base provider irá permitir que possamos utilizar os recursos do native base.
---
### Customizar o tema do native base

Maneira 1°.
1° Adicionar no import de app.tsx a Vstack, para poder definir posições dos componentes html direto na tag
envolver o conteúdo a ser posicionado, com a tag:
```bash
<Vstack flex={1} bgColor="fuchisia.400" alignItens="center" justifyContent="center">
<Vstack/>
```
Maneira 2°.
1° Adicionar no import de app.tsx, Center, para poder definir posições dos componentes html direto na tag
envolver o conteúdo a ser posicionado, com a tag:
```bash
<Center flex={1} bgColor="fuchisia.400" >
<Center/>
```
Definir cor de textos.
Maneira 2°.
1° Adicionar no import de app.tsx, Text, para poder definir cores das tags html de texto por meio de propriedades, direto na tag
envolver o conteúdo a ser posicionado, com a tag:

```bash
<Text color="black" fontize="24"
<Text/>
```
---
### Instalando fontes personalizadas.
Dentro da pasta SRC criar uma pasta de nome styles e dentro de styles criar um arquivo com o nome theme.ts
para definirmos todos os esquemas de cores que iremos utilizar no App.
o arquivo themes.ts permite sbscrever as cores e fontes.  
```bash
import { extendTheme } from 'native-base'

export const THEME = extendTheme({
	colors: {
		gray: {
			950: '#09090a',
			900: '#121214',
			800: '#202024',
			600: '#323238',
			300: '#8d8d99',
			200: '#c4c4cc'
		},
		green: {
			500: '#047C3F'
		},
		yellow: {
			500: '#F7DD43',
			600: '#bba314'
		},
		red: {
			500: '#db4437'
		},
		white: '#ffffff'
	},
	fonts: {
		heading: 'Roboto_700Bold',
		body: 'Roboto_400Regular',
		medium: 'Roboto_500Medium'
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24
	},
	sizes: {
		14: 56
	}
})
```
para utilizarmos o thema padronizado é só fazermos a importação no arquivo que gostariamos de utilizar, exemplo app.tsx, com o seguinte código:
```bash
import {THEME} from './src/styles/theme';
```
e chamar o thema dentro da tag:
```bash
 <NativeBaseProvider theme={THEME}>
 <NativeBaseProvider />
```
fazendo isso poderemos alterar as propriedades de core de acordo com o arquivo padrão theme.ts
exemplo:

```bash
<Center flex={1} bgColor="gray.900" >
<Center/>
```
---
### Instalação de fonts personalizadas.
1°Escolher a fonte desejada no [Google fonts.](http://bit.ly/3TcxJoI)
2° instalar a bliblioteca do expo: expo-font com o comando:

```bash
npx expo install expo-font @expo-google-fonts/roboto
```
fazer o import no arquivo que será utilizado com o código
passando dentro do import{} as fontes que serão utilizadas:
```bash
import{  useFonts, Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto'
```
e por fim carregar as fontes utilizadas dentro da função que retorna html:
```bash
export default function App() {
  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_500Medium});

 
  return ()
}

```
### Criando o componente de Loading
1° Dentro de SRC criar uma pasta dos components da aplicação de nome components com o arquivo de loading, loading.tsx.
Fazer as importações necessárias e definir as cores do spinner(loading), com o código de exemplo: 

```bash
import {Center, Spinner} from 'native-base';

export function Loading(){
    return (
        <Center flex={1} bg="gray.900">
            <Spinner color='yellow.500'></Spinner>
        </Center>
    )
}
```
em seguida fazer o import onde será utilizado, geralmente usado no arquivo app.tsx dessa forma:
```bash
import { Loading } from './src/components/loading'
```
 # 2° criar tela de SignIn
no mesmo arquivo chamar o component fazendo um ifternário se as fontes tiver carregadas chamar o component SignIn
e depois chamar o Loading.
```bash
export default function App() {
    return (
 {fontsloaded ? <SignIn /> : <Loading />}
)
}
```
Criar dentro de SRC uma pasta de nome screens com um arquivo de nome SignIn.tsx
contendo:
```bash
import{Center, Text} from 'native-base'

export function SignIn(){
    return(
       
        <Center flex={1} bgColor="gray.900" >
        <Text color="white" fontSize={24} fontFamily="heading">
          SigIn
        </Text>
      </Center>
    
)    
}
```
---
### Customizar Status Bar
(Status Bar é a tela superior do celular onde fica bateria sinal etc..)
1° fazer o ipmport da statusbar
```bash
import { NativeBaseProvider, StatusBar } from "native-base";
```
no retorno da função do html chamar a tag de statusbar, e definir as propriedades:
```bash
return(
<StatusBar 
      barStyle="light-content"
      backgroundColor="transparency"
      translucent
/>
)
```
---

# Aula-03
```bash

```
---
```bash

```
---
```bash

```
---