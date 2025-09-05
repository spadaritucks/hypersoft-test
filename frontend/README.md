# Hypesoft Frontend - Sistema de Gestão de Produtos

Frontend desenvolvido em Next.js 14 com TypeScript para o desafio técnico da Hypesoft.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de interface modernos
- **TanStack Query** - Gerenciamento de estado e cache
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Recharts** - Biblioteca de gráficos
- **Vitest** - Framework de testes

## 🏗️ Arquitetura

```
src/
├── app/                    # App Router do Next.js
│   ├── dashboard/         # Página do dashboard
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial (login)
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── forms/            # Componentes de formulário
│   ├── charts/           # Componentes de gráficos
│   ├── tables/           # Componentes de tabela
│   ├── layout/           # Componentes de layout
│   └── skeletons/        # Componentes de loading
├── services/             # Serviços de API
├── stores/               # Contextos e providers
├── types/                # Definições de tipos TypeScript
├── hooks/                # Custom hooks
├── utils/                # Funções utilitárias
└── env/                  # Configuração de variáveis de ambiente
```

## 🎯 Funcionalidades

### ✅ Implementadas

- **🔐 Autenticação**
  - Login integrado com Keycloak
  - Proteção de rotas com middleware
  - Gerenciamento de tokens JWT

- **📊 Dashboard**
  - Total de produtos cadastrados
  - Valor total do estoque
  - Produtos com estoque baixo
  - Gráfico de produtos por categoria

- **📦 Gestão de Produtos**
  - Listagem com paginação
  - Busca por nome
  - Filtro por categoria
  - CRUD completo (Criar, Editar, Excluir)
  - Atualização de estoque

- **🏷️ Gestão de Categorias**
  - Listagem de categorias
  - Criação de novas categorias
  - Exclusão de categorias

- **🎨 Interface**
  - Design moderno e responsivo
  - Componentes reutilizáveis
  - Loading states e skeletons
  - Feedback visual com toasts

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 18+
- Backend rodando (API + Keycloak)

### Instalação

```bash
# Instale as dependências
npm install
```

### Configuração

1. **Configure as variáveis de ambiente no arquivo `.env.local`:**
```env
NEXT_API_URL=http://localhost:5000
NEXT_KEYCLOCK_URL=http://localhost:8080
NEXT_KEYCLOCK_REALM=hypesoft
NEXT_KEYCLOCK_CLIENT_ID=hypesoft-frontend
```

### Desenvolvimento

```bash
# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
# Gere o build de produção
npm run build

# Execute o servidor de produção
npm start
```

## 🧪 Testes

```bash
# Execute os testes
npm test
```

## 📁 Componentes Principais

- **`AuthLayout`** - Layout para páginas autenticadas
- **`LoginForm`** - Formulário de login
- **`Dashboard`** - Página principal do dashboard
- **`ProductsListTable`** - Tabela de produtos
- **`CategoriesListTable`** - Tabela de categorias
- **`Summary`** - Resumo com métricas

## 🔧 Integração com API

### Serviços Implementados

- **`AuthService`** - Autenticação com Keycloak
- **`ProductsService`** - CRUD de produtos
- **`CategoriesService`** - CRUD de categorias
- **`DashboardService`** - Métricas do dashboard

### Exemplo de Uso

```typescript
// Listar produtos
const products = await GetAllProductsService(page, size)

// Criar produto
const newProduct = await CreateProductsService(productData)

// Obter métricas do dashboard
const dashboard = await GetDashboardService()
```

## 🎨 Design System

### Cores
- **Primary**: Violeta (#8B5CF6)
- **Secondary**: Cinza (#6B7280)
- **Success**: Verde (#10B981)
- **Warning**: Amarelo (#F59E0B)
- **Error**: Vermelho (#EF4444)

### Componentes
- Interface responsiva (mobile, tablet, desktop)
- Componentes reutilizáveis com TailwindCSS
- Ícones com Lucide React
- Gráficos com Recharts

## 🔒 Segurança

- JWT tokens armazenados em cookies httpOnly
- Middleware de proteção de rotas
- Validação client-side com Zod
- Headers de segurança configurados

## 📱 Responsividade

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance

- Code splitting automático do Next.js
- Lazy loading de componentes
- Cache com TanStack Query
- Otimização de imagens

## 📚 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting do código
npm test             # Executar testes
```

## 🤝 Contribuição

### Padrões de Código

- **ESLint** configurado
- **TypeScript** strict mode
- **Conventional Commits** para commits

### Estrutura de Commits

```bash
feat(products): add bulk import functionality
fix(auth): resolve token validation issue
docs(readme): update installation instructions
```

---

**Desenvolvido para o desafio técnico da Hypesoft**