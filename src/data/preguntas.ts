import { CONTACTO } from './contacto';

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const PREGUNTAS: readonly Pregunta[] = [
  {
    pregunta: '¿Cómo hago un pedido?',
    respuesta:
      'Escribinos por WhatsApp contando qué producto querés, la cantidad y para qué fecha. Te confirmamos disponibilidad y armamos tu encargo.',
  },
  {
    pregunta: '¿Con cuánta anticipación tengo que pedir?',
    respuesta: `Con ${CONTACTO.plazoPedido} de anticipación. Para tortas personalizadas o fechas especiales, conviene escribirnos con más tiempo.`,
  },
  {
    pregunta: '¿Se pueden personalizar los productos?',
    respuesta:
      'Sí. Nuestros productos son caseros y artesanales, y los adaptamos a cada necesidad: sabores, diseños y ocasión. Contanos qué tenés en mente por WhatsApp.',
  },
  {
    pregunta: '¿Cómo se paga?',
    respuesta:
      'Para reservar tu pedido se abona una seña, y el resto se paga al entregar. Te pasamos los datos y el monto por WhatsApp.',
  },
  {
    pregunta: '¿Hacen entregas o tengo que retirar?',
    respuesta:
      'Ofrecemos retiro y entrega a domicilio. El costo y la zona de envío se coordinan por WhatsApp al hacer el pedido.',
  },
  {
    pregunta: '¿Dónde están ubicados?',
    respuesta: `${CONTACTO.ubicacion} Te indicamos el punto de retiro al confirmar el pedido.`,
  },
];
