enum FunnelPageType {
  GENERIC = "GENERIC",
  SPECIFIC = "SPECIFIC",
  // Adicione mais tipos conforme necessário
}

export interface FunnelPage {
  id: string;
  name: string;
  path: string;
  content: any; 
  type: FunnelPageType;
  previewImage?: string;
  createdAt: Date;
  updatedAt: Date;
  funnelId?: string;
  checkoutId?: string;
}