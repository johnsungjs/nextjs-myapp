import { linkApi } from "@/src/service/linkApi";

export default function SSR(props) {
  let { data } = props;

  return (
    <>
      <h1>Server Side Rendering</h1>
      <p>simulasi Server Side Rendering di nextjs</p>
      <div className='w-full space-y-6'>
        {data.map((item) => (
          <div key={item.id} className='w-full bg gray-100 p-4 border-solid border-2 border-indigo-600'>
            <p>User ID: {item.userId}</p>
            <p>ID: {item.id}</p>
            <p>Title: {item.title}</p>
            <p>Body: {item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let data = [];

  await fetch(linkApi)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      data = response;
    })
    .catch((err) => {
      data = [];
    });

  return {
    props: {
      data,
    },
  };
}
