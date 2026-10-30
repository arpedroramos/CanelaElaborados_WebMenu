import { CONTACTO } from './contacto';

interface SeccionLegal {
  titulo: string;
  parrafos: readonly string[];
}

export interface DocumentoLegal {
  titulo: string;
  actualizado: string;
  secciones: readonly SeccionLegal[];
}

const MARCA = 'Canela Elaborados';

export const PRIVACIDAD: DocumentoLegal = {
  titulo: 'Política de privacidad',
  actualizado: '26 de octubre de 2026',
  secciones: [
    {
      titulo: 'Quiénes somos',
      parrafos: [
        `${MARCA} es un emprendimiento de pastelería artesanal de La Plata, Buenos Aires, Argentina. Podés contactarnos por WhatsApp al ${CONTACTO.whatsappVisible}.`,
      ],
    },
    {
      titulo: 'Qué datos recolectamos',
      parrafos: [
        'Este sitio no tiene formularios, cuentas de usuario ni compras en línea, y no usa cookies propias ni herramientas de analítica o publicidad. No guardamos datos personales de las personas que lo visitan.',
        'La consulta que armás (productos y cantidades) vive solo en tu dispositivo. Si escribís tu nombre en la barra de consulta, tu navegador lo recuerda en su almacenamiento local para la próxima visita; no se envía a ningún servidor nuestro y podés borrarlo desde los datos del sitio en la configuración de tu navegador.',
      ],
    },
    {
      titulo: 'Cuando nos escribís',
      parrafos: [
        'Al tocar «Enviar por WhatsApp» o «Pedir por WhatsApp» se abre WhatsApp con un mensaje que incluye lo que armaste y tu nombre. Desde ese momento la conversación se rige también por la política de privacidad de WhatsApp (Meta).',
        'Usamos los datos que nos compartís solo para responder tu consulta, coordinar y entregar tu pedido.',
      ],
    },
    {
      titulo: 'Servicios de terceros',
      parrafos: [
        'Adobe Fonts: las tipografías se cargan desde los servidores de Adobe, que pueden recibir tu dirección IP y datos técnicos de tu navegador.',
        'GitHub Pages: es el servicio donde está alojado el sitio y puede registrar tu dirección IP por razones de seguridad y funcionamiento.',
        'WhatsApp e Instagram (Meta): solo intervienen si tocás los enlaces del sitio hacia esos servicios.',
      ],
    },
    {
      titulo: 'Tus derechos',
      parrafos: [
        'Según la Ley 25.326 de Protección de Datos Personales, podés pedirnos acceso, rectificación, actualización o supresión de los datos que nos hayas compartido. Escribinos por WhatsApp y te respondemos.',
        'La Agencia de Acceso a la Información Pública (AAIP) es el órgano de control de esa ley y atiende las denuncias y reclamos de quienes consideren afectados sus derechos.',
      ],
    },
    {
      titulo: 'Cambios en esta política',
      parrafos: ['Si agregamos nuevas herramientas o cambiamos algo de lo anterior, actualizamos esta página y su fecha.'],
    },
  ],
};

export const TERMINOS: DocumentoLegal = {
  titulo: 'Términos de los pedidos',
  actualizado: '26 de octubre de 2026',
  secciones: [
    {
      titulo: 'Qué es este sitio',
      parrafos: [
        `El sitio de ${MARCA} muestra nuestros productos y permite armar una consulta. No se compra en línea: todos los pedidos se coordinan por WhatsApp.`,
      ],
    },
    {
      titulo: 'Cómo hacer un pedido',
      parrafos: [
        'Escribinos por WhatsApp con el producto, la cantidad y la fecha en que lo necesitás. Te confirmamos disponibilidad, precio final y detalles antes de reservar.',
      ],
    },
    {
      titulo: 'Anticipación',
      parrafos: [
        `Los pedidos se hacen con ${CONTACTO.plazoPedido} de anticipación. Para tortas personalizadas o fechas especiales conviene escribirnos con más tiempo.`,
      ],
    },
    {
      titulo: 'Precios',
      parrafos: [
        'Los precios del sitio son de referencia y pueden cambiar. El presupuesto de la barra de consulta es estimado y puede sufrir modificaciones; el precio final se confirma por WhatsApp.',
      ],
    },
    {
      titulo: 'Reserva y pago',
      parrafos: [
        'Para reservar el pedido se abona una seña, y el resto se paga al entregar. El monto y los medios de pago se acuerdan por WhatsApp.',
      ],
    },
    {
      titulo: 'Entrega y retiro',
      parrafos: [
        `Ofrecemos retiro y entrega a domicilio. ${CONTACTO.ubicacion} El costo y la zona de envío se coordinan por WhatsApp.`,
      ],
    },
    {
      titulo: 'Personalización, cambios y cancelaciones',
      parrafos: [
        'Los detalles de cada producto personalizado, y cualquier cambio o cancelación de un pedido, se acuerdan por WhatsApp según el producto y la fecha.',
      ],
    },
    {
      titulo: 'Fotos y productos artesanales',
      parrafos: [
        'Nuestros productos son caseros y artesanales, por lo que pueden variar levemente respecto de las fotos. Las imágenes y la marca son de Canela Elaborados y no se pueden reproducir sin permiso.',
      ],
    },
  ],
};
