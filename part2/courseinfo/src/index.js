import React from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
		const parts = props.parts
    const part_components = parts.map((part) => 
				<Part part={part} key={part.id}/>
    );
    return (
        <>
					{part_components}
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <b>total of {total} exercises</b>
    )
}
const Course = (props) => {
    return (
        <div>
            <Heading course={props.course.name} />
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts}/>
        </div>
    )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Very difficult exercises',
        exercises: 100,
        id: 4
      },
      {
        name: 'Easy tasks',
        exercises: 9,
        id: 5
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
