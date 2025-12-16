'use client';

import { useState } from 'react';
import { Share2, Facebook, MessageCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
  productName: string;
  productUrl: string;
}

export default function ShareButtons({ productName, productUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleWhatsAppShare = () => {
    const message = `Veja este produto no AgriConecta: ${productName}\n${productUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      toast.success('Link copiado!', {
        description: 'O link do produto foi copiado para a área de transferência.'
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error('Erro ao copiar link', {
        description: 'Não foi possível copiar o link. Tente novamente.'
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 mr-2 flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Partilhar:
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleWhatsAppShare}
        className="gap-2"
        aria-label="Partilhar no WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebookShare}
        className="gap-2"
        aria-label="Partilhar no Facebook"
      >
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
        aria-label="Copiar link"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Copiar</span>
          </>
        )}
      </Button>
    </div>
  );
}
