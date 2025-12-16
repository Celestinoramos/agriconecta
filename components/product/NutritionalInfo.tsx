import { InfoNutricional } from '@/types/produto';

interface NutritionalInfoProps {
  nutricional: InfoNutricional;
}

export default function NutritionalInfo({ nutricional }: NutritionalInfoProps) {
  const nutrientRows = [
    { label: 'Calorias', value: nutricional.calorias, unit: 'kcal' },
    { label: 'Proteínas', value: nutricional.proteinas, unit: 'g' },
    { label: 'Carboidratos', value: nutricional.carboidratos, unit: 'g' },
    { label: 'Fibras', value: nutricional.fibras, unit: 'g' },
    { label: 'Gorduras', value: nutricional.gorduras, unit: 'g' },
  ];

  if (nutricional.sodio !== undefined) {
    nutrientRows.push({ label: 'Sódio', value: nutricional.sodio, unit: 'mg' });
  }

  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Informação Nutricional
        </h3>
        <p className="text-sm text-gray-600">Valores por 100g</p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-sm font-semibold text-gray-700">
              Nutriente
            </th>
            <th className="text-right py-2 text-sm font-semibold text-gray-700">
              Quantidade
            </th>
          </tr>
        </thead>
        <tbody>
          {nutrientRows.map((row, index) => (
            <tr key={index} className="border-b last:border-0">
              <td className="py-3 text-sm text-gray-700">
                {row.label}
              </td>
              <td className="py-3 text-sm text-gray-900 text-right font-medium">
                {row.value}{row.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 italic pt-2">
        * Valores aproximados que podem variar de acordo com o lote e época de colheita.
      </p>
    </div>
  );
}
