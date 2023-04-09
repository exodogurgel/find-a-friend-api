## App

FindAFriend style app.

### RFs (Requisitos funcionais)

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

### RNs (Regras de negócio)

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### RNFs (Requisitos não-funcionais)

- [x] A senha da ORG precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Uma ORG deve ser identificado por um JWT (JSON Web Token);

name:
age: [filhote, adolescente, adulto/idoso]
description:
images: []
energy: quantidade de energia que o animal tem de 1 q 5
independence: [baixo, médio, alto]
size: [pequeno, mediano, grande]
type: [cat, dog]
ambient: tamanho do ambiente que o animal precisa ['Ambiente amplo', Ambiente pequeno, Ambiente médio]
address: {rua, bairro, cidade, estado, numero}
phone:
requisites para adoção:
