import React from 'react';
import { Table } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import palette from 'google-palette';
import { NavBar, Footer } from "./Nav";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Course (props) {
  let course = props.course[0];
  const colorPalette = palette('tol', course.grade_weights.length).map((hex) => '#' + hex);
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>{course.subject_area} {course.course_number} - {course.course_title}</h1>
            <p>{course.year} {course.quarter} - {course.instructor}</p>
          </div>
          <h3 className="card-title">Grade weights:</h3>
          <div className="course-structure">
            <div className="col">
              <GradeWeightsChart grade_weights={course.grade_weights} colorPalette={colorPalette}/>
            </div>
            <div className="col">
              <GradeWeightsTable grade_weights={course.grade_weights} colorPalette={colorPalette}/>
            </div>
          </div>
          <div className="course-structure">
            <div className="col">
              <h3>Midterm:</h3>
              <p>{course.midterm}</p>
            </div>
            <div className="col">
              <h3>Final:</h3>
              <p>{course.final}</p>
            </div>
          </div>
          <h3>Textbooks:</h3>
            <TextbooksCards course={course} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

function GradeWeightsTable (props) {
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">Group</th>
          <th scope="col">Weight</th>
        </tr>
      </thead>
      <tbody>
        {props.grade_weights.map((curr, index) =>
          <tr key={curr.group}>
            <td>
              <div className='box' style={{backgroundColor: props.colorPalette[index]}}></div>
              {curr.group}
            </td>
            <td>{curr.weight}%</td>
          </tr>
        )}
        <tr>
          <td>Total</td>
          <td>{props.grade_weights.map((curr) => curr.weight).reduce((prev, curr) => prev + curr, 0)}%</td>
        </tr>
      </tbody>
    </Table>
  )
}

function GradeWeightsChart (props) {
  const data = {
    labels: props.grade_weights.map((curr) => curr.group),
    datasets: [
      {
        data: props.grade_weights.map((curr) => curr.weight),
        backgroundColor: props.colorPalette
      }
    ]
  };
  return (
    <Pie data={data} options={{
      plugins: {legend: {display: false}},
      layout: {padding: 32}
    }} />
  )
}

function TextbooksCards (props) {
  return (
    props.course.textbooks.map((textbook) => { return (
      <div className="card" key={textbook.title} style={{width: "18rem"}}>
        <img className="card-img-top" src={textbook.image} alt="Textbook cover" />
          <div className="card-body">
            <h4 className="card-title">{textbook.title}</h4>
            <p className="card-text">{textbook.author}</p>
            <a href={textbook.link} className="btn btn-primary">View Textbook</a>
          </div>
        </div>
    )})
  )
}