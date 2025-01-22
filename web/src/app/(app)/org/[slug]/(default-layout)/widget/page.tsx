// 'use client'

// import { useEffect, useState } from 'react'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// type ParentHandshake = {
//   emit: (event: string, data: any) => void
// }

// export default function FormWidget() {
//   const [handshake, setHandshake] = useState<ParentHandshake | null>(null)

//   useEffect(() => {
//     const model = {
//       height: () => document.body.offsetHeight,
//     }

//     // new Postmate.Model(model).then(setHandshake)

//     // Initialize iframe-resizer
//     const script = document.createElement('script')
//     script.src =
//       'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js'
//     document.body.appendChild(script)

//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [])

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const formData = new FormData(event.currentTarget)
//     const data = Object.fromEntries(formData)
//     handshake?.emit('formSubmit', data)
//   }

//   return (
//     <div className="mx-auto max-w-md p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="name">Nome</Label>
//           <Input id="name" name="name" required />
//         </div>
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" name="email" type="email" required />
//         </div>
//         <div>
//           <Label htmlFor="cpf">CPF</Label>
//           <Input
//             id="cpf"
//             name="cpf"
//             required
//             pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
//             placeholder="000.000.000-00"
//           />
//         </div>
//         <Button type="submit" className="w-full">
//           Enviar
//         </Button>
//       </form>
//     </div>
//   )
// }
