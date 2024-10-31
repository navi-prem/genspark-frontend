'use client'
import { useState } from 'react';
import { Upload, X, FileText, Check, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentSection } from '@/libs/types';
import { QueryComponent } from '@/components';

const UploadDocument = () => {
  const [fileName, setFileName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [responses, setResponses] = useState<DocumentSection[]>([]);
  const [tags, setTags] = useState<{ [key: string]: string }>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadComplete(false);
      setResponses([]);
      setTags({});
    }
  };

  const handleAddTag = () => {
    if (newKey.trim() && newValue.trim()) {
      setTags(prev => ({
        ...prev,
        [newKey.trim()]: newValue.trim()
      }));
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemoveTag = (keyToRemove: string) => {
    setTags(prev => {
      const newTags = { ...prev };
      delete newTags[keyToRemove];
      return newTags;
    });
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', JSON.stringify(tags));

    await new Promise(resolve => setTimeout(resolve, 1500));

    const dummyResponse: DocumentSection[] = [
      {
        title: "Introduction",
        status: true,
        reason: "The introduction section follows the standard format and includes all required elements."
      },
      {
        title: "Methodology",
        status: false,
        reason: "Missing key experimental procedures and control group details."
      },
      {
        title: "Results",
        status: true,
        reason: "Data presentation is clear and well-structured with appropriate statistical analysis."
      },
      {
        title: "Discussion",
        status: true,
        reason: "Comprehensive analysis of findings with relevant literature citations."
      },
      {
        title: "References",
        status: false,
        reason: "Several citations are incomplete or do not follow the required format."
      }
    ];

    setResponses(dummyResponse);
    setIsUploading(false);
    setUploadComplete(true);
    setFile(null);
    setFileName('');
    setTags({});

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (!response.ok) throw new Error('Upload failed');
    //   
    //   const data: DocumentSection[] = await response.json();
    //   setResponses(data);
    // } catch (error) {
    //   console.error('Upload error:', error);
    //   return;
    // } finally {
    //   setIsUploading(false);
    //   setUploadComplete(true);
    //   setFile(null);
    //   setFileName('');
    //   setTags({});
    // }
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setUploadComplete(false);
    setResponses([]);
    setTags({});
    setNewKey('');
    setNewValue('');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
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

              {fileName && (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700">Add Tags</div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      placeholder="Key"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    <button
                      onClick={handleAddTag}
                      disabled={!newKey.trim() || !newValue.trim()}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {Object.entries(tags).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(tags).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full"
                        >
                          <span className="text-sm text-blue-700">
                            {key}: {value}
                          </span>
                          <button
                            onClick={() => handleRemoveTag(key)}
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

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

        {responses.length > 0 && (
          <QueryComponent responses={responses} handleReset={handleReset}/>
        )}
      </div>
    </main>
  );
};

export default UploadDocument;
