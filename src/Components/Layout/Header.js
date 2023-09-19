import {Navbar,Form,Container, Button} from 'react-bootstrap'
import styleshhet from './Header.module.css'
const  Header=()=> {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='d-flex justify-content-between'>
        <Navbar.Brand href="#"> IlanoS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className={`${styleshhet['form-control']} me-2`}
              
              aria-label="Search"
            />
            <Button  variant="outline-info">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;