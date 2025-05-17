import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'
import axios from 'axios'

/**
 * Serviço para comunicação com a API UTMify
 * 
 * Esta classe implementa a comunicação com a API UTMify para
 * rastreamento de conversões e atribuição de campanhas.
 */
export class UTMifyService {
  private readonly token: string
  private readonly apiUrl: string

  constructor(
    config: {
      token: string;
      apiUrl?: string;
    }
  ) {
    this.token = config.token
    this.apiUrl = config.apiUrl || 'https://api.utmify.com/v1/conversions'
  }

  /**
   * Envia dados de conversão para o UTMify
   * 
   * @param data Dados da conversão
   * @returns Resultado da operação
   */
  async sendConversion(
    data: {
      transactionId: string;
      amount: number;
      currency: string;
      customer: {
        email?: string;
        name: string;
      };
      utmParams: Record<string, any>;
      additionalData?: Record<string, any>;
    }
  ): Promise<{ success: boolean; message?: string }> {
    try {
      // Prepara payload para o UTMify
      const payload = {
        transaction_id: data.transactionId,
        amount: data.amount,
        currency: data.currency,
        customer: data.customer,
        utm_source: data.utmParams.utm_source,
        utm_medium: data.utmParams.utm_medium,
        utm_campaign: data.utmParams.utm_campaign,
        utm_content: data.utmParams.utm_content,
        utm_term: data.utmParams.utm_term,
        metadata: data.additionalData || {}
      }

      // Envia para o UTMify
      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000, // 5 segundos de timeout
      })

      return {
        success: true,
        message: `Conversão enviada com sucesso: ${response.data.id || 'ID não retornado'}`
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      
      console.error('UTMify: Erro ao enviar conversão:', errorMessage)
      
      return {
        success: false,
        message: `Erro ao enviar conversão: ${errorMessage}`
      }
    }
  }

  /**
   * Extrai parâmetros UTM dos dados adicionais
   * 
   * @param additionalData Dados adicionais
   * @returns Objeto com parâmetros UTM
   */
  extractUTMParams(additionalData: Record<string, any>): Record<string, any> {
    const utmParams: Record<string, any> = {}
    const customParams: Record<string, any> = {}

    // Processa todos os campos dos dados adicionais
    for (const [key, value] of Object.entries(additionalData || {})) {
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
