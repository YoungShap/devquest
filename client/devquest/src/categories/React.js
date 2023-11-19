import React, { useState } from 'react'

export default function React() {
     
    const [projects, setProjects] = useState([]);

    fetch("http://localhost:4000/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setProjects(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
 
 
 
 
 
    return (
    <div>React</div>
  )
}
