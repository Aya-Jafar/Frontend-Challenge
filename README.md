# 🧩 Frontend Challenge

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Nuxt 3](https://img.shields.io/badge/Nuxt%203-00DC82?logo=nuxt.js&logoColor=white&style=for-the-badge)](https://nuxt.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)

![result](./result.png)

# Code structure

I followed [Nuxt.js](https://nuxt.com/docs/guide/directory-structure/nuxt) guide to organize my folder structure and code
**except** wrapping everything inside a `src/` folder to keep the root clean and seperate main files from congigaration files.

```
frontend-challenge/
├── src/
│   ├── components/       # Reusable UI components
│   ├── composables/      # Reusable logic & hooks
│   ├── layouts/          # App layouts
│   ├── pages/            # Nuxt pages (routes)
│   ├── services/         # API services
│   ├── stores/           # state management stores & data preprocessing
│   ├── utils/            # Utility functions, constants and TypeScript types
│   ├── app.vue           # Root Vue component
│   ├── server/           # SSR endpoints fetch
│   └── assets/           # Images, fonts, global styles, and other assets
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
└── nuxt.config.ts    # Nuxt configuration
└── ...Other root files for Nuxt js configuration...
```

<br/>
<br/>

# DTO (Data Transfer Object) approch

Since the data returned from the API is not always the same especially for nested data, I used DTOs to define the data structure and preprocess it.
This allows me to have a clear contract for the data I expect from the API and handle any changes in the API response wit the minimum changes in frontend code.

### Example of DTO (in `src/stores/products/DTO/products.ts`)

```typescript
export const ProductsDTOBuilder = (wrapper: Product[]): ProductDTO[] => {
  return wrapper?.map(
    (product: Product): ProductDTO => ({
      title: product?.title || "No Title",
      price: Number(product?.price?.value)?.toLocaleString() || "0",
      //...other fields preprocessing...
    })
  );
};
```

# Multiple states handling in one wrapper component example

```html
<WrapperComponent
  :card-skeleton="true"
  :is-loading="isLoading"
  :is-pending="isPending"
  :is-success="isSuccess"
  :error="error"
  :is-online="isOnline"
  :is-empty="isDataEmpty"
>
  <template #content>Your main content goes here</template>
</WrapperComponent>
```

# Metric

![alt](./metric.png)

# Development Setup

1. Clone the repository

```shell
git clone https://github.com/Aya-Jafar/frontend-challenge.git
```

2. Install dependencies

```shell
npm install
```

3. Run development server

```shell
npm run dev
```

Happy coding! 🚀
