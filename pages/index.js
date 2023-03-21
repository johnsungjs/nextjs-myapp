import { useState, useEffect } from "react";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import { Navbar } from "@/src/components/navbar.component";
import Image from "next/image";
import axios from "axios";
import { linkApiLocal } from "@/src/service/linkApi";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [dataFromApi, setDataFromApi] = useState([]);

  useEffect(() => {
    axios
      .get(linkApiLocal)
      .then((e) => {
        setDataFromApi(e.data);
      })
      .catch((e) => console.log("error get", e));
  }, []);

  function onChangeModal() {
    console.log("Opening Modal");
    setVisible(!visible);
  }

  return (
    <div>
      <Navbar />
      <Button
        className='btn-danger'
        htmlType='button'
        type='default'
        onClick={(e) => {
          console.log(e, "Button 1");
        }}>
        Button 1
      </Button>
      <Button
        htmlType='button'
        type='primary'
        onClick={(e) => {
          console.log(e, "Button 2");
        }}>
        Button 2
      </Button>
      <Button htmlType='button' type='default' onClick={onChangeModal}>
        Open Modal
      </Button>
      <button className='btn-green'>BUTTON GREEN</button>
      <button className='btn-warning'>BUTTON WARNING</button>
      <button className='btn-special'>BUTTON SPECIAL</button>

      <Modal visible={visible} onChange={onChangeModal}>
        <h3>Title Modal</h3>
        {/* <Button htmlType="button" type="default" onClick={onChangeModal}>Close</Button> */}
      </Modal>
      <h1 className='text-red-500'>Home Pages</h1>

      <div className='h-screen'>
        <Image width={300} height={300} src={"/hdPicture.jpg"} alt='' />
      </div>
      <div>
        {dataFromApi.map((e) => (
          <div key={e.id} style={{padding: "20px"}}>
            <div>Product Name</div>
            <div>{e.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export async function getServerSideProps(ctx){
//   let {req} = ctx;
//   const token = await getToken()
// }
