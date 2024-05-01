# vehicle-insurance

### rodar
    criar na raiz do projeto um arquivo chamado .env, esse arquivo deve possuir as mesmas variáveis do .env.example

###### Windows
para executar no windows pode ser necessário verificar as portas que estão sendo bloqueadas. Para isso deve-se rodar o seguinte
comando netsh interface ipv4 show excludedportrange protocol=tcp
a porta selecionada não deve fazer parte do intervalo que está protegida pelo Windows.

#### migrations
Para executar as migrations é necessário rodar o seguinte comando: npx prisma migrate dev

### todo
- ajustar mysql
- ajustar server para comportar o swagger