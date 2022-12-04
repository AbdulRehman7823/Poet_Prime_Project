import React from 'react'
import PoetryCard from './PoetryCard'

function PoetryList() {
  return (
    <div className="flex flex-row flex-wrap justify-between">
        <PoetryCard/>
        <PoetryCard></PoetryCard>
        <PoetryCard ></PoetryCard>
        <PoetryCard></PoetryCard>
        <PoetryCard></PoetryCard>
        <PoetryCard></PoetryCard>
        <PoetryCard></PoetryCard>
        <PoetryCard></PoetryCard>
    </div>
  )
}

export default PoetryList