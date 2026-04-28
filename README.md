# Prot: Sistema de Controle de Estoque

Este é um protótipo funcional de um sistema de gerenciamento de estoque com operações CRUD completas e controle de acesso baseado em cargos, desenvolvido para a Atividade prática.

## Tecnologias Utilizadas
* HTML5
* CSS3
* JavaScript

## Como Executar o Projeto
1. Extraia os arquivos do repositório.
2. Não é necessário instalar nenhuma dependência ou servidor local.
3. Dê um duplo clique no arquivo index.html para abrir em qualquer navegador web.

## Credenciais de Acesso para Teste

O sistema conta com dois usuários pré-cadastrados em memória para testar o controle de rotas e permissões:

| Cargo | Usuário | Senha | Permissões |

| **Administrador** | `admin` | `123` | Acesso total (Criar, Ler, Editar todos, Deletar todos, visualização de áreas restritas). |
| **Usuário Comum** | `user`  | `123` | Acesso restrito (Criar, Ler, Editar apenas produtos criados por ele mesmo. Não pode deletar). |

## Checklist de Requisitos Implementados

- [x] **CRUD Completo:** É possível criar, listar, editar e remover produtos do estoque.
- [x] **Controle de Cargos:** Implementação lógica e visual de dois cargos (`admin` e `user`).
- [x] **Restrição Visual:** - Botão "Excluir" é ocultado para o usuário comum.
  - Botão "Editar" só aparece para o usuário comum nos registros que ele mesmo criou.
  - Mensagens e painéis exclusivos para administradores.
- [x] **Login Simples:** Validação via array de objetos em memória.
- [x] **Interface e Feedback:** Interface estilizada com CSS