import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/Productitem";
import data from "../utils/data";
import Cookies from 'js-cookie';

const Home = () =>  {
  const [parsedCookies, setParsedCookies] = useState('');

  useEffect(() => {
    const stringCookies = Cookies.get('session');
    const unescapeCookies = stringCookies.replace(/\\054/g, ',').replace(/\\\"/g, '"');

    try {
      const parsedCookies = JSON.parse(unescapeCookies);
      setParsedCookies(parsedCookies);
    } catch (error) {
      console.error('Error parsing cookies:', error);
    }
  }, []);

  console.log('Parsed cookies:', parsedCookies);

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
