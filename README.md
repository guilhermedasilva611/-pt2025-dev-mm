# Sistema de Pagamento

## Como Rodar o Projeto

### Backend (Spring Boot)

1. Entre na pasta do backend:
```bash
cd backend
```

2. Execute o projeto:
```bash
# Windows
./mvnw spring-boot:run

# Linux/Mac
chmod +x mvnw
./mvnw spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### Frontend (React)

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Variáveis de Ambiente

### Frontend
Crie um arquivo `.env` na pasta `frontend` com:

```env
VITE_API_URL=http://localhost:8080/api
```

### Backend
Configure em `backend/src/main/resources/application.properties`:

```properties
server.port=8080
spring.application.name=payment-api
```

## Endpoints Disponíveis

- POST `http://localhost:8080/api/payments` - Processar pagamento 