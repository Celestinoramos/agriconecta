import { Snowflake } from 'lucide-react';

interface ConservationTipsProps {
  conservacao: string;
  epocaColheita?: string[];
}

export default function ConservationTips({ conservacao, epocaColheita }: ConservationTipsProps) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Snowflake className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Conservação
        </h3>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {conservacao}
        </p>
      </div>

      {epocaColheita && epocaColheita.length > 0 && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Época de Colheita
          </h4>
          <div className="flex flex-wrap gap-2">
            {epocaColheita.map((mes, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {mes}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
