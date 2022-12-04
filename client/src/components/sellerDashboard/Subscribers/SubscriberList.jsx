import React from 'react'
import SubscriberCard from './SubscriberCard'

function SubscriberList() {
  return (
    <div className="mt-14 mx-14">
    <div className="flex flex-wrap flex-row justify-between">
        <SubscriberCard></SubscriberCard>
        <SubscriberCard></SubscriberCard>
        <SubscriberCard></SubscriberCard>
        <SubscriberCard></SubscriberCard>
        <SubscriberCard></SubscriberCard>
        <SubscriberCard></SubscriberCard>
    </div>
    </div>
  )
}

export default SubscriberList