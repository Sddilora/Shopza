import Head from "next/head";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is the home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold text-center">Home Page</h1>
    </div>
  );
}

export default HomePage;
