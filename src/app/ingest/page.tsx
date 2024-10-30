'use client'
import { useState } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UploadDocument = () => {
  const [fileName, setFileName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadComplete(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (!response.ok) throw new Error('Upload failed');
    // } catch (error) {
    //   console.error('Upload error:', error);
    //   return;
    // }
    
    setIsUploading(false);
    setUploadComplete(true);
    setFile(null);
    setFileName('');
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setUploadComplete(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Upload Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`
                  flex flex-col items-center justify-center w-full h-48 
                  border-2 border-dashed rounded-lg cursor-pointer
                  transition-colors duration-200
                  ${fileName ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                `}
              >
                {fileName ? (
                  <div className="text-center space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-blue-500" />
                    <div className="text-sm font-medium text-gray-900">{fileName}</div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleReset();
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4 inline-block mr-1" />
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <div className="text-sm font-medium text-gray-600">
                      Drop your file here or click to browse
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </div>
                )}
              </label>
            </div>

            <button
              onClick={handleUpload}
              disabled={!fileName || isUploading || uploadComplete}
              className={`
                w-full py-3 px-4 rounded-lg font-medium
                transition-colors duration-200
                flex items-center justify-center space-x-2
                ${
                  uploadComplete
                    ? 'bg-green-500 text-white cursor-default'
                    : !fileName
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }
              `}
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : uploadComplete ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Upload Complete</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Document</span>
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default UploadDocument;
