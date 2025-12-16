import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Produtor } from '@/types/produto';
import { MapPin, Calendar } from 'lucide-react';

interface ProducerCardProps {
  produtor: Produtor;
  provincia: string;
}

export default function ProducerCard({ produtor, provincia }: ProducerCardProps) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      <div className="flex items-start gap-4">
        {/* Producer Image/Avatar */}
        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {produtor.imagem ? (
            <Image
              src={produtor.imagem}
              alt={produtor.nome}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-gray-400">
              {produtor.nome.charAt(0)}
            </div>
          )}
        </div>

        {/* Producer Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900">
            {produtor.nome}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Calendar className="h-4 w-4" />
            <span>Membro desde {produtor.desde}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <MapPin className="h-4 w-4" />
            <span>{provincia}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {produtor.descricao}
      </p>

      {/* Certifications */}
      {produtor.certificacoes && produtor.certificacoes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Certificações:</p>
          <div className="flex flex-wrap gap-2">
            {produtor.certificacoes.map((cert, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
