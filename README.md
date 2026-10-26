# Canela Elaborados — Portfolio y Menú

Sitio estático (React 19, Vite, Tailwind 4, shadcn/ui) publicado en GitHub Pages en `canelaelaborados.com.ar`.

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run lint     # oxlint
npm run build    # tsc -b && vite build, salida en dist/
npm run preview  # servir dist/ localmente
```

## Estructura

- `src/modules/home/`: vista principal y componentes del menú.
- `src/data/`: catálogo por categoría (editar aquí para cambiar productos y precios).
- `src/components/ui/`: componentes shadcn.
- `docs/`: marca, diseño y despliegue.
- `.agents/`: reglas y skills para agentes (`.agents/AGENTS.md`).

## Despliegue

Se publica `dist/` en la rama `gh-pages`. Ver `docs/05_Control_de_Versiones_Git/`.
