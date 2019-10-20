import React from 'react'

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

export default Course
