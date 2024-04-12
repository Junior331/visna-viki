# Visna Viki

## App

- https://visna-viki.vercel.app/

## Principais Tecnologias utilizadas

- Vite
- React
- Typescript
- Styled Components

## Instalação

- Clone o repositório com
  ```
  git clone https://github.com/Junior331/visna-viki.git
  ```
- É necessario ter o Node 16 ou superior instalado
- Para iniciar o servidor de desenvolvimento rode os comandos abaixo

```
yarn
yarn dev
```

### To do

- [x] Criar estrutura inicial do projeto
- [x] Implementação de Theme e style components

  ### Pages

  - [x] Home
  - [x] Sign In
  - [x] Sign Up
  - [ ] New project
  - [ ] Edit project
  - [x] Forgot Password
  - [x] Reset Password

  ### Components
    ### Elements
    - [x] Input
    - [x] Button
    - [x] Checkbox
    ### Organism
    - [ ] Menu
    - [x] LayoutAbstract
    ### Modules
    - [ ] Card
    - [ ] Step
    - [ ] Modal
    - [ ] Header
  

### Description of the project structure

- ```Átomo (elements)```: Os átomos são componentes básicos e individuais, como botões, inputs, ícones, etc. Um menu lateral geralmente é composto por diversos elementos, como ícones, textos, talvez até mesmo botões para navegação, e cada um desses elementos pode ser considerado um átomo. No entanto, o menu lateral como um todo é mais complexo do que apenas um único átomo.

- ```Molécula (modules)```: As moléculas são compostas por átomos e têm uma funcionalidade mais complexa. Um menu lateral poderia ser considerado uma molécula se fosse composto por vários átomos (como botões, ícones, etc.) agrupados de uma maneira específica para uma função específica. No entanto, um menu lateral geralmente representa uma parte maior e mais significativa da interface do usuário.

- ```Organismo (organism)```: Os organismos são componentes mais complexos que combinam vários átomos e/ou moléculas para formar uma parte significativa de uma interface. Um menu lateral se encaixa nessa definição, pois geralmente consiste em uma combinação de vários elementos (como itens de menu, ícones, títulos, etc.) agrupados para formar uma parte distinta e funcional da interface do usuário.

- ```Hooks```: Os hooks são funções especiais que permitem que você use o estado e outros recursos do React dentro de componentes de função. Eles foram introduzidos no React 16.8 para permitir o uso de estado e outras funcionalidades anteriormente disponíveis apenas em componentes de classe em componentes de função.

- ```Pages```: Em aplicações React, as páginas geralmente representam as diferentes rotas da aplicação, cada uma correspondendo a uma URL específica. As páginas são componentes React que são renderizados quando o usuário navega para uma determinada rota. Elas são responsáveis por exibir o conteúdo relevante para essa rota específica e podem conter outros componentes React, como formulários, listas, gráficos, etc. As páginas geralmente são compostas por uma combinação de componentes de apresentação e lógica, e podem ser estruturadas de acordo com as necessidades da aplicação.

- ```Context```: A Context API é uma funcionalidade do React que permite compartilhar dados entre componentes sem a necessidade de passá-los explicitamente por meio de props. Ela é especialmente útil quando você tem dados que precisam ser acessados por muitos componentes em diferentes níveis da árvore de componentes. A Context API consiste em três partes principais: o provedor de contexto, o consumidor de contexto e o contexto em si.

- ```Utils```: desempenha um papel crucial na organização e eficiência do código da aplicação. Ela abriga uma variedade de utilitários que são essenciais para diferentes partes da aplicação, ex: (endpoints, renderCustom, types, utils).

- ```Styles (Theme)```: O tema do projeto é uma parte fundamental da estilização da aplicação, definindo as cores, estilos tipográficos e outros aspectos visuais que são aplicados em toda a interface do usuário. Abaixo, descrevo os principais elementos do tema:

- ```Styles (Breakpoints)```: Os breakpoints são pontos de interrupção que definem os diferentes tamanhos de tela em que o layout da aplicação deve ser ajustado para fornecer uma experiência de usuário otimizada. No contexto de uma aplicação web responsiva, os breakpoints são usados para definir quando certos estilos devem ser aplicados com base no tamanho da tela do dispositivo.

- ```Styles (Breakpoints)```:O globalStyled fornece uma base sólida para a estilização global da aplicação, garantindo que todos os elementos sejam estilizados de forma consistente e seguindo as diretrizes de design da aplicação. Ele é uma parte essencial do estilo da aplicação, proporcionando uma experiência visual coesa e agradável para os usuários.

### Project Structure

    ├── src/
    │   ├── assets/
    │   │   ├── icons/
    │   │   │   ├── index
    │   │   └── images/
    │   │   │   ├── import-png.d
    │   │   │   ├── import-svg.d
    │   │   │   ├── index
    │   ├── components/
    │   │   ├── elements/
    │   │   │   ├── input
    │   │   │   ├── button
    │   │   │   └── Checkbox
    │   │   ├── modules/
    │   │   │   ├── card
    │   │   │   ├── Modal
    │   │   │   └── header
    │   │   └── organism/
    │   │   │   ├── menu/
    │   │   │   └── LayoutAbstract
    │   ├── contexts/
    │   │   └── ...
    │   ├── hooks/
    │   │   └── ...
    │   ├── pages/
    │   │   ├── Home
    │   │   ├── SignUp
    │   │   ├── SignIn
    │   │   ├── ResetPassword
    │   │   └── ForgotPassword
    │   ├── routes/
    │   │   └── index
    │   ├── services/
    │   │   ├── mocks/
    │   │   │   └── ....
    │   │   └── services
    │   ├── state/
    │   │   ├── provider
    │   │   └── ....
    │   ├── styles/
    │   │   ├── interfaces
    │   │   │   ├── Color
    │   │   │   ├── index
    │   │   │   └── Typography
    │   │   ├── breakpoints
    │   │   ├── globalStyled
    │   │   ├── Theme
    │   │   └── ThemeType
    ├── public/
    │   └── favicon.png

- O diretório ```src/``` contém todos os componentes do projeto, organizados de acordo com o padrão atomic.
  Cada componente é classificado como ```átomo (atom)```, ```molécula (molecule)``` ou ```organismo (organism)```, conforme
  sua complexidade e reutilização.
