const fs = require("fs");
// здесь необходимо перечислить ключи из файла ENV, а точнее - из ENV netlify
fs.writeFileSync(
  "./.env",
  `
    VITE_API_URL=${process.env.VITE_API_URL}\n
  `,
);
