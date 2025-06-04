## **O que você precisa desenvolver?**

A proposta é criar uma aplicação para gerenciar o cadastro de produtores rurais, com os seguintes dados:

- CPF ou CNPJ
- Nome do produtor
- Nome da fazenda (propriedade)
- Cidade
- Estado
- Área total da fazenda (em hectares)
- Área agricultável (em hectares)
- Área de vegetação (em hectares)
- Safras (ex: Safra 2021, Safra 2022)
- Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café na Safra 2022)

### **Requisitos de negócio**

1. Permitir o cadastro, edição e exclusão de produtores rurais.
2. Validar o CPF ou CNPJ fornecido pelo usuário.
3. Garantir que a soma das áreas agricultável e de vegetação não ultrapasse a área total da fazenda.
4. Permitir o registro de várias culturas plantadas por fazenda do produtor.
5. Um produtor pode estar associado a 0, 1 ou mais propriedades rurais.
6. Uma propriedade rural pode ter 0, 1 ou mais culturas plantadas por safra.
7. Exibir um dashboard com:
   - Total de fazendas cadastradas (quantidade).
   - Total de hectares registrados (área total).
   - Gráficos de pizza:
     - Por estado.
     - Por cultura plantada.
     - Por uso do solo (área agricultável e vegetação).

---

## **Tecnologias sugeridas**

Sabemos que você pode ter seu próprio estilo, mas aqui estão algumas tecnologias e boas práticas que valorizamos:

- **Conceitos**: SOLID, KISS, Clean Code, API Contracts, Testes, Arquitetura em camadas.
- **Documentações**: Para facilitar o entendimento do funcionamento do sistema, é importante incluir um README claro, uma especificação OpenAPI e, caso necessário, diagramas que ajudem a visualizar a arquitetura ou os processos.
- **Bônus**: Se conseguir disponibilizar a aplicação na nuvem e acessível via internet, será um diferencial!

### **Se você for desenvolvedor BACKEND:**

- Desenvolva uma **API REST**.
- Utilize **Docker** para distribuir a aplicação.
- Utilize **Postgres** como banco de dados.
- Crie os endpoints necessários para atender os requisitos de negócio.
- Desenvolva testes unitários e integrados.
- Estruture dados "mockados" para testes.
- Inclua logs para garantir a observabilidade do sistema, facilitando o monitoramento e a identificação de possíveis problemas.
- Utilize um framework de ORM.

#### **Se você for desenvolvedor BACKEND Node:**

- Utilize **TypeScript**.
- Utilize **NestJS** ou **AdonisJS**

**Nota final:** Queremos que você aproveite esse desafio para mostrar suas habilidades, mas também para aprender e se divertir. Se tiver dúvidas ou precisar de alguma orientação durante o processo, estamos aqui para ajudar! Boa sorte! 🌟
