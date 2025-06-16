# 🌱 Brain Agriculture API

API RESTful desenvolvida com NestJS, PostgreSQL, TypeORM e validações robustas para gerenciar:

- Produtores rurais (com CPF ou CNPJ)
- Propriedades rurais
- Culturas por safra (crops)
- Associação entre propriedades e culturas

## 🚀 Deploy (Swagger)
Você pode explorar a API documentada e testá-la via Swagger:

🔗 [https://brain-agriculture-vum0.onrender.com/api](https://brain-agriculture-vum0.onrender.com/api)

---

## 🧰 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)

---

## 📦 Como rodar o projeto

### ✅ Pré-requisitos

- Docker e Docker Compose instalados **OU**
- Node.js (v18+), Yarn

---

### 🐳 Usando Docker (recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/solebellsBEACH/brain-agriculture.git
cd brain-agriculture

# 2. Suba o ambiente
docker-compose up --build

# A API estará disponível em http://localhost:3000
# Swagger: http://localhost:3000/api
