'use client';

import { useState } from 'react';
import { Upload, Check, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Image from 'next/image';

interface UploadComprovativoProps {
  pedidoId: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

export default function UploadComprovativo({ pedidoId }: UploadComprovativoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error('Ficheiro muito grande. Máximo: 5MB');
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error('Tipo de ficheiro não permitido. Use JPG, PNG ou PDF');
      return;
    }

    setFile(selectedFile);
    setIsUploaded(false);

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Seleccione um ficheiro');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('comprovativo', file);

      const response = await fetch(`/api/pedido/${pedidoId}/comprovativo`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar comprovativo');
      }

      setIsUploaded(true);
      toast.success('Comprovativo enviado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao enviar comprovativo:', error);
      toast.error(error.message || 'Erro ao enviar comprovativo');
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setIsUploaded(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Comprovativo de Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              id="comprovativo-upload"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="comprovativo-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Clique para seleccionar o ficheiro
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG ou PDF (máx. 5MB)
              </p>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview */}
            <div className="border rounded-lg p-4">
              {preview ? (
                <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={preview}
                    alt="Preview do comprovativo"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-100 rounded">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF - {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {!isUploaded && (
                <>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        A enviar...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Enviar Comprovativo
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearFile}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
              {isUploaded && (
                <div className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-500 rounded-lg text-green-700">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Comprovativo enviado!</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-gray-700">
            ℹ️ Envie uma foto ou print do comprovativo de transferência. Iremos confirmar o pagamento e actualizar o estado do seu pedido.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
