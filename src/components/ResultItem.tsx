import { Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DocumentSection } from '@/libs/types';

const ResultItem = ({ index, section }: { index: number, section: DocumentSection }) => {
return (
    <div className="p-4 rounded-lg border bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {section.status ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-gray-900">
            {section.title}
          </h3>
          <Alert variant={section.status ? "default" : "destructive"}>
            <AlertDescription>
              {section.reason}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
};

export default ResultItem;
