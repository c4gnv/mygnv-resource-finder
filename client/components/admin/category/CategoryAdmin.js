import React, { useState } from 'reactn';
import { ListGroup, Container, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CategoryEdit from './CategoryEdit';
import CategoryDelete from './CategoryDelete';

// This component creates an admin view
// With filtering for adding, modifying, and
// deleting categories and subcategories

const CategoryAdmin = (props) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const mapCategories = (categoriesToMap) => {
    return categoriesToMap.map((category) => {
      return (
        <ListGroup.Item key={category._id}>
          <CategoryEdit
            categories={props.categories}
            providers={props.providers}
            refreshDataCallback={props.refreshDataCallback}
            buttonName='Edit'
            id={category._id}
            style={{ marginRight: '0.5em' }}
          />
          <CategoryDelete
            categories={props.categories}
            providers={props.providers}
            refreshDataCallback={props.refreshDataCallback}
            buttonName='Delete'
            id={category._id}
          />
          <h5
            style={{
              color: 'black',
              fontWeight: 'bold',
              display: 'inline',
              paddingLeft: '1em',
            }}
          >
            {category.name}
          </h5>
        </ListGroup.Item>
      );
    });
  };

  const topLevelCategories = mapCategories(
    props.categories.filter((category) => {
      return (
        !category.is_subcategory &&
        (category.name.toLowerCase().includes(filterText.toLowerCase()) ||
          category._id.includes(filterText))
      );
    })
  );

  const subcategories = mapCategories(
    props.categories.filter((category) => {
      return (
        category.is_subcategory &&
        (category.name.toLowerCase().includes(filterText.toLowerCase()) ||
          category._id.includes(filterText))
      );
    })
  );

  // Center the two columns of top level categories and subcategories
  return (
    <Container>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Col>
          <Form style={{ width: '100%' }}>
            <CategoryEdit
              categories={props.categories}
              providers={props.providers}
              refreshDataCallback={props.refreshDataCallback}
              buttonName='Add Category'
              style={{ marginBottom: '1em' }}
            />
            <Form.Group controlId='formFilterText'>
              <Form.Label>
                <strong>Filter categories</strong>
              </Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    value={filterText}
                    onChange={handleFilterTextChange}
                    placeholder='Filter categories'
                  />
                </Col>
                <Col sm='auto'>
                  <Row
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  ></Row>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <ListGroup
          style={{
            display: 'inline-block',
            margin: '0 auto',
            alignSelf: 'flex-start',
          }}
        >
          <strong>Top Level Categories</strong>
          {topLevelCategories}
        </ListGroup>
        <ListGroup
          style={{
            display: 'inline-block',
            margin: '0 auto',
            alignSelf: 'flex-start',
          }}
        >
          <strong>Subcategories</strong>
          {subcategories}
        </ListGroup>
      </Row>
    </Container>
  );
};

CategoryAdmin.propTypes = {
  categories: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired,
  refreshDataCallback: PropTypes.func.isRequired,
};

export default CategoryAdmin;

//NEW - IN DEVELOPMENT
/*const CategoryAdmin = (props) => {
  const [filterText, setFilterText] = useState('');
  const [visible, setVisible] = useState(false);

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const mapCategories2 = (categoriesToMap) => {
    console.log(categoriesToMap);
    return categoriesToMap.map((category) => {
      console.log(category);
      return category.map((child)=> {
        console.log(child);
        return child.map ((child0)=>{
          return (
            <ListGroup.Item key={child0._id}>
              
              <h5
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  display: 'inline',
                  paddingLeft: '1em',
                }}
              >
                {child0.name}
              </h5>
              <CategoryEdit
                categories={props.categories}
                providers={props.providers}
                refreshDataCallback={props.refreshDataCallback}
                buttonName='Edit'
                id={child0._id}
                style={{ marginRight: '0.5em' }}
              />
              <CategoryDelete
                categories={props.categories}
                providers={props.providers}
                refreshDataCallback={props.refreshDataCallback}
                buttonName='Delete'
                id={child0._id}
              />
            </ListGroup.Item>
          );
        });
        
      });
    });
  };

  const subcategories = (topLevelCategoryName) => {
    return (
      <React.Fragment>
      {mapCategories2(
      props.categories.filter((category) => {
        //console.log(category.children.length);
        return (
          !category.is_subcategory &&
          (category.name.toLowerCase().includes(topLevelCategoryName.toLowerCase()) ||
            category._id.includes(topLevelCategoryName))
        );
      }).map((topLevelCategory) => {
        console.log(topLevelCategory.children);
        console.log(topLevelCategory.children != null ? topLevelCategory.children: null);
        return (
          topLevelCategory.children != null ?  topLevelCategory.children.map((child)=>props.categories.filter((category)=> {
            return(
              category.is_subcategory &&
              (category.name.toLowerCase().includes(child) ||
              category._id.includes(child))
            );
          })) : null
        );
        })
      )}</React.Fragment>
    );
  };

  const mapCategories = (categoriesToMap) => {
    console.log(categoriesToMap);
    return categoriesToMap.map((category) => {
      console.log(category);
      return (
        <React.Fragment>
          <ListGroup.Item key={category._id} style={{background: '#1fc2ae',}}>
      {/*<button onClick={displaySub(category.name + `sub`)}><i class="fas fa-caret-down"></i></button>*//*}
            <h5
              style={{
                color: 'black',
                fontWeight: 'bold',
                display: 'inline',
                paddingLeft: '1em',
              }}
            >
              {category.name}
            </h5>
            <CategoryEdit
              categories={props.categories}
              providers={props.providers}
              refreshDataCallback={props.refreshDataCallback}
              buttonName='Edit'
              id={category._id}
              style={{ marginRight: '0.5em' }}
            />
            <CategoryDelete
              categories={props.categories}
              providers={props.providers}
              refreshDataCallback={props.refreshDataCallback}
              buttonName='Delete'
              id={category._id}
            />
          </ListGroup.Item>
          <div id={category.name + `sub`}>
            {subcategories(category.name)}
          </div>
        </React.Fragment>
      );
    });
  };

 

  const topLevelCategories = mapCategories(
    props.categories.filter((category) => {
      console.log(category.children.length);
      return (
        !category.is_subcategory &&
        (category.name.toLowerCase().includes(filterText.toLowerCase()) ||
          category._id.includes(filterText))
      );
    })
  );

  

  /*const subcategories = mapCategories2(
    topLevelCategories.map((topLevelCategory) => {
      console.log(topLevelCategory.props.children);
      console.log(topLevelCategory.props.children != null ? topLevelCategory.props.children: null);
      return (
        topLevelCategory.props.children != null ? topLevelCategory.props.children : null
      );
      /*return (s
        category.is_subcategory &&
        (category.name.toLowerCase().includes(filterText.toLowerCase()) ||
          category._id.includes(filterText))
      );
    })
  );*/

  // Center the two columns of top level categories and subcategories
  /*return (
    <Container>
      <Row>
      <ListGroup
          style={{
            display: 'inline-block',
            margin: '0 auto',
            alignSelf: 'flex-start',
          }}
        >
          <strong>Categories</strong>
          <CategoryEdit
              categories={props.categories}
              providers={props.providers}
              refreshDataCallback={props.refreshDataCallback}
              buttonName='+'
              style={{ marginBottom: '1em' }}
            />
          {topLevelCategories}
        </ListGroup>
        {/*<ListGroup
          style={{
            display: 'inline-block',
            margin: '0 auto',
            alignSelf: 'flex-start',
          }}
        >
          <strong>Subcategories</strong>
          {subcategories(topLevelCategories)}
        </ListGroup>*//*}
      </Row>
    </Container>
  );
};

CategoryAdmin.propTypes = {
  categories: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired,
  refreshDataCallback: PropTypes.func.isRequired,
};

export default CategoryAdmin;*/ 
