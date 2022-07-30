import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, addOrder } from '../../redux/apiCalls'

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

const Select = styled.select`
    width: 200px;
    margin-bottom: 10px;
`

const TextArea = styled.textarea`
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
    width: 400px;
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
    cursor: "pointer"
}

const AddTransactions = () => {
    const [inputs, setInputs] = useState({});
    const [product, setProduct] = useState({});
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getProducts);
    }, [dispatch]);

    const handleInput = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleProduct = (e) => {
        setProduct(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        const order = { ...inputs, status: status, products: [product] };
        addOrder(order, dispatch);
        navigate("/transactionslist", alert("Success Add Orders"));
    }

    return (
        <Container>
            <TitleContainer>
                <h2>Add Transaction</h2>
                <Link to="/transactionslist">
                    <button style={StyleBackButton}>Back</button>
                </Link>
            </TitleContainer>
            <ContainerFormEdit>
                <FormEdit>
                    <FormLeft>
                        <Label>Buyer</Label>
                        <Input name='userId' placeholder='Buyer' onChange={handleInput} />
                        <Label>Product</Label>
                        <Select name="product" id="product" onChange={handleProduct}>
                            {products.map((product) => {
                                return <option value={product._id}>{product.title}</option>
                            })}
                        </Select>
                        <Label>Count</Label>
                        <Input name='quantity' placeholder={2} type='number' onChange={handleProduct} />
                    </FormLeft>
                    <FormRight>
                        <Label>Status</Label>
                        <Select name="status" id="status" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="aproved">Aproved</option>
                            <option value="diclined">Diclined</option>
                        </Select>
                        <Label>Amount</Label>
                        <Input name='amount' placeholder='Amount' type="number" onChange={handleInput} />
                        <Label>Address</Label>
                        <TextArea name='address' placeholder='Address' onChange={handleInput}></TextArea>
                        <Button onClick={handleClick} className="productButton">Add Transaction</Button>
                    </FormRight>
                </FormEdit>
            </ContainerFormEdit>
        </Container>
    )
}

export default AddTransactions