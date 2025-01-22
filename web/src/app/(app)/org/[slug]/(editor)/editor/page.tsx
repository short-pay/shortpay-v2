'use client'

import { useState } from 'react'
import BlockViewer from './components/block-viewer'

export default function Editor() {
  const [themeConfig, _setThemeConfig] = useState({
    primaryColor: '#28BF65',
    logo: '',
    companyName: 'Minha Loja',
    securityBadgeEnabled: true,
  })

  return (
    <div className="max-h-screen px-6 py-8 flex flex-col">
      <BlockViewer name="example-theme" config={themeConfig} description={''} />
    </div>
  )
}
