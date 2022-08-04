import styled from 'styled-components'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { publicRequest } from '../../requestMethods'
import { useState } from 'react'
import { useEffect } from 'react'
import { updateOrder } from '../../redux/apiCalls'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2';

const Container = styled.div`
    flex: 4;
    padding: 20px;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ContainerFormEdit = styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const FormEdit = styled.form`
    display: flex;
    justify-content: space-between;
`

const FormRight = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FormLeft = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 10px;
    color: gray;
`

const Input = styled.input`
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
    width: 200px;
`

const TextArea = styled.textarea`
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
`

const Button = styled.button`
    border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`

const StyleBackButton = {
    width: "80px",
    border: "none",
    padding: "5px",
    backgroundColor: "teal",
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
}

const EditTransactions = () => {

    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const [orders, setOrders] = useState({});

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const resOrderUser = await publicRequest.get(`orders/${orderId}`);
                setOrders(resOrderUser.data[0]);
            } catch (e) {
                console.log(e.message);
            }
        }
        getUserOrders();
    }, [orderId]);

    const handleClick = (e) => {
        e.preventDefault();
        const order = { ...inputs, _id: orderId };
        updateOrder(dispatch, order);
        navigate("/transactionslist", Swal.fire(
            'Update Orders!',
            'success'
        ));
    }

    return (
        <Container>
            <TitleContainer>
                <h2>Edit Transaction</h2>
                <Link to="/transactionslist">
                    <button style={StyleBackButton}>Back</button>
                </Link>
            </TitleContainer>
            <ContainerFormEdit>
                <FormEdit>
                    <FormLeft>
                        <Label>ID</Label>
                        <Input placeholder={orders._id} disabled={true} />
                        <Label>ID Customer</Label>
                        <Input placeholder={orders.userId} disabled={true} />
                        <Label>Amount</Label>
                        <Input name='amount' placeholder={orders.amount} onChange={handleInput} />
                        <Label>Status</Label>
                        <Input name='status' placeholder={orders.status} onChange={handleInput} />
                        <Label>Date</Label>
                        <Input placeholder={orders.createdAt} disabled={true} />
                    </FormLeft>
                    <FormRight>
                        <Label>Address</Label>
                        <TextArea name='address' placeholder={orders.address} onChange={handleInput}></TextArea>
                        {/* <Label>Products</Label>
                        <TextArea placeholder={orders.products.map((item) => {
                            return `${item.productId} : ${item.quantity} `
                        })}></TextArea> */}
                        <Button onClick={handleClick} className="productButton">Update</Button>
                    </FormRight>
                </FormEdit>
            </ContainerFormEdit>
        </Container>
    )
}

export default EditTransactions