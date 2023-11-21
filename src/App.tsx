import { ApolloProvider } from "@apollo/client"
import { client } from './services/apollo.ts'
import { Router } from "./routes/routes.tsx"
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
