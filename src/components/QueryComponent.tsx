import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResultItem } from '@/components';
import { DocumentSection } from '@/libs/types';

const QueryComponent = ({ responses, handleReset }: { responses: DocumentSection[], handleReset: () => void }) => {
    return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Document Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {responses.map((section, index) => (
                <ResultItem key={index} section={section}/>
              ))}

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear Results
                </button>
              </div>
            </CardContent>
          </Card>
    );
}

export default QueryComponent;
