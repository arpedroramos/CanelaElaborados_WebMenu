# Capítulo 3: Componentes Básicos (UI)

Los componentes básicos residen en `src/components/ui/` y encapsulan estilos y comportamiento común.

## 1. Botones (Buttons)

Los botones comunican las acciones de la aplicación y se basan en clases utilitarias (`btn`, `btn-sm`, `btn-lg`).

### Especificaciones CSS Comunes
```css
.btn {
    padding: 8px 16px;
    font-family: var(--font-primary);
    font-size: var(--font-size-body-md);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.btn-sm { padding: 4px 10px; font-size: var(--font-size-body-sm); }
.btn-lg { padding: 10px 24px; font-size: var(--font-size-body-lg); }
```

### Variantes Visuales
- **Primary:** Botón de acción principal. Fondo oscuro (`#111111`), texto blanco.
- **Secondary:** Fondo claro (blanco), borde sutil. Se ilumina al hover.
- **Ghost/Icon:** Sin fondo ni borde. El fondo se oscurece ligeramente con el hover (`rgba(27,28,26,0.08)`). Usado para acciones en tablas.

## 2. Formularios (Inputs y Selects)

Los formularios están diseñados con un enfoque de alto contraste o *Affordance* (denotación interactiva).

- **Estado de Reposo:** Todos los inputs tienen un borde visible y un fondo gris muy tenue (`#F8F8F8`) para que se note claramente que son editables.
- **Hover & Focus:** Al posar el ratón se iluminan a fondo blanco (`#ffffff`), y al hacer foco se aplica un borde del color de marca `--input-border-focus` (`#931c47`) de 2px.
- **Grupos de Formulario (`form-group`):** Se utiliza CSS Grid para estructurar etiquetas (labels) e inputs, comúnmente dejando la etiqueta a la izquierda y el input a la derecha en escritorio, y apilándose en móviles con un gap de `16px`.

```css
.input-field {
    padding: 8px 12px;
    font-family: var(--font-primary);
    font-size: var(--font-size-body-md);
    border-radius: var(--radius);
    width: 100%;
}
```

## 3. Etiquetas y Chips de Estado (Badges)

Los `badges` (píldoras) se usan para indicar estados rápidos (Pendiente, Completado, Error).

```css
.badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    border-radius: var(--radius-pill); /* 9999px */
    font-family: var(--font-primary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: 1.4;
    white-space: nowrap;
    transition: none; /* sin animación — evita parpadeo */
}

/* Variantes de estado */
.badge-success  { color: var(--color-success-text); background: var(--color-success-bg); }
.badge-warning  { color: var(--color-warning-text); background: var(--color-warning-bg); }
.badge-error    { color: var(--color-error-text); background: var(--color-error-bg); }
.badge-info     { color: var(--color-info-text); background: var(--color-info-bg); }
```

## 4. Alertas (Alerts)

Cajas de información usadas para dar mensajes temporales o instrucciones globales. Se caracterizan por tener un borde grueso únicamente en el lado izquierdo (Accent Bar).

```css
.alert {
    padding: 12px 16px;
    border-radius: var(--radius);
    border-width: 0 0 0 4px;   /* Solo borde izquierdo (accent bar) */
    border-style: solid;
    font-family: var(--font-primary);
    font-size: var(--font-size-body-md);
}

.alert-success { color: var(--color-success-text); background: var(--color-success-bg); border-color: var(--color-success-text); }
.alert-warning { color: var(--color-warning-text); background: var(--color-warning-bg); border-color: var(--color-warning-text); }
.alert-error   { color: var(--color-error-text); background: var(--color-error-bg); border-color: var(--color-error-text); }
.alert-info    { color: var(--color-info-text); background: var(--color-info-bg); border-color: var(--color-info-text); }
```
