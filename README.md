# 🛒 Ecommerce Frontend

Proyecto frontend simple con React 19 + Vite 7 + TypeScript + TailwindCSS + TanStack Query (React Query) + Axios.
Estructura organizada en features/\* para manejar CRUDs de manera modular.

## 🚀 Requisitos previos

- Node.js LTS 22 [link de descarga](https://nodejs.org/es/download/)
- pnpm (gestor de paquetes)

Instalar pnpm globalmente:

```
npm i -g pnpm
```

## Instalación

1. Clonar el repositorio:

```
git clone [https://github.com/tu-usuario/ecommerce-frontend.git](https://github.com/SebastianLl28/ecommerce-frontend.git)
cd ecommerce-frontend
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Crear archivo `.env` en la raíz con la variable de entorno:

```
VITE_API_URL=http://localhost:8080/api # Cambia la URL según tu backend
```

4. Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

5. Abrir en el navegador:

```
http://localhost:5173
```

## Scripts

- `pnpm dev` – servidor de desarrollo (Vite)
- `pnpm build` – build de producción (tsc + vite)
- `pnpm preview` – previsualizar build
- `pnpm lint` – ESLint

## 🧱 Stack

- **React 19**, **React Router 7**
- **TypeScript 5**
- **Vite 7**
- **TailwindCSS 4** + **shadcn/ui** (Radix + utilidades en `components/ui/*`)
- **TanStack Query 5** (data fetching, caché, revalidación)
- **Axios** (`lib/axios.ts`)
- **Zustand 5** (estado local compartido: filtros, contador del carrito, auth)
- **React Hook Form + Zod** (formularios/tipado – cuando aplique)
- **sonner** (toasts)

---

## 🗂️ Estructura de archivos

```text
src/
├─ App.tsx                         # Router y bootstrapping
├─ components/
│  ├─ layout/main/MainLayout.tsx   # Layout raíz (cabecera/slot principal)
│  ├─ shared/                      # UI compartida por varias features
│  │  ├─ header/Header.tsx         # Header global (Ver Compras, Carrito, Logout…)
│  │  └─ filter/                   # Filtro global (toggle en mobile)
│  │     ├─ Filter.tsx
│  │     └─ ui/ButtonFilter.tsx
│  └─ ui/                          # shadcn/ui (wrapper locales)
│     ├─ button.tsx, card.tsx, input.tsx, ...
│     └─ sonner.tsx                # Toast provider
│
├─ config/
│  ├─ env.ts                       # lectura de VITE_API_URL
│  └─ constants.ts                 # claves, rutas, etc.
│
├─ features/                       # cada módulo del negocio vive aquí
│  ├─ auth/
│  │  ├─ api.ts                    # llamadas HTTP del feature
│  │  ├─ hooks.tsx                 # hooks que consumen api (react-query)
│  │  ├─ pages/LoginPage.tsx
│  │  ├─ schema.ts / types.ts      # zod y tipos del feature
│  │  └─ ui/LogoutButton.tsx
│  │
│  ├─ product/
│  │  ├─ api.ts, hooks.tsx, types.ts
│  │  ├─ pages/ProductsPage.tsx
│  │  └─ ui/                       # piezas de UI del feature
│  │     ├─ FiltersPanel.tsx
│  │     ├─ ProductCard.tsx
│  │     └─ ProductsGrid.tsx
│  │
│  ├─ shopping-cart/
│  │  ├─ api.ts, hooks.tsx, types.ts
│  │  ├─ pages/ShoppingCartPage.tsx
│  │  └─ ui/
│  │     ├─ CartButton.tsx / MobileCartButton.tsx
│  │     ├─ QtyStepper.tsx
│  │     ├─ ShopingCartCard.tsx
│  │     ├─ ShopingCartGrid.tsx
│  │     ├─ ShoppingCartHeader.tsx
│  │     └─ ShoppingCartFooter.tsx
│  │
│  ├─ checkout/
│  │  ├─ api.ts, hooks.tsx
│  │  ├─ pages/CheckoutPage.tsx
│  │  └─ ui/
│  │     ├─ ShippingFormCard.tsx   # dirección/teléfono/notas (sin botón propio)
│  │     ├─ PaymentCard.tsx        # método de pago (UI)
│  │     ├─ ItemsReview.tsx        # items del carrito
│  │     └─ OrderSummary.tsx       # total + “Confirmar y pagar”
│  │
│  └─ orders/
│     ├─ api.ts, hooks.tsx, types.ts
│     ├─ pages/OrdersListPage.tsx  # listado de pedidos (usa useGetOrders)
│     └─ pages/OrderSuccessPage.tsx# confirmación (usa useGetOrder/:id)
│
├─ lib/
│  ├─ axios.ts                     # instancia Axios (baseURL, interceptores)
│  ├─ queryClient.ts               # QueryClient (React Query)
│  └─ utils.ts                     # helpers: money, formateos, etc.
│
├─ store/
│  ├─ authStore.ts                 # sesión/token si aplica
│  ├─ useCartStore.ts              # contador de carrito (y derivados)
│  └─ useFilterStore.ts            # filtros del catálogo
│
├─ types/apiTypes.ts               # tipos genéricos de API/DTO
├─ index.css                       # global styles (tailwind base, etc.)
├─ main.tsx                        # providers (Router, QueryClientProvider, Toaster)
└─ vite-env.d.ts
```
