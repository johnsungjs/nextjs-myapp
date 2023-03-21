import { Navbar } from "@/src/components/navbar.component";
import { linkApi } from "@/src/service/linkApi";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [visible]);

  console.log("loading", loading);

  // let timeout;
  // useEffect(() => {
  //   setLoading(true);
  //   timeout = setTimeout(() => {
  //     setData([{ id: 1 }, { id: 2 }]);
  //     setLoading(false);
  //   }, 3000);
  //   return () => clearTimeout(timeout);
  // });

  return (
    <div>
      <Navbar />
      <h1>Product List</h1>
      {loading
        ? "Loading"
        : data.map((item) => {
            return (
              <div key={item.id} style={{margin: "30px"}}>
                <p>User ID: {item.userId}</p>
                <p>Title: {item.title}</p>
                <p>Body: {item.body}</p>
                {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
              </div>
            );
          })}
    </div>
  );
}
