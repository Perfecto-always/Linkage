import AllRoutes from "./Routes";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <meta
          name='description'
          content='Chat listen to music all at the same time'
        />
        <link rel='canonical' href='https://praline.netlify.app/chat' />
      </Helmet>
      <AllRoutes />
    </>
  );
}

export default App;
