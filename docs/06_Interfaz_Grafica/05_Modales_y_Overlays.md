# Capítulo 5: Modales y Overlays

Los modales interrumpen el flujo principal de trabajo requiriendo la atención del usuario. Se localizan en `src/components/modals/`. En **App Canela**, el 100% de los 28 modales está estandarizado bajo el componente unificado `ModalShell` ([ModalShell.tsx](file:///c:/Users/arped/Desktop/App%20Canela/AppGestionCanela/src/components/ui/ModalShell.tsx)).

## 1. Estandarización con `ModalShell`
`ModalShell` proporciona:
- **Responsive adaptativo:** En dispositivos móviles (`< sm`), los modales se transforman automáticamente en páneles flotantes con bordes `rounded-t-2xl` y scroll contenido o pantalla completa según `modalSize`.
- **Cierre por accesibilidad:** Soporte nativo para tecla `Escape` y click en backdrop de elevación.
- **Header distinguible unificado:** Cabecera `.modal-header` con fondo cálido de superficie (`--color-surface-container-low` / `#ede4da`), borde inferior sutil y sombra tenue para destacar del contenido.
- **Botones de acción identificables:** Acciones de cabecera en `headerActions` usando `.btn-primary` (borra de vino `#931c47` con texto blanco) y botón de cierre táctil circular `.modal-close`.

## 2. Tamaños de Modal (`modalSize`)

| Clave | `max-width` | Uso |
|---|---|---|
| `modal-sm` | `420px` | Confirmaciones, alertas, formularios simples (`MarcaFormModal`, `PurchaseEditModal`, `PriceUpdateModal`) |
| `modal-md` | `640px` | Formularios estándar, opciones de compra (`MateriaPrimaOpcionModal`, `PurchaseInfoModal`) |
| `modal-lg` | `900px` | Resumen de pedidos, explosionado de insumos (`OrderInfoModal`, `NewOrderModal`) |
| `modal-fs` | `100vw / 100vh` | Formularios complejos estilo Odoo 2 columnas (`RecipeFormModal`, `MateriaPrimaFormModal`) |

---

## 3. Anatomía Estándar de Modales

```tsx
<ModalShell
  isOpen={isOpen}
  onClose={onClose}
  title="Título del Modal"
  modalSize="modal-md"
>
  <div className="flex flex-col flex-1 overflow-hidden bg-surface">
    <div className="modal-body p-4 sm:p-6 space-y-4 overflow-y-auto">
      {/* Contenido scrollable */}
    </div>
    <div className="modal-footer p-4 sm:p-6 bg-surface-container border-t border-border-subtle flex justify-end gap-3">
      {/* Botones de acción sticky con min-h-[44px] */}
    </div>
  </div>
</ModalShell>
```

---

## 4. Estado de Cobertura UI/UX
- **Total de Modales:** 28 / 28.
- **Cobertura UI/UX y Reglas Responsive:** **100%**.
- **Fuentes Numéricas:** Números, montos y unidades formateados con `JetBrains Mono`.

