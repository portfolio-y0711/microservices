import React, { useState, useContext } from 'react'
import { RootContext } from 'store/rootModelStore'
import CarouselUserItem from './LoginCarouselItem'

const Carousel = () => {
  const {
    uiModel: { selectNextUserCommand, selectPreviousUserCommand },
  } = useContext(RootContext)

  const selectionEventHandler = (direction: string) => {
    if (direction == 'forward') {
      selectNextUserCommand()
    } else if (direction == 'backward') {
      selectPreviousUserCommand()
    } else {
      throw Error('no such command')
    }
  }

  return (
    <>
      <div className="left carousel-control" onClick={(_) => selectionEventHandler('backward')}>
        <i className="fa fa-chevron-left"></i>
      </div>
      <div className="right carousel-control" onClick={(_) => selectionEventHandler('forward')}>
        <i className="fa fa-chevron-right"></i>
      </div>
      {/* <CarouselUserItem selected_user={currentIndex} /> */}
      <CarouselUserItem />
    </>
  )
}

export default Carousel
