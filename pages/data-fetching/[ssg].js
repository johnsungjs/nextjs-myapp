import { linkApi } from "@/src/service/linkApi";

export default function SSG() {
  return (
    <div className='w-full'>
      <h1>STATIC SIDE GENERATION</h1>
    </div>
  );
}

export async function getStaticPaths(context) {
  const [err, data] = await fetch(linkApi)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      return [null, response];
    })
    .catch((err) => {
      return [err, null];
    });

  let paths = [];

  paths = data.map((post) => ({
    params: {
      ssg: `${post.id.toString()}`,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps() {
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
