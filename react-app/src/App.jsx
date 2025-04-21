import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import About from "./components/About/About";

import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cities/:slug" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="about/:slug" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
