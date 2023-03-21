import { linkApiLocal } from "@/src/service/linkApi";
import axios from "axios";

export default function ProductSsr({data}) {
  return (
    <div className='w-full'>
      {Array.isArray(data) && data.length > 0
        ? data.map((item) => {
            return <li key={item.id}>{item.id}:  {item.title}</li>;
          })
        : "Empty"}
    </div>
  );
}

export async function getServerSideProps(context) {
  //call api
  const [err, data] = await axios
    .get(linkApiLocal)
    .then((response) => {
      return [null, response.data];
    })
    .catch((err) => {
      return [err, null];
    });
  if (err) {
    return {
      redirect: {
        destination: "/about",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
}
