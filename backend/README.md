# Hypesoft Backend - Sistema de Gestão de Produtos

Backend desenvolvido em .NET 9 seguindo Clean Architecture + DDD + CQRS para o desafio técnico da Hypesoft.

## Tecnologias

- .NET 9
- MongoDB com Entity Framework Core
- MediatR (CQRS)
- AutoMapper
- JWT Authentication (Keycloak)
- Docker & Docker Compose

## Arquitetura

```
src/
├── Hypesoft.Domain/          # Entidades e interfaces
├── Hypesoft.Application/     # CQRS, DTOs e Handlers
├── Hypesoft.Infrastructure/  # Repositórios e DbContext
└── Hypesoft.API/            # Controllers e configuração
```

## Como Executar

### Com Docker Compose (Recomendado)

```bash
docker-compose up -d
```

### Desenvolvimento Local

```bash
# Restaurar dependências
dotnet restore

# Executar API
cd src/Hypesoft.API
dotnet run
```

## URLs

- API: http://localhost:5000
- Swagger: http://localhost:5000/swagger
- MongoDB Express: http://localhost:8081
- Keycloak: http://localhost:8080

## Funcionalidades

- ✅ CRUD de Produtos
- ✅ Sistema de Categorias
- ✅ Controle de Estoque
- ✅ Dashboard com métricas
- ✅ Autenticação JWT via Keycloak
- ✅ Health Checks
