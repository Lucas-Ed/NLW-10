import { NativeBaseProvider, StatusBar } from "native-base";
import{  useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';
import { SigIn } from './src/screens/SignIn'; 
import { Loading } from './src/components/Loading';
import { THEME } from './src/styles/theme';
import React from "react";
import { AuthContextProvider } from "./src/contexts/AuthContext";


export default function App() {

  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});


  return (
   
    <NativeBaseProvider theme={THEME}>

      {/* Com a tag abaixo e no fechamento podemos compartilhar o contexto onde queremos */}
     <AuthContextProvider>
      <StatusBar 
      barStyle="light-content"
      backgroundColor="transparency"
      translucent
/>

                 {/* SigIn */}
     {fontsloaded ? <SigIn />: <Loading />}
     </AuthContextProvider>
    </NativeBaseProvider>

  );
}
