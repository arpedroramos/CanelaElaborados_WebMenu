# Canela Elaborados — Portfolio y Menú

Sitio estático (React 19, Vite, Tailwind 4, shadcn/ui) publicado en GitHub Pages en `canelaelaborados.com.ar`.

El menú **no se edita en este repo**: lo carga la app de gestión (AppGestion) y lo publica como `data/menu.json` y fotos en `public/img/menu/`. Este sitio solo lo lee.

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run validar  # valida data/menu.json (formato y fotos existentes)
npm run lint     # oxlint
npm run build    # validar + tsc -b + vite build, salida en dist/
npm run preview  # servir dist/ localmente
```

## Estructura

- `data/menu.json`: el menú (lo escribe la app; no editar a mano).
- `public/img/menu/*.webp`: fotos del menú (las sube la app).
- `src/modules/home/`: vista principal y componentes del menú.
- `src/data/`: tipos del menú (`menu_types.ts`), lectura (`menu.ts`) y texto de pedido de WhatsApp (`pedido.ts`).
- `src/components/ui/`: componentes shadcn.
- `scripts/validar-menu.ts`: validación que corre antes de cada build.
- `docs/`: marca, diseño, despliegue y flujo del menú.
- `.agents/`: reglas y skills para agentes (`.agents/AGENTS.md`).

## Cómo se publica

Cargar en la app → **Publicar menú** → la app hace un commit en `main` → GitHub Actions compila, valida y despliega → en 1–2 minutos queda en línea.

Detalle, estado del despliegue y cómo volver atrás: `docs/05_Control_de_Versiones_Git/`.
