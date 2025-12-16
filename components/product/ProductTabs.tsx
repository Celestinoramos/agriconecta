'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProdutoDetalhado } from '@/types/produto';
import ProducerCard from './ProducerCard';
import NutritionalInfo from './NutritionalInfo';
import ConservationTips from './ConservationTips';
import { useEffect, useState, useCallback } from 'react';

interface ProductTabsProps {
  produto: ProdutoDetalhado;
}

export default function ProductTabs({ produto }: ProductTabsProps) {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Desktop Tabs
  if (!isMobile) {
    return (
      <Tabs defaultValue="descricao" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="descricao">Descrição</TabsTrigger>
          <TabsTrigger value="produtor">Produtor</TabsTrigger>
          <TabsTrigger value="nutricao">Nutrição</TabsTrigger>
          <TabsTrigger value="conservacao">Conservação</TabsTrigger>
        </TabsList>

        <TabsContent value="descricao" className="mt-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {produto.descricaoCompleta}
            </p>
            {produto.tags && produto.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {produto.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="produtor" className="mt-6">
          <ProducerCard 
            produtor={produto.produtorInfo} 
            provincia={produto.origem.provincia}
          />
        </TabsContent>

        <TabsContent value="nutricao" className="mt-6">
          <NutritionalInfo nutricional={produto.nutricional} />
        </TabsContent>

        <TabsContent value="conservacao" className="mt-6">
          <ConservationTips 
            conservacao={produto.conservacao}
            epocaColheita={produto.epocaColheita}
          />
        </TabsContent>
      </Tabs>
    );
  }

  // Mobile Accordion
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="descricao">
        <AccordionTrigger>Descrição</AccordionTrigger>
        <AccordionContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {produto.descricaoCompleta}
            </p>
            {produto.tags && produto.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {produto.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="produtor">
        <AccordionTrigger>Produtor</AccordionTrigger>
        <AccordionContent>
          <ProducerCard 
            produtor={produto.produtorInfo} 
            provincia={produto.origem.provincia}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="nutricao">
        <AccordionTrigger>Informação Nutricional</AccordionTrigger>
        <AccordionContent>
          <NutritionalInfo nutricional={produto.nutricional} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="conservacao">
        <AccordionTrigger>Conservação</AccordionTrigger>
        <AccordionContent>
          <ConservationTips 
            conservacao={produto.conservacao}
            epocaColheita={produto.epocaColheita}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
