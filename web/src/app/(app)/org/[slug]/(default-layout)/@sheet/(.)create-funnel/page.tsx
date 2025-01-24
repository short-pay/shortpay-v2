import { FunnelForm } from '@/components/forms/funnel-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function CreateFunnel() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Gateway Integration</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Configure and connect your preferred payment gateway.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <FunnelForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
