import { useEffect, useState } from "react";
import axios from "axios";
import { Table,  Col, Row, Button, Modal, Input } from "antd";

const columns = [
  {
    title: "Numeral",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const { TextArea } = Input;

const CrudContainer = () => {
  const [data, setData] = useState([]);


  const [form, setForm] =useState({

    name:"",
    price:"",
    description:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevState)=> ({
      ...prevState,
      [name]: value,

    }))    
  };

  
  const [openModal, setOpenModal] = useState(false);
  
  const showModal = () => {
    setOpenModal(true);
  };
  
  
  
  useEffect(() => {
    fetchdata();
  }, []);
  
  const fetchdata = async () => {
    const response = await axios.get("http://localhost:3001/products/");

    setData(response.data);
  };



  const handelpost = async ()=> {

    const response = await axios.post("http://localhost:3001/products/", form);
    

    if(response.status === 200) {
      alert('producto creado')
    }else{
      alert('producto no a sido creado')
    }
    setOpenModal(false)
  };
  

  console.log(form);
  
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <h1>Mi primera api</h1>

          <Button type="primary" onClick={showModal}>
            Crear Producto
          </Button>
          <Modal
          
            title="Crear Producto"
            open={openModal}
            onOk={handelpost}
            onCancel={() => setOpenModal(false)}
          >

         
            <p>Ingrese su nombre:...</p>
            <Input 
             name="name"
            
            onChange={ handleChange} placeholder="Nombre" />

            <p>Ingrese el valor del producto:</p>
            <Input
            name="price"
            onChange={ handleChange} placeholder="Nombre" />

            <p>Ingrese las especificaciones:</p>
             <TextArea 
             name="description"
             value={form.description}
             onChange={handleChange}
             rows={8} placeholder="Ingrese descripciones" maxLength={10} />


          </Modal>

          <Table rowKey={"id"} dataSource={data} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default CrudContainer;
