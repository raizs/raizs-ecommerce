export const dashboardSections = [
  {
    route:"/painel/geral",
    title: "Geral"
  },
  {
    route:"/painel/usuario",
    title: "Usuário"
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
