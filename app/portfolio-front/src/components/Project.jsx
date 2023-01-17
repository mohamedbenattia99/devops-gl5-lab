import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


const  Project = ({project}) => (

  <Card style={{ width: '25em' }}>
  <Card.Img variant="top" src={project.image} />
  <Card.Body>
    <Card.Title>{project.name}</Card.Title>
    <Card.Text>
      {project.description}
    </Card.Text>
  </Card.Body>
  </Card>


  )

  export default React.memo(Project);
