'use client'

import React from 'react'
import { FunnelForm } from '@/components/forms/funnel-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FunnelProductsTable from './funnel-products-table'
import { getProducts } from '@/http/products/get-products'

interface FunnelSettingsProps {
  slug: string
  defaultData: {
    id: string
    name: string
    description: string | null
    liveProducts?: string | null
    slug: string
  }
}

export default class FunnelSettings extends React.Component<FunnelSettingsProps> {
  constructor(props: FunnelSettingsProps) {
    super(props)
    this.state = {
      products: [],
      isLoading: true,
    }
  }

  async componentDidMount() {
    const { slug } = this.props
    const { products } = await getProducts({ org: slug })
    this.setState({ products, isLoading: false })
  }

  render() {
    const { defaultData } = this.props
    const { products, isLoading } = this.state as {
      products: any[]
      isLoading: boolean
    }

    return (
      <div className="flex gap-4 flex-col xl:!flex-row">
        <Card className="flex-1 flex-shrink">
          <CardHeader>
            <CardTitle>Funnel Products</CardTitle>
            <CardDescription>
              Select the products and services you wish to sell on this funnel.
              You can sell one-time and recurring products too.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading products...</p>
            ) : products && products.length > 0 ? (
              <FunnelProductsTable
                defaultData={{
                  id: defaultData.id,
                  liveProducts: defaultData.liveProducts || '', // Força um valor string
                  slug: defaultData.slug,
                }}
                products={products}
              />
            ) : (
              'No products found. Add products to start selling.'
            )}
          </CardContent>
        </Card>
        <FunnelForm
          isUpdating={true}
          initialData={{
            ...defaultData,
            description: defaultData.description || undefined,
          }}
        />
      </div>
    )
  }
}
