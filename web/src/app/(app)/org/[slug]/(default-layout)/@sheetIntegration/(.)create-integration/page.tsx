import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { IntegrationForm } from '../../create-integration/integration-form'

export default function CreateIntegration() {
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
          <IntegrationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
