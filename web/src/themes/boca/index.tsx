import Image from 'next/image'
import React from 'react'

/**
 * Props que você pode receber de um mockDB ou do seu builder.
 * Ajuste conforme sua necessidade real.
 */
interface BocaThemeProps {
  logoUrl?: string
  bannerText?: string // Texto promocional no banner azul (ex: "¡SOLO 1 UNIDAD POR PERSONA!")
  stepsData?: {
    // Exemplo de estrutura do "passo"
    identificacao: {
      nome?: string
      email?: string
      cpf?: string
      celular?: string
      complete?: boolean // se já foi preenchido
    }
    entrega: {
      cep?: string
      estado?: string
      cidade?: string
      rua?: string
      numero?: string
      bairro?: string
      complemento?: string
      complete?: boolean
    }
    pagamento: {
      // informacoes de pagamento...
      numeroCartao?: string
      validade?: string
      cvv?: string
      nomeTitular?: string
      parcelas?: string
      metodo?: string // "cartao", "pix", "boleto"...
      complete?: boolean
    }
  }
  cartData?: {
    nomeProduto: string
    valorProduto: number
    subtotal: number
    frete?: number
    total: number
  }
}

export default function BocaTheme({
  logoUrl = 'https://placehold.co/100x50',
  bannerText = '¡SOLO 1 UNIDAD POR PERSONA, EL STOCK SE ESTÁ ACABANDO!',
  stepsData,
  cartData,
}: BocaThemeProps) {
  // Para simplificar, vou colocar alguns valores default caso não venham do BD:
  const identificacao = stepsData?.identificacao || {}
  const entrega = stepsData?.entrega || {}
  const pagamento = stepsData?.pagamento || {}
  const cart = cartData || {
    nomeProduto: 'Boca Shop',
    valorProduto: 227.9,
    subtotal: 227.9,
    frete: 0,
    total: 227.9,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra Superior (logo + banner) */}

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto px-4 py-6 flex gap-4">
        {/* Seção da esquerda: Os 3 passos */}
        <section className="flex-1 flex flex-col gap-4">
          {/* Passo 1: Identificação */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <span className="bg-blue-700 text-white w-8 h-8 flex items-center justify-center rounded-full mr-2 font-bold">
                1
              </span>
              <h2 className="font-bold text-gray-800">IDENTIFICAÇÃO</h2>
              {identificacao.complete && (
                <span className="text-green-500 ml-2">✔️</span>
              )}
            </div>
            {/* Se está completo, mostre resumo, senão mostre formulário */}
            {identificacao.complete ? (
              <div>
                <p className="font-semibold">{identificacao.nome}</p>
                <p className="text-sm text-gray-600">{identificacao.email}</p>
              </div>
            ) : (
              <form className="mt-2 flex flex-col gap-2">
                <label className="block">
                  Nome completo
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <label className="block">
                  CPF
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <label className="block">
                  Celular / WhatsApp
                  <div className="flex">
                    <span className="p-2 bg-gray-100 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l">
                      +55
                    </span>
                    <input
                      type="text"
                      placeholder="(00) 00000-0000"
                      className="mt-1 block w-full rounded-l-none rounded border-gray-300"
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Continuar
                </button>
              </form>
            )}
          </div>

          {/* Passo 2: Entrega */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <span className="bg-blue-700 text-white w-8 h-8 flex items-center justify-center rounded-full mr-2 font-bold">
                2
              </span>
              <h2 className="font-bold text-gray-800">ENTREGA</h2>
              {entrega.complete && (
                <span className="text-green-500 ml-2">✔️</span>
              )}
            </div>
            {entrega.complete ? (
              <div>
                <p className="text-sm text-gray-800">
                  Endereço para entrega: <br />
                  {`Rua ${entrega.rua}, ${entrega.numero} - ${entrega.bairro}`}{' '}
                  <br />
                  {`${entrega.cidade} | CEP ${entrega.cep}`}
                </p>
              </div>
            ) : (
              <form className="mt-2 flex flex-col gap-2">
                <label className="block">
                  CEP
                  <input
                    type="text"
                    placeholder="12345-000"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <label className="block">
                  Estado
                  <input
                    type="text"
                    placeholder="Estado"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <label className="block">
                  Cidade
                  <input
                    type="text"
                    placeholder="Cidade"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <label className="block">
                  Rua
                  <input
                    type="text"
                    placeholder="Nome da Rua"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <div className="flex gap-2">
                  <label className="block w-1/2">
                    Número
                    <input
                      type="text"
                      placeholder="0"
                      className="mt-1 block w-full rounded border-gray-300"
                    />
                  </label>
                  <label className="block w-1/2">
                    Bairro
                    <input
                      type="text"
                      placeholder="Bairro"
                      className="mt-1 block w-full rounded border-gray-300"
                    />
                  </label>
                </div>
                <label className="block">
                  Complemento
                  <input
                    type="text"
                    placeholder="Complemento"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Continuar
                </button>
              </form>
            )}
          </div>

          {/* Passo 3: Pagamento */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <span className="bg-blue-700 text-white w-8 h-8 flex items-center justify-center rounded-full mr-2 font-bold">
                3
              </span>
              <h2 className="font-bold text-gray-800">PAGAMENTO</h2>
              {pagamento.complete && (
                <span className="text-green-500 ml-2">✔️</span>
              )}
            </div>
            {pagamento.complete ? (
              <p className="text-sm text-gray-800">
                Cartão final 1234, {pagamento.parcelas || '1x'}.
              </p>
            ) : (
              <form className="mt-2 flex flex-col gap-2">
                <label className="block">
                  Número do Cartão
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <div className="flex gap-2">
                  <label className="block w-1/2">
                    Validade (mês/ano)
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="mt-1 block w-full rounded border-gray-300"
                    />
                  </label>
                  <label className="block w-1/2">
                    Cód. de segurança
                    <input
                      type="text"
                      placeholder="CVC"
                      className="mt-1 block w-full rounded border-gray-300"
                    />
                  </label>
                </div>
                <label className="block">
                  Nome e sobrenome do titular
                  <input
                    type="text"
                    placeholder="Ex: João da Silva"
                    className="mt-1 block w-full rounded border-gray-300"
                  />
                </label>
                <label className="block">
                  N° de Parcelas
                  <select className="mt-1 block w-full rounded border-gray-300">
                    <option>1x</option>
                    <option>2x</option>
                    <option>3x</option>
                  </select>
                </label>

                <label className="block">
                  Método de pagamento
                  <div className="flex gap-3 mt-2">
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="metodo" value="cartao" />
                      Cartão
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="metodo" value="pix" />
                      Pix
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="metodo" value="boleto" />
                      Boleto
                    </label>
                  </div>
                </label>

                <button
                  type="submit"
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Comprar agora
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Seção da direita: Carrinho */}
        <aside className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold mb-2">SEU CARRINHO</h2>
            <div className="flex items-center justify-between mb-2">
              <span>{cart.nomeProduto}</span>
              <span className="font-semibold">R$ 0,00</span>
            </div>
            <p className="text-sm text-gray-600">
              Subtotal · 1 item <br />
              <span className="font-semibold">
                R$ {cart.subtotal?.toFixed(2)}
              </span>
            </p>
            <hr className="my-2" />
            <p className="text-lg font-bold text-green-600">
              Total <br /> R$ {cart.total?.toFixed(2)}
            </p>
          </div>
        </aside>
      </main>

      {/* Rodapé (formas de pagamento, cnpj, etc.) */}
      <footer className="bg-white py-4 text-center text-sm text-gray-500 shadow-inner">
        <div className="mb-2">Formas de pagamento:</div>
        <div className="flex items-center justify-center gap-2">
          {/* Ícones ou logos de bandeiras */}
          {/* <Image
            src="https://placehold.co/40x20?text=Visa"
            alt="Visa"
            className="h-4 object-contain"
          />
          <Image
            src="https://placehold.co/40x20?text=MC"
            alt="Mastercard"
            className="h-4 object-contain"
          />
          <Image
            src="https://placehold.co/40x20?text=PIX"
            alt="Pix"
            className="h-4 object-contain"
          /> */}
          {/* ...e assim por diante */}
        </div>
        <p className="mt-2 text-xs">CNPJ: 01.897.523/0001-21</p>
      </footer>
    </div>
  )
}
