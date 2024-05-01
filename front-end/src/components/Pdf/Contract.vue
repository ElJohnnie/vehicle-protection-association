<template>
  <main class="contract-main">
    <div class="contract-inner">
      <div class="contract-header">
        <br />
        <br />
        <br />
        <table>
          <tr>
            <td>
              <img src="../../assets/img/favicon.png" alt="Logomarca" />
            </td>
          </tr>
        </table>
        <h3>Ficha de cadastro de cliente/associado</h3>
      </div>
      <div class="section-header">
        <h5>Dados do proponente</h5>
      </div>
      <div class="section-data">
        <p>Nome: {{ client.fullname }}</p>
        <p>CPF/CNPJ: {{ client.documentNumber }}</p>
        <p>RG: {{ client.identityDocument.identityNumber }}</p>
        <p>Org Exp: {{ client.identityDocument.expeditionOrgan }}</p>
        <p>UF: {{ client.identityDocument.UF }}</p>
        <p>Data de Exp: {{ client.identityDocument.expeditionDate }}</p>
        <p>CNH: {{ client.licenseDocument.licenseNumber }}</p>
        <p>Data de nasc: {{ client.identityDocument.birthDate }}</p>
        <p>Indicação: {{ client.indication }}</p>
      </div>
      <div class="section-header">
        <h5>Dados de endereço</h5>
      </div>
      <div class="section-data">
        <p>Rua: {{ client.address.street }}</p>
        <p>N°: {{ client.address.number }}</p>
        <p>Compl: {{ client.address.complement }}</p>
        <p>Bairro: {{ client.address.neighborhood }}</p>
        <p>Cidade: {{ client.address.city }}</p>
        <p>UF: {{ client.address.state }}</p>
        <p>CEP: {{ client.address.zipCode }}</p>
        <p>Telefone: {{ client.telephone }}</p>
        <p>Celular (1): {{ client.mobilephone }}</p>
        <p>Celular (2):</p>
      </div>
      <div class="section-header">
        <h5>Dados do veículo</h5>
      </div>
      <div class="section-data">
        <p>Proprietário: {{ vehicle.vehicleOwner }}</p>
        <p>Modelo: {{ vehicle.model }}</p>
        <p>Cilindrada: {{ vehicle.engineCapacity }}</p>
        <p>Placa: {{ vehicle.licensePlate }}</p>
        <p>Ano Fab: {{ vehicle.yearManufacture }}</p>
        <p>Ano mod: {{ vehicle.yearModel }}</p>
        <p>Renavam: {{ vehicle.renavam }}</p>
        <p>Cor: {{ vehicle.color }}</p>
        <p>Chassi: {{ vehicle.chassi }}</p>
        <p>Alienação: {{ vehicle.alieneted ? "SIM" : "NÃO" }}</p>
        <p v-if="vehicle.alienated">Banco: {{ vehicle.bank }}</p>
        <p v-if="vehicle.alienated">
          Valor financiado: {{ vehicle.financedAmount }}
        </p>
        <p>Avaliação:{{ vehicle.observation }}</p>
      </div>
      <div v-if="vehicle.isSecondDriver">
        <div class="section-header">
          <h5>Dados do segundo condutor</h5>
        </div>
        <div class="section-data">
          <p>Nome: {{ vehicle.secondDriver.fullname }}</p>
          <p>CPF: {{ vehicle.secondDriver.documentNumber }}</p>
          <p>Parentesco: {{ vehicle.secondDriver.kinship }}</p>
          <p>CNH: {{ vehicle.secondDriver.licenseDocument.licenseNumber }}</p>
          <p>Data de Nasch: {{ vehicle.secondDriver.birthdate }}</p>
        </div>
      </div>
      <div class="section-header">
        <h5>Valores e prazos</h5>
      </div>
      <div class="section-data">
        <p>Valor da parcela: ____________</p>
        <p>Valor total: ____________</p>
        <p>Taxa de acionamento: ____________</p>
        <p>
          Prazo: <input type="checkbox" />
          <label for="horns">12 meses</label>
          <input type="checkbox" />
          <label for="horns">24 meses</label>
        </p>
        <p>________________,____________de____________de____________</p>
        <p>x______________________________________________</p>
      </div>
      <div class="section-header">
        <h5>Termo de adesão e regras contratuais</h5>
      </div>
      <div class="section-data">
        <p>Lorem impsum</p>

        <p>
          Ficando A Vehicle Insurance PROTEÇÃO VEICULAR ASSOCIADOS responsável
          pelos sinistros de Furto, Roubo, colisões, incêndios, terceiros,
          veículo reserva, pane elétrica, vandalismo, catástrofes naturais,
          rastreamento, reboque, Chaveiro 24h e Borracheiro 24h.
        </p>

        <p>
          ESTE DOCUMENTO CONTÉM INFORMAÇÕES PARA ELABORAÇÃO DA PROPOSTA DE
          ADESÃO CONTRATUAL E A Vehicle Insurance PROTEÇÃO VEICULAR ASSOCIADOS
          JUNTO AO SEU PROGRAMA DE PROTEÇÃO VEICULAR(PPV). Solicito através
          desta proposta, minha adesão à Vehicle Insurance, declaro também estar
          ciente que a Vehicle Insurance PROTEÇÃO VEICULAR ASSOCIADOS é a
          entidade responsável por criar o PLANO DE PROTEÇÃO VEICULAR(PPV)
          vinculado ao CLUB DE BENEFÍCIOS, todos em conformidade com o Estatuto
          da Associação, bem como seu regimento interno, declaro estar sujeito
          aos termos do seu Regulamento Interno e das condições gerais de
          utilização de cada um dos demais benefícios participantes.
        </p>

        <p>
          Declaro também estar ciente das regras de pagamento e/ou inadimplência
          perante a Associação. Estou ciente que, caso apresente quaisquer
          informações inexatas, incompletas ou inverídicas, a presente proposta
          de adesão tornar-se-á nula de pleno direito, nos termos do capítulo II
          do Código Civil e nos termos do seu regimento interno.
        </p>

        <p>
          Declaro que o veículo identificado nesta proposta é de minha
          propriedade. Declaro ainda estar ciente de que a presente proposta não
          se constitui em termo definitivo de adesão, necessitando portanto
          ainda da indicação de um membro efetivo da Associação que já possua
          mais de um ano de associado, e que o veículo ora cadastrado só estará
          protegido de prejuízos ocasionados em acidentes de trânsito, depois de
          realizada a inspeção prévia por um dos funcionários da associação, com
          sua consequente aprovação, bem como estarei albergado pelo rateio em
          caso de furto/roubo e demais previsões legais de acordo como rege o
          regimento interno da associação, o valor do rateio será acrescentado
          na mensalidade do associado caso haja necessidade, poderá ser feito
          mensalmente ou anualmente.
        </p>

        <p>
          Também estou ciente de que caso retire por conta própria ou solicite a
          retirada do aparelho rastreador de meu veículo não estarei protegido
          contra furtos e roubos que posteriormente venham a ocorrer.
        </p>
        <p class="break-page">
          Bem como estou ciente de que ficarei responsável por verificar a
          funcionalidade do aparelho de rastreador, para informar possíveis
          defeitos ou não funcionamento do mesmo evitando em caso de furto ou
          roubo a perda do veículo. Também fico ciente que preciso fazer
          manutenções preventivas e atender aos chamados da empresa para
          realizar manutenção preventiva evitando o mau funcionamento do
          aparelho, ficando sob minha responsabilidade o não comparecimento a
          empresa para realizar essas manutenções, desobrigando a associação de
          pagamento em caso de furto ou roubo por falta de manutenção do
          equipamento de rastreador.
        </p>
        <br />
        <br />

        <p>Estou ciente que:</p>

        <ol type="a">
          <li>
            Para ter direito aos benefícios contratados, haverá o prazo mínimo
            de 3 (três) dias úteis após a aprovação da vistoria técnica feita
            pela Vehicle Insurance em casos de furto ou roubo, bem como o
            pagamento da taxa de adesão;
          </li>
          <li>
            Após a confirmação da adesão, somente poderei requerer o
            cancelamento do contrato, depois de 90 (noventa) dias (três meses)
            para contratos de 12 meses e um prazo mínimo de 180 dias (seis
            meses) para contratos de 24 meses;
          </li>
          <li>
            Ocorrendo o reembolso de algum evento, somente poderei requerer o
            cancelamento da adesão após 12 (doze) meses da entrega do veículo
            reparado e/ou do recebimento do valor integral;
          </li>
          <li>
            Pedidos de cancelamento são feitos pessoalmente na sede, com a
            mensalidade em dia;
          </li>
          <li>
            Em caso de dois ou mais eventos em um período inferior a 12 meses
            subsequentes, a cota de participação, taxa de acionamento, será
            cobrada em dobro, nos termos do regulamento da Vehicle Insurance.
          </li>
        </ol>

        <p>
          Feita a vistoria, a Vehicle Insurance tem o prazo de até 30 (trinta)
          dias para avaliar, aceitar ou negar de forma unilateral a presente
          proposta que se efetivará com a inclusão do associado no sistema, a
          Vehicle Insurance reserva-se ao direito de cancelar este contrato a
          qualquer tempo de forma unilateral sem aviso prévio.
        </p>

        <p>
          É de inteira responsabilidade do participante o recebimento das
          correspondências enviadas pela Vehicle Insurance ao endereço por esse
          fornecido ou telefone, aplicativos de mensagens ou redes sociais,
          isentando a empresa por informações equivocadas, inverídicas ou
          incompletas.
        </p>
        <p>
          O pagamento da Contribuição ao PPV deve ser feito rigorosamente todos
          os meses através de boleto bancário ou outro meio escolhido para este
          fim.
        </p>
        <p>
          A PPV é um programa mensal, ou seja, o não pagamento de uma
          mensalidade torna automaticamente o associado desprotegido de qualquer
          evento que venha acontecer com seu veículo, não possui caráter ou
          natureza de seguro, não somos regidos ou subordinados a SUSEP, temos
          nossa funcionalidade apenas como uma associação civil de pessoas que
          visam unir-se com um intuito único de proteger apenas os seus próprios
          veículos de possíveis sinistros.
        </p>
        <p>
          A Associação não possui fins lucrativos, todo o valor arrecadado será
          destinado a benefícios dos associados, não podendo ter lucros ou
          prejuízos. O não pagamento do boleto na data de seu vencimento,
          tornará suspensa a Proteção Automotiva, independentemente de
          notificação, e o associado estará passível da inclusão de seu nome em
          órgãos de proteção ao crédito.
        </p>
        <br />
        <p>
          A Proteção automotiva voltará a vigorar somente após três dias úteis
          do subsequente pagamento do boleto em atraso, tornando sem proteção
          qualquer evento ocorrido durante o período de inadimplência.
        </p>
        <p>
          Após o cumprimento da carência de três meses o cliente poderá deixar o
          programa a qualquer tempo sem nenhum prejuízo financeiro ou material,
          pedidos de cancelamentos tem necessariamente que serem feitos
          pessoalmente e assinado o termo de desistência. Este PPV é renovado
          mensalmente com o pagamento da contribuição de cada associado.
        </p>
        <p>
          Para dirimir questões porventura surgidas no presente, fica eleito o
          foro da Comarca de Natal-RN, com renúncia expressa a qualquer outro,
          por mais privilegiado que seja, ou possa vir a ser. O regulamento da
          Vehicle Insurance é parte integrante desta proposta de adesão.
        </p>
        <p>
          O cliente declara que tem total ciência de todos os termos do
          Regulamento, inclusive as hipóteses de exclusão de proteção, o qual
          recebeu cópia neste ato, impressa ou através de meios eletrônicos e de
          que também pode ser acessado no site eletrônico da empresa. No ato da
          adesão são entregues diversos documentos, dentre eles, o Regulamento,
          explicando o conteúdo e cobertura específica do seu plano. O cliente
          possui o prazo de 5 dias úteis para a leitura deste contrato e caso
          não concorde poderá solicitar o cancelamento sem nenhum prejuízo
          financeiro.
        </p>
        <p>
          FORMA E PRAZO DE RESSACIRMENTO DE PREJUÍZO: Em caso de eventuais
          prejuízos materiais com resultado em perda total, colisoes, incêndio,
          roubo, furto, ou qualquer que seja o evento que venha a acontecer de
          natureza grave, a Vehicle Insurance possui o prazo de até 90 dias
          úteis para ratear entre o corpo social e ressarcir o cliente
          prejudicado, a contar da data de entrega de toda a documentação
          solicitada pela Vehicle Insurance e pagamento da taxa de acionamento,
          caso o valor do prejuizo material a ser ressarcido ao cliente seja um
          valor que comprometa a saúde financeira ou liquidez da empresa, a
          Vehicle Insurance fica comprometida a quitar a divida de uma forma
          parcelada, de acordo com as possibilidades financeiras da empresa, sem
          que isso comprometa sua estabilidade financeira, tornando inviável o
          pagamento de suas despesas, salários, alugueis, etc., e/ou
          comprometendo seu funcionamento, caso a empresa disponha de reservas
          financeiras suficientes para ressarcir os prejuizos materiais de cada
          mês, não haverá a necessidade do Rateio mensal, e caso haja sobra
          orçamentária na empresa, os valores sempre serão destinados a melhoria
          na prestação dos serviços da Associação.
        </p>
        <p>
          Todo associado tem o direito de solicitar a prestação de contas anuais
          da empresa. Caso haja realização de sindicância interna para algum
          acidente ocorrido, o prazo se iniciará a partir da finalização desta,
          que em média será realizado em até 30 dias, salvo caso fortuito ou
          força maior.
        </p>
        <p>
          O ressarcimento será realizado de uma só vez ou parcelado, de acordo
          com as condições econômicas da Vehicle Insurance, em cheque nominal ou
          cruzado, ou ainda por transferência bancária sempre em nome do
          associado, caso o veículo esteja em nome de terceiros, será necessário
          apresentar procuração pública do terceiro para o associado, no caso de
          bens materiais, através de reparação dos danos, ou ainda, reposição do
          bem por outro da mesma espécie, tipo, ano ou modelo, ou superior,
          conforme decisão da diretoria da Vehicle Insurance, sempre deduzindo
          do valor integral possíveis dívidas, taxas, multas, impostos e
          financiamentos que o veículo venha a ter. O valor total das despesas
          nunca poderá ultrapassar o valor do veículo obtido na tabela FIPE
          atual.
        </p>
        <p class="break-page">
          Nos casos que o valor expresso pela tabela FIPE, sejam
          desproporcionalmente mais elevado que o valor de mercado do valor real
          de mercado, a Vehicle Insurance poderá utilizar outros meios para a
          apuração do valor do ressarcimento integral, como o valor real do
          veículo no mercado regional, sempre levando em consideração o estado
          de conservação do veículo do associado. A Vehicle Insurance, sem
          prejuízo de outros meios de apuração, também poderá constatar o valor
          de mercado através dos sites:
          <a href="www.webmotors.com.br">www.webmotors.com.br</a>,
          <a href="www.mercadolivre.com.br">www.mercadolivre.com.br</a>,
          <a href="www.usadosbr.com">www.usadosbr.com</a>,
          <a href="www.meucarango.com.br">www.meucarango.com.br</a>,
          <a href="www.olx.com.br">www.olx.com.br</a>,
          <a href="www.temusados.com.br">www.temusados.com.br</a>, entre outros,
          ou no comércio local.
        </p>
        <p>
          Casos em que o veículo possua algum tipo de alienacão o pagamento do
          veículo deverá ser feito diretamente com o banco, de forma e condicões
          estabelecidas na dívida original, e o restante do dinheiro, caso haja,
          deverá ser pago ao cliente.
        </p>
        <p>
          Em caso de destruição parcial do veículo, em razão de acidente, a
          empresa, terá um prazo de 30 dias para fazer os devidos orçamentos, e,
          sendo autorizado o conserto pela Diretoria financeira, se encaminhará
          o veículo para a oficina previamente cadastrada, para realizar o
          conserto do veículo, o mais rápido possível, onde a empresa não se
          responsabilizará por prazos para entrega do veículo, tendo em vista,
          as demandas das oficinas na prestação dos serviços terceirizados, e
          devido a eventuais atrasos na entrega de peças de reposição. Não será
          possível o conserto do veículo em oficina não cadastrada na empresa,
          para consulta das oficinas cadastradas o associado deverá consultar a
          associação.
        </p>
        <p>
          Os prazos referidos neste Regulamento, serão suspensos a partir do
          momento em que for solicitada documentação complementar no caso de
          dúvida fundada e justificável ou no caso que for instaurado inquérito
          policial, perícia ou sindicância para apurar as causas do evento
          ocorrido com o veículo cadastrado.
        </p>
        <p>
          A Vehicle Insurance reserva-se no direito de contratar investigação
          especializada a fim de fazer um acompanhamento do Inquérito Policial,
          e para apurar os fatos, e levantar eventuais irregularidades e/ou
          fraudes.
        </p>
        <p>
          Em qualquer das situações de sinistro que o associado se envolver,
          deverá o mesmo comunicar imediatamente a empresa e observar
          atentamente as situações não cobertas previstas no regimento
          interno(como embriaguez, inadimplência, falta de CNH, imprudência no
          trânsito, desobediencia as regras de trânsito, uso de drogas ilícitas,
          suspeita de fraude, ou qualquer outro ato ilícito ou ilegal).
        </p>
        <p>
          Peças de manutenção como: rodas, pneus, motor, som automotivo, peças
          não originais do veículo, objetos deixados no interior, ou peças de
          reposição e manutenção de forma geral, não são acobertadas junto ao
          PPV e Regimento interno.
        </p>
        <p>
          Por fim, informamos que para ser aceito como membro efetivo da empresa
          o proponente deve ser indicado por outro membro fetivo, e que o membro
          efetivo que o indicou ganhará desconto em sua contribuicão mensal por
          indicacão efetivada.
        </p>
        <p>
          A Vehicle Insurance é uma empresa de segurança veicular, que tem por
          finalidade o monitoramento e a prestação de serviços relativos a
          segurança e proteção de veículos automotores, não podendo ser
          confundida com uma Seguradora. Este contrato não pode ser confundido
          com uma apólice de Seguro.
        </p>
        <p class="break-page">
          Declaro neste momento, ter recebido uma cópia do regulamento do
          PPV(regimento interno), Vehicle Insurance, estando de acordo com todos
          os direitos e deveres, não tendo nada a questionar, aceitando todas as
          cláusulas ali contidas em sua integralidade e estando plenamente
          disposto a contribuir para o funcionamento desta empresa.
        </p>
        <p>
          Para veracidade das informações prestadas, firmo a presente, dando
          total acordo e aceitação das condições ora apresentadas, tornando-me
          um associado da Vehicle Insurance e das empresas parceiras.
        </p>

        <table
          class="table-margint-top"
          order="0"
          cellpadding="1"
          cellspacing="1"
          style="width: 500px"
        >
          <tbody>
            <tr>
              <td style="text-align: center">
                _____________________________, ____ de ___________ de 20____
              </td>
            </tr>
          </tbody>
        </table>

        <p style="text-align: center">&nbsp;</p>

        <br />
        <br />

        <table border="0" cellpadding="1" cellspacing="1" style="width: 500px">
          <tbody>
            <tr>
              <td>________________________________________&nbsp;</td>
              <td>&nbsp;________________________________________</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <strong>Cliente/Associado</strong>
              </td>
              <td style="text-align: center"><strong>Consultor</strong></td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>
      <div class="section-header">
        <h5>Tipo de plano / Clube de benefícios</h5>
      </div>
      <div class="section-data">
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Ouro</span>
        </div>
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Prata</span>
        </div>
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Bronze</span>
        </div>
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Moto</span>
        </div>
      </div>
      <div class="section-data">
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Rast.</span>
        </div>
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Furto e Roubo</span>
        </div>
        <div class="container">
          <div class="rectangle"></div>
          <span class="label">Rast. Reb e Chaveiro</span>
        </div>
      </div>
      <br />
      <div class="section-data">
        <table class="contract-main">
          <tr>
            <td>
              As cláusulas de I à XII são relativas a clientes que possuem os
              planos bronze, prata, ouro, moto e furto/roubo junto a Associação.
              Para os demais planos, seguem coberturas específicas. Os
              benefícios aqui apresentados são para clientes que aderem ao clube
              de benefícios, tornando-se associados das empresas parceiras e da
              Vehicle Insurance Associados.
            </td>
          </tr>
          <tr>
            <td>i.</td>
            <td>
              <br />RASTREAMENTO VIA SATÉLITE COM MONITORAMENTO 24H<br />A
              instalação do rastreador no veículo é obrigatória para quaisquer
              dos planos Bronze, Prata, Ouro, Moto e Furto/roubo. O
              monitoramento será feito 24h por dia, os 7 dias da semana. Fica
              sob total responsabilidade do cliente manter e zelar pelo aparelho
              de rastreamento, o qual fica em regime de comodato. Caso o
              cliente/associado venha a vender ou trocar o veículo com o
              aparelho ou danificar o mesmo será cobrada uma taxa para reposição
              do mesmo. <br />
            </td>
          </tr>
          <tr class="break-page">
            <td>ii.</td>
            <td>
              <br />FURTO E ROUBO<br />No caso de Furto ou Roubo de seu Veículo
              o cliente terá direito ao ressarcimento do valor do Veículo na
              TABELA FIPE do dia do ocorrido descontados possíveis dívidas de
              financiamentos e/ou multas e impostos que possam haver no veículo,
              a empresa também poderá optar pela devolução de um veículo de
              mesma marca, modelo e ano ou superior. A empresa tem até 90 dias
              para julgar o pedido de indenização e fazer o ressarcimento. A
              vigência desta cobertura começa a vigorar 3 dias úteis após a
              vistoria do veículo, e pagamento completo da adesão e instalação
              do equipamento de rastreio. Veículos que não fizerem a instalação
              do equipamento de rastreador, não terão direito a cobertura de
              furto ou roubo. <br />
            </td>
          </tr>
          <tr>
            <td>iii.</td>
            <td>
              <br />COLISÕES<br />Em caso de colisões o cliente terá direito ao
              ressarcimento material de 100% de prejuízos decorridos da colisão
              em seu veículo. Os serviços de recuperação e substituição de peças
              serão feitos apenas em oficinas credenciadas pela empresa e
              obedecerá à decisão técnica de substituição ou recuperação de
              peças. As peças serão prioritariamente originais, podendo também
              serem substituídas por similares ou recuperadas em algumas
              situações que o perito julgar necessária. O cliente tem até
              10(dez) dias úteis a contar da data do sinistro para acionar a
              empresa. A indenização para colisões restringir-se-á
              exclusivamente para danos materiais ao veículo. Caso o veículo
              esteja sendo conduzido por um condutor não cadastrado o cliente
              não estará acobertado. (Exceto para o plano Ouro). Em casos de
              colisão em que o condutor não possua CNH ou esteja com a mesma
              suspensa o cliente/associado perderá o direito ao ressarcimento
              dos prejuízos. Quando o condutor estiver em estado de embriaguez,
              não possuir CNH, em desobediência com as normas legais de trânsito
              ou qualquer outra imprudência constante no PPV e/ou Estatuto
              social perderá o direito ao ressarcimento. Em casos de colisão o
              cliente/associado deverá comunicar imediatamente a empresa a
              situação, não devendo o mesmo retirar o veículo do local do
              acidente até a chegada do técnico ao local, caso isso aconteça ele
              poderá perder o direito ao ressarcimento. Não existe cobertura
              para acessórios automotivos, tais como som, rodas ou outros
              equipamentos não originais do veículo ou equipamentos de uso e
              manutenção do veículo. Não estão cobertas peças de uso e desgaste
              tais como pneus, óleo, pastilhas de freio, motor, etc. <br />
            </td>
          </tr>
          <tr>
            <td>iv.</td>
            <td>
              <br />COLISÕES ENVOLVENDO TERCEIROS<br />Terceiros tem uma
              cobertura máxima de 50.000,00(cinquenta mil reais), o
              cliente/associado deverá observar que cada plano possui uma
              cobertura e um valor específico para casos de colisões, terceiros
              não possuem direito a veículo reserva ou reboque. Terceiros
              envolvidos em colisões com clientes só terão direito ao
              ressarcimento material caso fique comprovado a culpa do
              cliente/associado na colisão. A indenização para cliente/associado
              e terceiros restringir-se-á exclusivamente para danos materiais ao
              veículo, não se estendendo a prejuízos matérias provocado pelo
              cliente/associado a imóveis, danos ao patrimônio público, ou
              qualquer outro prejuízo material que não seja aos veículos
              envolvidos. Não haverá cobertura a terceiros caso o prejuízo
              causado seja derivado de atos ilícitos. A cobertura para
              cliente/associado, será restrita aos danos causados aos veículos
              oriundos da colisão. Não importa o número de veículos envolvidos,
              a indenização máxima para terceiros é no valor de 50.000,00 reais
              no total, e não para cada veículo envolvido.
              <br />
            </td>
          </tr>
          <tr class="break-page">
            <td>v.</td>
            <td>
              <br />SEGUNDO CONDUTOR<br />O segundo condutor cadastrado gozará
              dos mesmos direitos do titular para colisões, furtos, roubos,
              reboque, chaveiro e pneu furado. É importante observar que o
              veículo fica protegido apenas com o titular e o segundo condutor
              cadastrado. O cliente/associado deve observar as diferentes
              coberturas para segundo condutor nos diferentes planos, cada plano
              possui uma cobertura específica diferente para segundo condutor.
              Para casos de veículos de aluguel/taxi/alternativo/motorista de
              aplicativo/veículos de empresa, ou qualquer outra situação em que
              o veículo não seja de uso particular. o proprietário deverá
              consultar a empresa para condições e taxas adicionais. <br />
            </td>
          </tr>
          <tr>
            <td>vi.</td>
            <td>
              <br />VEÍCULO RESERVA<br />A empresa disponibilizará um veículo
              reserva apenas em casos de acidentes e após o pagamento da taxa de
              coparticipação total. A disponibilização do veículo pela empresa
              dependerá de disponibilidade de veículo ou não na hora do
              acontecido. O cliente deverá observar as diferentes coberturas que
              os planos oferecem para veículos reserva. O tempo que o
              cliente/associado poderá permanecer com o veículo reserva é de 30
              dias, caso necessite de um prazo maior, ele poderá pagar uma
              diária no valor estabelecido pela empresa. <br />
            </td>
          </tr>
          <tr>
            <td>vii.</td>
            <td>
              <br />VANDALISMO<br />os casos de vandalismos devem ser
              devidamente registrados na polícia e acompanhados de uma
              investigação própria da empresa que dará o aval para este tipo de
              cobertura em cada caso especifico. O vandalismo não está
              acobertado nos casos intencionais ou criminosos de incêndios.<br />
            </td>
          </tr>
          <tr>
            <td>viii.</td>
            <td>
              <br />PANE ELÉTRICA<br />Os casos de vandalismos devem ser
              devidamente registrados na polícia e acompanhados de uma
              investigação própria da empresa que dará o aval para este tipo de
              cobertura em cada caso especifico. O vandalismo não está
              acobertado nos casos intencionais ou criminosos de incêndios.<br />
            </td>
          </tr>
          <tr>
            <td>ix.</td>
            <td>
              <br />INCÊNDIOS<br />Para ter direito a esta cobertura o cliente
              deverá ter tido seu veículo acometido de incêndio por causa
              técnica advinda de falha ou pane no sistema elétrico do veículo. A
              cobertura para Contrato https://jmvti.com.br/sic/Vehicle
              Insurance/Vehicle Insurance_rec/sys/contrato1.php 3 of 6
              13/06/2023, 08:45 incêndios terá validade quando do processo de
              investigação que comprove que o incêndio não tenha sido gerado por
              ato criminoso ou intencional. Casos de veículos roubados ou
              furtados que venham a ser incendiados posterioemente, apenas o
              cliente/associado do plano ouro estará acobertado. Não há
              cobertura de incêndios para motocicletas. Não há cobertura para
              incêndios que tenham sido provocados or fatores externos ou ato
              criminoso. Caso haja suspeita de fraude para incêndios
              intencionais ou criminosos o cliente poderá perder seu direito ao
              ressarcimento.<br />
            </td>
          </tr>
          <tr>
            <td>x.</td>
            <td>
              <br />COBERTURAS ESPECIFICAS<br />O cliente possui a opção de
              contratar uma cobertura especifica para danos causados no veículo
              que não são frutos de colisões ou culpa de terceiros, como queda
              em um buraco, atolamentos, serviço especializado de Munck,
              guincho, cobertura contra derrapagem, aqua-planagem e acidentes
              provocados por falha mecânica ou elétrica. Para todos os casos
              especificados de cobertura anteriormente, o cliente deverá
              observar as diferentes coberturas para cada plano.<br />
            </td>
          </tr>
          <tr>
            <td>xi.</td>
            <td>
              <br />TAXA DE COPARTICIPAÇÃO<br />Os valores de taxa de
              coparticipação são de cobrança exclusiva da Associação, sendo sua
              responsabilidade estipular os seus respectivos valores. Para
              carros são especificados por tabela específica elaborada pela
              Associação. Para motocicletas essa taxa será única no valor de
              10%(dez por cento) de seu veículo no valor de tabela FIPE. A taxa
              deve ser paga sempre que houver furto ou roubo, colisão, colisão
              envolvendo terceiros, incêndio e pane elétrica. Alguns planos
              possuem uma taxa reduzida no valor de 10%(dez por cento) do total
              para faróis, para-brisas, lanternas e retrovisores. A taxa de 10%
              do valor de franquia não se aplica para veículos da marca Peugeot,
              Renault, Citroen, ou veículos importados, estes veículos não
              possuem franquia reduzida. Veículos de aluguel/taxi
              /alternativo/motorista de aplicativo/veículos de empresa, tbm não
              possuem essa redução, e pagarão uma sobre taxa no valor de
              50%(cinquenta por cento) a mais sobre cada taxa respectiva.<br />
            </td>
          </tr>
          <tr>
            <td>xii.</td>
            <td>
              <br />COBERTURA ESPECÍFICA PARA FURTO E ROUBO<br />Esta cláusula é
              específica para associados que optaram única e exclusivamente para
              a cobertura de furto ou roubo de seu veículo. No caso de Furto ou
              Roubo de seu Veículo o cliente terá direito ao ressarcimento do
              valor do Veículo na TABELA FIPE do dia do ocorrido, descontados
              possíveis dívidas de financiamentos e/ou multas e impostos que
              possam haver no mesmo, a Associação também poderá optar pela
              devolução de um veículo de mesma marca, modelo e anoou superior. A
              Assoiação tem até 90 dias para julgar o pedido de indenização e
              ressarcimento. Deve ser observado pelo associado a obrigatoriedade
              da instalação do equipamento de rastreamento nesta modalidade.
              Caso o associado venha a retirar o equipamento por conta própria
              ou danificá-lo, este perderá o direito ao ressarcimento.<br />
            </td>
          </tr>
          <tr>
            <td>xiii.</td>
            <td>
              <br />PLANO DE RASTREAMENTO<br />Aos que escolherem apenas o plano
              de rastreamento veicular fornecido pela ADS CORRETORA DE SEGUROS
              EIRELE, a carência mínima será de 12 meses, terão direito ao
              sistema de monitoramento via satélite com localizador, rastreador
              e bloqueador. O aparelho instalado no veículo ficará sob regime de
              comodato. Caso o associado venha a quebrar o contrato será
              estipulada uma multa no valor de 50% sob o valor das parcelas
              restantes. No plano de rastreamento estará incluído o auxílio e
              remoção de nossa equipe na recuperação do veículo, valendo
              salientar que nesse plano não estão cobertos danos ao veículo ou
              reposição de um novo, caso o mesmo não seja encontrado. Fica sob
              total responsabilidade do cliente manter e zelar pelo aparelho de
              rastreamento, o qual fica em regime de comodato. Caso o cliente
              não devolva o aparelho ou danifique o mesmo, será cobrada uma taxa
              para reposição.<br />
            </td>
          </tr>
          <tr>
            <td>xiv.</td>
            <td>
              <br />PLANO DE RASTREAMENTO, REBOQUE E CHAVEIRO 24H<br />Aos
              clientes que escolherem o plano de rastreamento, reboque e
              chaveiro 24h. Os mesmos terão direito ao rastreamento como consta
              no item XIII deste contrato, Reboque como consta no item XVII, com
              uma limitação de uma distância máxima de 400 km, e Chaveiro como
              consta no item XV.<br />
            </td>
          </tr>
          <tr>
            <td>xv.</td>
            <td>
              <br />CHAVEIRO<br />O serviço de chaveiro está disponível 24h por
              dia, 7 dias da semana. A Empresa sempre disponibilizará um
              chaveiro no auxílio para a abertura do veículo e arcará com estes
              custos. Outros custos como cópia de chaves e qualquer outra
              solicitação ficará a cargo do próprio cliente. O cliente só poderá
              solicitar esse auxílio uma vez a cada 3(três) meses. Fica o
              cliente ciente de que em algumas regiões existe a dificuldade de
              localização de chaveiro 24h, a depender do local e do horário,
              podendo esse serviço ser substituído por outro auxílio da empresa,
              como um reboque por exemplo.<br />
            </td>
          </tr>
          <tr>
            <td>xvi.</td>
            <td>
              <br />PNEU FURADO<br />O cliente/associado terá direito a acionar
              este serviço uma vez a cada período mínimo de 30(trinta) dias
              consecutivos. Neste tipo de cobertura não estará coberto casos em
              que o pneu tenha sido completamente danificado sendo
              impossibilitado sua recuperação. Trocas de camaras de AR são de
              responsabildiade do cliente. A cobertura é válida apenas para
              1(um) pneu por veículo sendo válida em um raio de 30km da
              residência do cliente e está válida apenas em horário comercial.
              Cada plano possui uma cobertura especifica para esta cobertura.<br />
            </td>
          </tr>
          <tr>
            <td>xvii.</td>
            <td>
              <br />ASSISTÊNCIA COM REBOQUE GRATUITO<br />
              O serviço de Reboque será oferecido gratuitamente 24h por dia os 7
              dias da semana para casos específicos como: Colisões, problemas
              mecânicos ou elétricos, pneu furado, acidentes diversos ou
              qualquer outra situação de emergência especificada pelo
              cliente/associado e validada pela empresa como tal. O cliente
              deverá estar ciente que a empresa não poderá prestar assistência
              domiciliar com reboque. Também não poderá ultrapassar o número de
              1(uma) solicitação a cada 7 dias consecutivos. O cliente/associado
              deverá observar que os diferentes planos possuem diferentes
              coberturas para reboque. Veículos com mais de 10 anos só possuem
              direito a reboque em casos de acidentes, mesmo clientes do plano
              ouro. O reboque sempre terá como destino final uma oficina mais
              próxima ou onde o cliente apresentou como endereço fixo no ato de
              assinatura do contrato. Reboques para veículos fora de seu
              domicilio serão preferencialmente encaminhados para uma oficina
              mais próxima.Casos de reboques distantes de grandes centros, de
              difícil comunicação com o cliente, ou na ausência de encontrarmos
              um prestador de serviço local, a empresa se reserva no direito de
              enviar um socorro auxiliar, como mecânico, eletricista, hospedagem
              provisória, aplicativos de carona, ou o socorro de reboque mais
              próximo que necessariamente não seja na região onde o
              cliente/associado esteja.<br />
            </td>
          </tr>
          <tr>
            <td>xviii.</td>
            <td>
              <br />PLANOS PARA MOTOS (ASSOCIAÇÃO)<br />
              A empresa disponibilizará para motocicletas uma modalidade única
              de plano e cobertura: Rastreamento; assistência com reboque
              gratuito ; furto e roubo; colisões; terceiros até 10 mil(fica
              facultado ao cliente escolher esta opcão com um acrescimo na
              mensalidade); segundo condutor; pane elétrica; moto reserva.<br />
            </td>
          </tr>
          <tr>
            <td>xix.</td>
            <td>
              <br />PLANOS PARA CARROS(ASSOCIAÇÃO)<br />
              Para carros teremos 3 planos diferentes: BRONZE: Furto e roubo,
              Colisões e rastreamento via satélite. PRATA: Furto e roubo,
              Colisões, rastreamento via satélite, segundo condutor, reboque
              limitado a 400km, chaveiro 24h. OURO: rastreamento via satélite;
              reboque sem limite de kilometragem; furto e roubo; colisões ;
              terceiros até 50 mil; taxa de coparticipação reduzida para vidros,
              lanternas, parabrisas, faróis e retrovisores em 10% da
              coparticipação total; sem limite de condutores; incêndios;
              catástrofes naturais; vandalismo; pane elétrica; pneu furado;
              veículo reserva; chaveiro 24 h;<br />
            </td>
          </tr>
          <tr>
            <td>xx.</td>
            <td>
              <br />CLUB DE BENEFÍCIOS E A Vehicle Insurance ASSOCIADOS<br />
              A Vehicle Insurance, tem como responsabilidade prestar serviços
              nas áreas de monitoramento, guincho, pneu furado e chaveiro 24h,
              para ter direito aos outros benefícios que fazem parte do club de
              benefícios, o cliente está ciente que este documento torna-o um
              associado das demais empresas e associações parceiras, que possuem
              uma parceria firmada em contrato com esta empresa. Todos os
              membros efetivos terão direito ao club de benefícios, que é
              composto por um grupo de empresas e associações parceiras, onde os
              associados terão direito a descontos na compra de produtos e
              serviços, e a todos os benefícios atrelados ao plano escolhido.<br /><br /><br />
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="1" cellspacing="1" style="width: 500px">
          <tbody>
            <tr style="text-align: center">
              <td>________________________________________&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <strong>Cliente/Associado</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="contract-header">
          <br />
          <br />
          <br />
          <table>
            <tr>
              <td>
                <img src="../../assets/img/favicon.png" alt="Logomarca" />
              </td>
            </tr>
          </table>
          <h3>TERMO DE GUARDA E USO DE EQUIPAMENTO</h3>
        </div>
        <div class="section-header">
          <h5>CLIENTE</h5>
        </div>
        <div class="section-data">
          <p>Nome: {{ client.fullname }}</p>
          <p>CPF/CNPJ: {{ client.documentNumber }}</p>
          <p>RG: {{ client.identityDocument.identityNumber }}</p>
          <p>Org Exp: {{ client.identityDocument.expeditionOrgan }}</p>
          <p>UF: {{ client.identityDocument.UF }}</p>
          <p>Data de Exp: {{ client.identityDocument.expeditionDate }}</p>
          <p>CNH: {{ client.licenseDocument.licenseNumber }}</p>
          <p>Data de nasc: {{ client.identityDocument.birthDate }}</p>
          <p>Indicação: {{ client.indication }}</p>
        </div>
        <div class="section-header">
          <h5>Dados de endereço</h5>
        </div>
        <div class="section-data">
          <p>Rua: {{ client.address.street }}</p>
          <p>N°: {{ client.address.number }}</p>
          <p>Compl: {{ client.address.complement }}</p>
          <p>Bairro: {{ client.address.neighborhood }}</p>
          <p>Cidade: {{ client.address.city }}</p>
          <p>UF: {{ client.address.state }}</p>
          <p>CEP: {{ client.address.zipCode }}</p>
          <p>Telefone: {{ client.telephone }}</p>
          <p>Celular (1): {{ client.mobilephone }}</p>
          <p>Celular (2):</p>
        </div>
        <div class="section-header">
          <h5>Dados do veículo</h5>
        </div>
        <div class="section-data">
          <p>Proprietário: {{ vehicle.vehicleOwner }}</p>
          <p>Modelo: {{ vehicle.model }}</p>
          <p>Cilindrada: {{ vehicle.engineCapacity }}</p>
          <p>Placa: {{ vehicle.licensePlate }}</p>
          <p>Ano Fab: {{ vehicle.yearManufacture }}</p>
          <p>Ano mod: {{ vehicle.yearModel }}</p>
          <p>Renavam: {{ vehicle.renavam }}</p>
          <p>Cor: {{ vehicle.color }}</p>
          <p>Chassi: {{ vehicle.chassi }}</p>
          <p>Alienação: {{ vehicle.alieneted ? "SIM" : "NÃO" }}</p>
          <p v-if="vehicle.alienated">Banco: {{ vehicle.bank }}</p>
          <p v-if="vehicle.alienated">
            Valor financiado: {{ vehicle.financedAmount }}
          </p>
          <p>Avaliação:{{ vehicle.observation }}</p>
        </div>
        <p class="break-page">
          Comprometendo-me a manter o equipamento
          rastreador/localizador/bloqueador em perfeito estado de conservação,
          ficando ciente de que:
          <br />
          <br />
          <br />
          <br />
          <br />
        </p>
        <table class="contract-main">
          <tr>
            <td>1.</td>
            <td>
              Se o equipamento for danificado ou inutilizado por emprego
              inadequado, mau uso, negligência ou extravio, a empresa me
              fornecerá novo equipamento e cobrará o valor de um equipamento da
              mesma marca ou equivalente ao da praça.<br />
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              Em caso de dano, inutilização, ou extravio do equipamento deverei
              comunicar imediatamente ao setor competente.<br />
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>
              Terminando os serviços ou no caso de rescisão do contrato de
              trabalho, devolverei o equipamento completo e em perfeito estado
              de conservação, considerando-se o tempo do uso do mesmo (tempo de
              vida útil), ao setor competente.<br />
            </td>
          </tr>
          <tr>
            <td>4.</td>
            <td>
              Em caso de não devolução do equipamento ao término do contrato, ou
              por distrato, cancelamento fora do prazo, venda do veículo,
              furto/roubo, incêndio, perda, danos, extravio, mau uso, ou por
              qualquer outro motivo que me impossibilite na devolução do
              equipamento, fico ciente que estou sujeito ao pagamento de multa
              no valor de R$400 reais pelo valor do equipamento, R$50,00
              (cinquenta reais) pela mão de obra do técnico para retirada, bem
              como o valor mensal de R$49,90 por cada mês utilizado do sistema
              de GPS não pago até a data de devolução.<br />
            </td>
          </tr>
          <tr>
            <td>5.</td>
            <td>
              Caso o cliente se recuse ou dificulte a retirada do equipamento, o
              mesmo fica ciente que a empresa poderá usar a função de bloqueio
              do veículo para retirada do mesmo. Estando os equipamentos em
              minha posse, estarei sujeito a inspeções sem prévio aviso.<br />
            </td>
          </tr>
        </table>
        <br />
        <br />
        <table>
          <tr>
            <td>IMEI DO EQUIPAMENTO</td>
            <td>__________________________________</td>
          </tr>
          <tr>
            <td>MODELO</td>
            <td>__________________________________</td>
          </tr>
          <tr>
            <td>CLIENTE</td>
            <td>__________________________________</td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: require("@/assets/img/background.jpg"),
    },
    client: {
      type: Object,
      default: () => {},
    },
    vehicle: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
p,
h1,
h3,
h5 {
  font-weight: bold;
}
.break-page {
  page-break-inside: avoid; /* Evita que o elemento seja dividido em várias páginas */
  page-break-before: always; /* Força a quebra de página antes do elemento */
}

table {
  width: 100%;
  text-align: center;
}

td {
  vertical-align: middle;
}

.container {
  display: flex;
  align-items: center;
}

.rectangle {
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border: 1px solid #000;
}

.label {
  margin-left: 10px;
}

.contract-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  text-align: justify;
  text-justify: inter-word;

  & .contract-header {
    margin-bottom: 18px;
  }

  & .contract-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    width: 40vw;

    & .section-data,
    .section-header {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    & .section-header {
      width: 100%;
      height: 50px;
      background-color: #e6e6e6;
    }

    & .section-data {
      display: flex;
      flex-wrap: wrap;
      max-width: 100%;
      padding: 36px;

      & p {
        font-size: 14px;
        margin: 10px;
        &.p-rules {
          font-size: 10px;
        }
      }
      & .div-assignature {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        & span {
          margin-top: 0px;
        }
      }
    }
  }
}

.table-margint-top {
  margin-top: 20px;
}
</style>
