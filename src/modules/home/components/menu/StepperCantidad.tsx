import { Minus, Plus } from 'lucide-react';

const paso = (compacto?: boolean) =>
  `inline-flex ${compacto ? 'size-9' : 'size-11'} items-center justify-center rounded-full border-[1.5px] border-lila bg-crema text-lila-deep outline-none hover:border-lavanda hover:bg-lavanda hover:text-carbon focus-visible:ring-3 focus-visible:ring-lavanda`;

interface Props {
  cantidad: number;
  nombre: string;
  compacto?: boolean;
  onChange: (delta: number) => void;
}

export const StepperCantidad = ({ cantidad, nombre, compacto, onChange }: Props) => (
  <div className="inline-flex items-center gap-1" role="group" aria-label={`Cantidad de ${nombre}`}>
    <button type="button" className={paso(compacto)} onClick={() => onChange(-1)} aria-label={`Quitar uno de ${nombre}`}>
      <Minus className="size-4" aria-hidden="true" />
    </button>
    <span className="min-w-6 text-center text-sm font-bold text-carbon" aria-live="polite">
      {cantidad}
    </span>
    <button type="button" className={paso(compacto)} onClick={() => onChange(1)} aria-label={`Agregar uno de ${nombre}`}>
      <Plus className="size-4" aria-hidden="true" />
    </button>
  </div>
);
