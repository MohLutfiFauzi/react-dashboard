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

const EditInsertStock = () => {
    return (
        <Container>
            <TitleContainer>
                <h2>Edit Stock</h2>
                <Link to="/insertstock">
                    <button style={StyleBackButton}>Back</button>
                </Link>
            </TitleContainer>
            <ContainerFormEdit>
                <FormEdit>
                    <FormLeft>
                        <Label>ID Insert Product</Label>
                        <Input placeholder='Id Transaction' disabled={true} />
                        <Label>ID Product</Label>
                        <Input placeholder='Id Product' disabled={true} />
                        <Label>Date</Label>
                        <Input placeholder='14-03-2022' disabled={true} />
                    </FormLeft>
                    <FormRight>
                        <Label>Decorative Plants</Label>
                        <Select name="status" id="status">
                            <option value="aglonema">aglonema</option>
                            <option value="begonia">begonia</option>
                        </Select>
                        <Label>Suplier</Label>
                        <Select name="suplier" id="suplier">
                            <option value="maman">maman</option>
                            <option value="ujang">ujang</option>
                        </Select>
                        <Label>Stock</Label>
                        <Input placeholder='Stock' type="number" />
                        <Button className="productButton">Update</Button>
                    </FormRight>
                </FormEdit>
            </ContainerFormEdit>
        </Container>
    )
}

export default EditInsertStock