# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# prova-react
# 🚀 Estrutura e Componentes (Branch main)

## 1. Estrutura de Pastas

```text
meu-primeiro-projeto/
├── node_modules/       # Onde moram as bibliotecas que instalamos (ignorar)
├── public/             # Arquivos estáticos (ícones, favicons)
│   ├── favicon.svg
│   └── icons.svg
├── src/                # A pasta sagrada! Seu código mora aqui.
│   ├── assets/         # Imagens e outros recursos locais
│   │   ├── hero.png
│   │   └── vite.svg
│   ├── components/     # Nossos componentes divididos por assunto
│   │   ├── A_SimpleText.jsx
│   │   ├── B_PropsExample.jsx
│   │   ├── C_StateExample.jsx
│   │   ├── D_EffectExample.jsx
│   │   └── E_ReusableCard.jsx
│   ├── App.jsx         # Componente Principal da página
│   ├── index.css       # Estilos Globais e Variáveis de Cor
│   └── main.jsx        # Ponto de entrada, liga o React ao HTML
├── index.html          # O arquivo base que carrega sua aplicação
├── package.json        # A "certidão de nascimento" com dependências
└── vite.config.js      # Arquivo de configuração do compilador Vite
```

---

## 2. Códigos dos Componentes

### A. Componente Básico (`A_SimpleText.jsx`)
Retorna HTML estático. É uma função com o nome iniciando em letra Maiúscula que devolve um bloco de tag. Sem mais.

```jsx
// src/components/A_SimpleText.jsx
import React from 'react';

// Este é um Componente Funcional.
// Em React, componentes são apenas funções JavaScript que retornam JSX (uma mistura de HTML com JS).
function SimpleText() {
  return (
    <div className="component-demo">
      <p>
        Olá! Eu sou o componente mais básico possível.
        Apenas retorno uma tag de texto estática usando JSX.
      </p>
    </div>
  );
}

export default SimpleText;
```

### B. Props (Propriedades) (`B_PropsExample.jsx`)
"Props" são os argumentos das funções. Quer ter um botão vermelho e um azul na mesma página usando o mesmo componente "Botão"? Passe cores diferentes como "props".
Ex: `<MeuBotao color="red" />` e `<MeuBotao color="blue" />`

```jsx
// src/components/B_PropsExample.jsx
import React from 'react';

// Este componente recebe "props" (propriedades) como argumento.
// Props permitem que você passe dados do componente pai para o componente filho.
function PropsExample(props) {
  // Acessamos as propriedades passadas usando props.nomeDaPropriedade
  return (
    <div className="component-demo">
      <p>
        Olá, <strong>{props.name}</strong>! Perceba como meu conteúdo mudou.
        Você me passou a cor: <span style={{ color: props.color }}>{props.color}</span>.
      </p>
    </div>
  );
}

export default PropsExample;
```

### C. Estado - `useState` (`C_StateExample.jsx`)
"Estado" é a memória do componente! Quando precisamos que um número mude de 0 para 1 ao clicar em um botão, usamos o **useState**. Toda vez que o estado muda, a tela é re-desenhada magicamente para mostrar o novo número.

```jsx
// src/components/C_StateExample.jsx
import React, { useState } from 'react';

// "Estado" (State) é como a memória do componente.
// Quando o estado muda, o React recria (renderiza) o componente na tela com a nova informação.
function StateExample() {
  // useState retorna um array com duas coisas:
  // 1. O valor atual (count)
  // 2. Uma função para atualizar esse valor (setCount)
  const [count, setCount] = useState(0);

  function handleIncrement() {
    // Chamamos a função de atualização para mudar o estado
    setCount(count + 1);
  }

  return (
    <div className="component-demo">
      <p style={{ marginBottom: '1rem' }}>
        Você clicou <strong>{count}</strong> vezes.
      </p>
      {/* Associamos nossa função ao evento de clique do botão */}
      <button onClick={handleIncrement}>
        Clique aqui para somar!
      </button>
    </div>
  );
}

export default StateExample;
```

### D. Efeitos Colaterais - `useEffect` (`D_EffectExample.jsx`)
Quando algo precisa acontecer fora renderização normal (ex: iniciar um temporizador, buscar fotos na web, rastrear rolagens na página), chamamos um "efeito". O que vai ali não atrapalha a tela aparecer primeiro para o usuário.

```jsx
// src/components/D_EffectExample.jsx
import React, { useState, useEffect } from 'react';

// "Efeitos" (useEffect) permitem executar código fora do fluxo padrão de renderização.
// Muito útil para buscar dados na internet, atualizar o título da página ou definir temporizadores.
function EffectExample() {
  const [seconds, setSeconds] = useState(0);

  // O useEffect roda uma função assim que o componente aparece na tela (quando montado).
  useEffect(() => {
    // Iniciamos um temporizador (efeito colateral)
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // É uma boa prática avisar como "limpar" o efeito quando o componente sumir
    return () => {
      clearInterval(intervalId);
    };
  }, []); // O array vazio [] significa "execute apenas uma vez quando o componente nascer"

  return (
    <div className="component-demo">
      <p>
        Tempo de tela: <strong>{seconds} segundos</strong>.
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Esse relógio é um "efeito colateral" rodando através do hook `useEffect`.
      </p>
    </div>
  );
}

export default EffectExample;
```

### E. Componentes Reutilizáveis (`E_ReusableCard.jsx`)
Em `App.jsx`, você vai notar que invocamos o `<ReusableCard />` várias vezes apenas trocando o título. É assim que garantimos organização: você escreve o visual da caixinha uma única vez, mas injeta diferentes textos ali!

```jsx
// src/components/E_ReusableCard.jsx
import React from 'react';

// Um componente reutilizável é desenhado para ser invocado múltiplas vezes!
// Aqui destruturamos as props diretamente: em vez de 'props.title', usamos '{ title }'.
function ReusableCard({ title, description }) {
  return (
    <div className="reusable-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ReusableCard;
```
