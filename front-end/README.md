# Rodar o projeto

para rodar o projeto, basta apenas instalar as depedências por npm i, use a versão estável do node v16.13.1 (npm v8.1.2)

# Json server
https://www.npmjs.com/package/json-server#getting-started
siga os passos do link acima, prepare objetos referente aos diagramas do projeto.
json-server --watch db.json para rodar o db mockado
OBS: db.json na raiz do projeto

# Refatoração
refatorar os formulários seguindo o exemplo abaixo: 
```
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label>
        Nome:
        <input type="text" v-model="form.nome" />
      </label>
      <label>
        E-mail:
        <input type="email" v-model="form.email" />
      </label>
      <label>
        Senha:
        <input type="password" v-model="form.senha" />
      </label>
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Formulario",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.form = { ...this.value };
  },
  methods: {
    handleSubmit() {
      this.$emit("input", this.form);
    },
  },
};
</script>
```
## To-do list prioritário
- [ ] 'Dockerização' do ambiente - todo;
- [ ] Informações do contrato no view vehicle;
- [ ] Documentos para imprimir - em andamento;
- [x] Formulário crud de contratos crud igual a todos os outros. - plano e cliente;
- [ ] Funcionamento por unidades;
- [ ] Dashboard interativo;
- [ ] Regras de usuários - (será necessário refazer fluxo de login);
- [ ] Regras clientes ativos e inativos;
- [ ] Tratativas de gerência;
- [ ] Gerência - só amostra;
- [X] Listagem de contratos;
- [x] Planos e ocorrencia crud completo;
- [x] Sessão para edição de usuário logado;
- [X] Consertar formulário de edição tanto do perfil quanto das senhas;
- [x] Terminar o view dos veículos;
- [x] Terminar o view dos clientes;
- [X] Adicionar campos faltantes no formulário de unidades;
- [x] 'Ver mais' das unidades;
- [x] Regras usuários desativados;
- [x] Gateways, usecase e store de contratos;
- [X] Conseguir finalizar cadastro de cliente e veículo;
- [x] Retirar a obrigatoriedade km e cilindrada no cadastro de veiculo;
- [x] O espaço onde coloca o nome do proprietário do veículo não pode ser puxado do cadastro do cliente, tem que ser um espaço livre para poder cadastrar qualquer pessoa, pq nem sempre o cliente é o proprietário legal do veículo;
- [x] No campo condições do veículos, não precisa colocar coisas específicas como cano de escape, tanque amassado, etc. Tem que deixar apenas um espaço em branco para poder colocar qualquer observação que o veículo tenha;


## To-do list não prioritário
- [ ] Substituir actions de usuário pelo uso do endpoint de profile;
- [ ] Login funcional com refresh token - melhoria futura;
- [ ] Upgrade para Vue 3;
- [ ] Alterar componentes para Bootstrap;


 
