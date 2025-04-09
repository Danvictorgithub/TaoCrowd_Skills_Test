import app from "./app";

const port = process.env.PORT || 5000;

// Wait for app to be fully initialized
setTimeout(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}, 100);
