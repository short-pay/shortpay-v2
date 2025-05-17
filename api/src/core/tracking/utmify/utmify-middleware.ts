import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'
import { TrackingMiddleware } from './tracking-middleware'
import axios from 'axios'

/**
 * Middleware para integração com o serviço UTMify
 * 
 * Esta classe implementa a integração com o serviço UTMify para
 * rastreamento de conversões e atribuição de campanhas.
 */
export class UTMifyMiddleware extends TrackingMiddleware {
  private readonly token: string
  private readonly apiUrl: string = 'https://api.utmify.com/v1/conversions'

  constructor(
    gateway: GatewayAdapter,
    config: {
      token: string;
      apiUrl?: string;
    }
  ) {
    super(gateway)
    this.token = config.token
    
    if (config.apiUrl) {
      this.apiUrl = config.apiUrl
    }
  }

  /**
   * Envia dados de transação para o UTMify
   * 
   * @param data Dados da transação
   * @param result Resultado da transação
   */
  protected async trackTransaction(
    data: TransactionPayload,
    result: TransactionResult
  ): Promise<void> {
    // Se não há token configurado, não tenta enviar
    if (!this.token) {
      console.log('UTMify: Token não configurado, ignorando tracking')
      return
    }

    try {
      // Extrai parâmetros UTM dos dados adicionais da transação
      const utmParams = this.extractUTMParams(data.additionalData || {})
      
      // Se não há parâmetros UTM, não envia para o UTMify
      if (Object.keys(utmParams).length === 0) {
        console.log('UTMify: Sem parâmetros UTM na transação, ignorando tracking')
        return
      }

      // Prepara payload para o UTMify
      const payload = {
        transaction_id: result.transactionId,
        amount: data.amount,
        currency: data.currency || 'BRL',
        customer: {
          email: data.customer.email,
          name: data.customer.name,
        },
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term,
        metadata: {
          payment_method: data.method,
          product_id: data.productId,
          ...utmParams.custom_params
        }
      }

      // Envia para o UTMify
      await axios.post(this.apiUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000, // 5 segundos de timeout
      })

      console.log(`UTMify: Conversão enviada com sucesso para transação ${result.transactionId}`)
    } catch (error) {
      console.error('UTMify: Erro ao enviar conversão:', 
        error instanceof Error ? error.message : 'Erro desconhecido')
    }
  }

  /**
   * Extrai parâmetros UTM dos dados adicionais da transação
   * 
   * @param additionalData Dados adicionais da transação
   * @returns Objeto com parâmetros UTM
   */
  private extractUTMParams(additionalData: Record<string, any>): Record<string, any> {
    const utmParams: Record<string, any> = {}
    const customParams: Record<string, any> = {}

    // Processa todos os campos dos dados adicionais
    for (const [key, value] of Object.entries(additionalData)) {
      // Captura parâmetros UTM padrão
      if (key.startsWith('utm_')) {
        utmParams[key] = value
      } 
      // Outros parâmetros vão para custom_params
      else {
        customParams[key] = value
      }
    }

    // Adiciona custom_params apenas se houver algum
    if (Object.keys(customParams).length > 0) {
      utmParams.custom_params = customParams
    }

    return utmParams
  }
}
