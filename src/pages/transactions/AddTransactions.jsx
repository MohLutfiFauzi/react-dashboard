import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
                        <Input placeholder='Buyer' />
                        <Label>Purchase Status</Label>
                        <Select name="purchase" id="purchase">
                            <option value="offline">Offline</option>
                            <option value="online">Online</option>
                        </Select>
                        <Label>Product</Label>
                        <TextArea placeholder='aglonema, amazon'></TextArea>
                    </FormLeft>
                    <FormRight>
                        <Label>Status</Label>
                        <Select name="status" id="status">
                            <option value="panding">Panding</option>
                            <option value="panding">Aproved</option>
                            <option value="panding">Diclined</option>
                        </Select>
                        <Label>Amount</Label>
                        <Input placeholder='Amount' type="number" />
                        <Label>Count</Label>
                        <Input placeholder='Count' type="number" />
                        <Label>Size</Label>
                        <TextArea placeholder='aglonema: small, amazon: medium'></TextArea>
                        <Button className="productButton">Add Transaction</Button>
                    </FormRight>
                </FormEdit>
            </ContainerFormEdit>
        </Container>
    )
}

export default AddTransactions