export const funnels = [
  {
    id: 'f1a9d1f2-5e2c-4c83-9a85-dbb5a9a47e3e',
    name: 'Sales Funnel',
    description:
      'A funnel for capturing leads and converting them into customers.',
    createdAt: '2025-01-21T12:00:00Z',
    updatedAt: '2025-01-21T12:00:00Z',
    organizationId: 'org-12345',
    pages: [
      {
        id: 'p1a2b3c4-d5e6-7f8g-9h0i-j1k2l3m4n5o6',
        funnelId: 'f1a9d1f2-5e2c-4c83-9a85-dbb5a9a47e3e',
        name: 'Home Page',
        content: 'Welcome to our sales funnel!',
        createdAt: '2025-01-21T12:00:00Z',
        updatedAt: '2025-01-21T12:00:00Z',
      },
      {
        id: 'q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6',
        funnelId: 'f1a9d1f2-5e2c-4c83-9a85-dbb5a9a47e3e',
        name: 'Product Page',
        content: 'Check out our amazing products.',
        createdAt: '2025-01-21T12:00:00Z',
        updatedAt: '2025-01-21T12:00:00Z',
      },
    ],
    checkouts: [
      {
        id: 'c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6',
        funnelId: 'f1a9d1f2-5e2c-4c83-9a85-dbb5a9a47e3e',
        amount: 99.99,
        currency: 'USD',
        createdAt: '2025-01-21T12:00:00Z',
        updatedAt: '2025-01-21T12:00:00Z',
      },
      {
        id: 's1t2u3v4-w5x6-y7z8-a9b0-c1d2e3f4g5h6',
        funnelId: 'f1a9d1f2-5e2c-4c83-9a85-dbb5a9a47e3e',
        amount: 49.99,
        currency: 'USD',
        createdAt: '2025-01-21T12:00:00Z',
        updatedAt: '2025-01-21T12:00:00Z',
      },
    ],
  },
]

export const data = {
  id: 'page_01',
  name: 'Página Inicial',
  path: '/inicio',
  type: 'CHECKOUT',
  pathName: 'inicio',
  order: 1,
  published: true,
  content: `{
    title: 'Bem-vindo ao nosso Funnel',
    sections: [
      { type: 'hero', text: 'Destaque inicial' },
      { type: 'feature', text: 'Alguns recursos' },
    ],
  }`,
  previewImage: 'https://via.placeholder.com/300',
  metadata: {
    seoTitle: 'Título SEO',
    seoDescription: 'Descrição para mecanismos de busca',
  },
  createdAt: '2025-01-01T12:00:00.000Z',
  updatedAt: '2025-01-02T09:45:00.000Z',
  funnelId: 'funnel_01',
  checkoutId: null,
}
