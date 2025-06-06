# BMI Fit

**BMI Fit** é uma aplicação web do tipo **Single Page Application (SPA)** desenvolvida com **Angular**, como parte da disciplina *Modelos, Métodos e Técnicas da Engenharia de Software*. O sistema tem como objetivo auxiliar pessoas de baixa renda no cálculo do **Índice de Massa Corporal (IMC)** e na criação de **planos de treino e dieta** personalizados para promoção da saúde.

---

## 👨‍💻 Integrantes do Grupo

- Enzo Nascimento Cabrera — 202320732  
- Geziel Oliveira Silva — 202313071  
- Tannus Koussa Neto — 202313269  
- William Menezes Damascena — 202512580

---

## 🚀 Tecnologias Utilizadas

- **Angular 17**
- **TypeScript**
- **PrimeNG 17**
- **PrimeFlex 3.3**

---

## 🗂️ Estrutura do Projeto

A estrutura segue o padrão Angular, com os seguintes módulos principais:

- **layout/**: Componentes de interface como footer, topbar, sidebar e menu.
- **view/**: Componentes que concentram a lógica de negócio.
  - **auth/**: Módulos, componentes e serviços de autenticação.
  - **dashboard/**: Módulos, componentes e serviços da área principal do sistema.

---

## ✅ Funcionalidades

### 👤 Usuários
- **Cadastro**: Registro de novos usuários.
- **Login**: Autenticação de acesso.

### 📏 IMC
- **Avaliação física**: Formulário para coleta de dados e cálculo do IMC.
- **Dashboard**: Exibição dos dados informados.

### 🏋️‍♂️ Treinos
- **Criação de treinos**: Disponível após a avaliação física.
- **Redefinição de treinos**: Atualização dos treinos cadastrados.

### 🥗 Dietas
- **Criação de dietas**: Considera restrições alimentares.
- **Redefinição de dietas**: Permite editar ou substituir planos alimentares.
