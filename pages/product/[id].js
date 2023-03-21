// export default function ProductDetail({id}) {
//   return <h1>Product Detail {id}</h1>;
// }


// export async function getServerSideProps(context) {
  //   let { id } = context.params;
  
  //   return {
    //     props: {
      //       id
      //     },
      //   };
      // }
import { Navbar } from "@/src/components/navbar.component";

const ProductDetail = ({ id }) => {
  return (
    <>
      <Navbar />
      <div>ProductDetail ID: {id}</div>
    </>
  );
};

export const getServerSideProps = (context) => {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
};

export default ProductDetail;
