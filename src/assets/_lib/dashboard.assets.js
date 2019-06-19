export const dashboardSections = [
  {
    route:"/painel/geral",
    title: "Geral"
  },
  {
    route:"/painel/perfil",
    title: "Perfil"
  },
  {
    route:"/painel/assinaturas",
    title: "Assinaturas"
  },
  {
    route:"/painel/pedidos",
    title: "Pedidos"
  },

];


export const dashboardGeneralWhiteBoxes = [
  {
    subtitle:"Total doado a pequenos produtores",
    id:"donation",
    img:"/icons/agricultor1.png",
    price:true
  },
  {
    subtitle:"Total de orgânicos consumidos",
    id:"totalItems",
    img:"/icons/agricultor1.png",
    price:false
  },
  {
    subtitle:"Total de agrotóxicos a menos gerados",
    id:"savedAgrotoxics",
    img:"/icons/agricultor1.png",
    price:false
  },
];

export const dashboardUserPersonalData = [
  {
    label: "NOME",
    id: "name"
  },
  {
    label: "EMAIL",
    id: "email"
  },
  {
    label: "CPF",
    id: "cpfString"
  },
  {
    label: "TELEFONE",
    id: "phoneString"
  },
  {
    label: "SOBRENOME",
    id: "lastName"
  },
]


export const dashboardGeneralForm = [
  {
    label: "NOME",
    id: "name"
  },
  {
    label: "CPF",
    id: "cpf",
    format: "formatCpf"
  },
  {
    label: "TELEFONE",
    id: "phone",
    format: "formatPhone"
  },
  {
    label: "SOBRENOME",
    id: "lastName",
  },
]


export const dashboardAddressForm = [
  {
    label: "Nome do endereço",
    id: "name"
  },
  {
    label: "Nome do recebedor",
    id: "receiverName",
  },
  {
    label: "CEP",
    id: "cep",
    format: "formatCEP"
  },
  {
    label: "Endereço",
    id: "street",
    className:"big"    
  },
  {
    label: "Número",
    id: "number",
    className:"small"
  },
  {
    label: "Bairro",
    id: "neighbourhood",
  },
  {
    label: "Complemento",
    id: "complement",
  },
  {
    label: "Cidade",
    id: "city",
  },
  {
    label: "Estado",
    id: "state",
    className:"small",
  },
]



