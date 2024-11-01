import { Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DocumentSection } from '@/libs/types';
import { cn } from "@/lib/utils"

const ResultItem = ({ section }: { section: DocumentSection }) => {
return (
    <div className={cn(
      "p-4 rounded-lg border", 
      section.status === "yes" ? "bg-[#f7e6e166]" : "bg-[#e1f7e766]"
    )}>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {section.status === "no" ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-gray-900">
            {section.reason}{section.status}
          </h3>
          <Alert variant={section.status ? "default" : "destructive"}>
            <AlertDescription>
              {section.title}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
};

export default ResultItem;
