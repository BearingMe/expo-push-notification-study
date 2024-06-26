# Push Notifications com Expo e Firebase

## Descrição

Exemplo de como enviar notificações push para dispositivos móveis utilizando o Expo, Firebase Cloud Messaging e Notifee.

## Pré-requisitos
- Node.js e npm instalados
- Expo CLI instalado globalmente (npm install -g expo-cli)
- Android SDK e Java 17 instalados

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/BearingMe/expo-push-notification-study
```

2. Navegue até o diretório do projeto:

```bash
cd expo-push-notification-study
```

3. Instale as dependências:
```
npm install
```

Por se tratar de dependências nativas, não é posível executar com Expo Go. Para testar a aplicação, é necessário gerar uma build de desenvolvimento e instalar no dispositivo.

```bash
npm run android
```

ou gerar uma build local com o EAS Build:

```bash
npx eas build --platform android --profile development --local
```

## Configuração

1. Registre o aplicativo no console do Firebase.

2. Baixe o arquivo google-service.json fornecido pelo Firebase.

3. Configure o arquivo app.json no seu projeto Expo com o google-service.json:

```json
{
  "expo": {
    ...
    "android": {
      ...
      "googleServicesFile": "./google-services.json",
    },
    ...
  }
}
```

4. Crie uma build com o development client:

```bash
npm run android
```
Nota: npx expo run:android pode causar erro

## Obtendo o Token do Dispositivo

Por padrão o token será exibido no console do Expo. Também irá aparecer na tela inicial do aplicativo.
Caso seu emulador suporte, é possível copiar o token diretamente do dispositivo.


## Envio de Notificações

1. Crie um arquivo de acesso para o SDK do Firebase:
Acesse https://console.firebase.google.com/project/<id_projeto>/settings/serviceaccounts/adminsdk
Gere uma chave privada e salve o arquivo. Este processo pode ser feito várias vezes, mas cada arquivo é único e só pode ser baixado uma vez.

2. Baixe o google_service.json:
Vá em Configuração do Projeto (clique na engrenagem próxima a "Visão de Projeto"). No final da aba Geral, há um botão para baixar o Google Services. Use esse arquivo nos aplicativos que receberão notificações, seguindo as instruções na seção de Notificações.

3. [Opção 01] - Use REST para enviar a notificação:  
   - Utilize o arquivo de acesso para o SDK gerar um token de autorização.
  Isso pode ser feito diretamente pela biblioteca do Google Auth (não confunda com firebase-admin) para backend.
  Ou pode ser feito pelo CLI do Google.  
   - Use o token gerado para fazer uma requisição POST para https://fcm.googleapis.com/v1/projects/<id_projeto>/messages:send.
  O token expira em cerca de uma hora.

5. [Opção 02] Também é possível enviar notificações pelo console do Firebase ou a biblioteca firebase-admin. Caso deseje utilizar a biblioteca, instale-a no backend:
```bash
npm install firebase-admin
```

```typescript
import * as admin from 'firebase-admin';
import * as serviceAccount from 'path/to/serviceAccountKey.json'; // Ative a opção de importação de módulos no tsconfig.json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  data: {
    title: 'Título da Notificação',
    body: 'Corpo da Notificação
  },
  token: 'token do dispositivo',
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
```

## Referências
- [Notifee](https://notifee.app/)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
