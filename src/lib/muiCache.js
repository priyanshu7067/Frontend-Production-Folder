import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui",
  prepend: true, // 🔥 Tailwind ke saath fix
});

export default muiCache;